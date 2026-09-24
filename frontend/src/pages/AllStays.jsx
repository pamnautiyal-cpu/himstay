import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // शुरुआत में 6 क्लीन कार्ड्स दिखेंगे
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "Uttarkashi",
    location: "",
    images: [],
    description: ""
  });

  const navigate = useNavigate();

  const masterHotelList = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "/images/hotals/Hotel Nagraja Palace1.jpg", location: "Gangotri Hwy", price: "2,499", rating: "4.8", tag: "Trending 🔥", description: "Experience traditional Garhwali hospitality with modern amenities right on the Gangotri Highway." },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay1.jpg", location: "NH 34", price: "1,899", rating: "4.9", tag: "Best Seller ⭐", description: "A cozy, homely atmosphere surrounded by apple orchards and serene mountain vibes." },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Barahat Range", price: "2,199", rating: "4.7", tag: "Luxury Stay ✨", description: "Wake up to breathtaking views of the Barahat mountain range with top-tier comforts." },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "Near Medicose", price: "2,200", rating: "4.6", tag: "Great Value 💎", description: "Centrally located with easy access to medical facilities, transport, and local markets." },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", location: "ITBP Rd", price: "1,599", rating: "4.8", tag: "Nature View 🌲", description: "Peaceful retreat close to nature, ideal for meditation, writers, and small families." },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", location: "Main Market", price: "2,799", rating: "4.9", tag: "Top Rated 🏆", description: "Right in the main market area, offering premium rooms and warm local hospitality." },
    { _id: "local_07", name: "Riverside Retreat", city: "Maneri", image: "/images/hotals/Hotel Nagraja Palace2.jpg", location: "Bhagirathi Bank", price: "1,899", rating: "4.9", tag: "River View 🌊", description: "Listen to the soothing sound of the Bhagirathi river right from your private balcony." },
    { _id: "local_08", name: "Gangotri View Inn", city: "Gangori", image: "/images/hotals/Hotel Nagraja Palace3.jpg", location: "Gangori Bridge", price: "3,199", rating: "4.7", tag: "Special Offer ⚡", description: "Strategic gateway stay for pilgrims embarking on the holy Char Dham Yatra." },
    { _id: "local_09", name: "Snow Peak Luxury Villa", city: "Harsil", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600", location: "Apple Orchards", price: "4,500", rating: "5.0", tag: "Luxury Villa 🏔️", description: "Luxury wooden cottages nestled inside the famous apple orchards of Harsil valley." },
    { _id: "local_10", name: "Ganga Riverside Glamping", city: "Rishikesh", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600", location: "Brahmapuri", price: "3,200", rating: "4.9", tag: "Adventure Camp 🏕️", description: "Experience luxury Swiss tents right on the sandy banks of the holy Ganges." },
    { _id: "local_11", name: "Ganges Riverside Ashram", city: "Rishikesh", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank", price: "1,899", rating: "4.9", tag: "Yoga & Peace 🧘", description: "An authentic spiritual stay focused on yoga, Ayurveda, and inner peace." },
    { _id: "local_12", name: "Kedarkantha Base Cottage", city: "Sankri", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Sankri Range", price: "3,199", rating: "4.7", tag: "Trekker Hub ⚡", description: "The ultimate basecamp stay for trekkers attempting the famous Kedarkantha summit." },
    { _id: "local_13", name: "Tehri Lake Resort", city: "Tehri", image: "https://images.unsplash.com/photo-1595655608293-98782a174f83?w=600", location: "Lake View", price: "3,899", rating: "4.8", tag: "Water Sports 🚤", description: "Stunning resort overlooking Asia's largest Tehri reservoir with water sports activities." },
    { _id: "local_14", name: "Mussoorie Pine Woods", city: "Dehradun", image: "https://images.unsplash.com/photo-1589182337358-2fabedd73e9d?w=600", location: "Library Chowk", price: "2,999", rating: "4.7", tag: "Honeymoon Special 💕", description: "Romantic pine-facing rooms with colonial architecture and misty sunset views." },
    { _id: "local_15", name: "Nainital Lake Paradise", city: "Nainital", image: "https://images.unsplash.com/photo-1590447158019-883281ab4bc1?w=600", location: "Mall Road", price: "3,499", rating: "4.8", tag: "Lake View ⛵", description: "Prime location stay just steps away from the gorgeous Naini lake and bustling market." },
    { _id: "local_16", name: "Valley Blossom Cottage", city: "Joshimath", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", location: "Badrinath Hwy", price: "2,699", rating: "4.9", tag: "Scenic Beauty 🌸", description: "Gateway retreat towards Valley of Flowers and Hemkund Sahib with cozy fireplaces." }
  ];

  // हर बार होटल्स का सीक्वेंस रैंडम बदलने के लिए शफल फंक्शन
  const shuffleArray = useCallback((array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem("is_hotel_admin") === "true";
    if (isAdminAuthenticated) {
      setIsModalOpen(true);
      localStorage.removeItem("is_hotel_admin");
    }

    setLoading(true);
    const userAdded = JSON.parse(localStorage.getItem("user_added_hotels") || "[]");

    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = (res.data || []).map(item => ({
          ...item,
          price: item.price || "2,499",
          rating: item.rating || "4.8",
          location: item.location || item.city || "Uttarakhand",
          image: item.image || item.img || "/images/hotals/Hotel Nagraja Palace1.jpg",
          tag: item.tag || "Verified Stay ✓",
          description: item.description || "Comfortable stay with modern Himalayan hospitality."
        }));
        
        const merged = [...userAdded, ...masterHotelList, ...backendData.filter(bh => !String(bh._id).startsWith("local_"))];
        setHotels(shuffleArray(merged));
        setLoading(false);
      })
      .catch(() => {
        const merged = [...userAdded, ...masterHotelList];
        setHotels(shuffleArray(merged));
        setLoading(false);
      });
  }, [shuffleArray]);

  const handleMultipleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      let currentImages = [...newHotel.images];
      let loadedCount = 0;

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            currentImages.push(reader.result);
          }
          loadedCount++;
          if (loadedCount === files.length) {
            setNewHotel(prev => ({ ...prev, images: [...currentImages] }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const defaultImg = "/images/hotals/Hotel Nagraja Palace1.jpg";
    const defaultImages = [
      defaultImg,
      "/images/hotals/Hotel Nagraja Palace2.jpg",
      "/images/hotals/Hotel Nagraja Palace3.jpg"
    ];

    const finalImages = newHotel.images.length > 0 ? newHotel.images : defaultImages;

    const hotelObj = {
      _id: "custom_" + Date.now(),
      name: newHotel.name,
      city: newHotel.city,
      location: newHotel.location || newHotel.city,
      price: "1,899",
      rating: "4.9",
      tag: "New Listing ✨",
      image: finalImages[0],
      images: finalImages,
      description: newHotel.description || "Enjoy modern amenities, breathtaking mountain views, and world-class hospitality tailored for families and couples.",
      hasStandardStructure: true 
    };

    const existingLocal = JSON.parse(localStorage.getItem("user_added_hotels") || "[]");
    const updatedLocal = [hotelObj, ...existingLocal];
    localStorage.setItem("user_added_hotels", JSON.stringify(updatedLocal));

    setHotels([hotelObj, ...hotels]);
    setIsModalOpen(false);
    setNewHotel({
      name: "",
      city: "Uttarkashi",
      location: "",
      images: [],
      description: ""
    });
    alert(`Hotel Added Successfully with ${finalImages.length} Photos! 🎉`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px", fontSize: "20px", color: "#0284c7", fontWeight: "800", background: "#f3f4f6", minHeight: "100vh" }}>
        🏔️ Fetching Handpicked Himalayan Stays...
      </div>
    );
  }

  const currentHotels = hotels.slice(0, visibleCount);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f3f4f6", minHeight: "100vh", padding: "40px 20px", boxSizing: "border-box" }}>
      
      {/* Clean & Professional Header Banner (बिना नंबर और बिना स्टे काउंट के) */}
      <div style={{ 
        maxWidth: "1200px", margin: "0 auto 40px auto", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
        borderRadius: "24px", padding: "40px 30px", color: "white", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" 
      }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "900", marginBottom: "12px", letterSpacing: "-0.5px" }}>
          Handpicked Stays & Mountain Retreats
        </h1>
        <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
          Explore premium villas, cozy riverside homestays, and luxury boutique hotels across Uttarakhand with verified reviews and best price guarantees.
        </p>
      </div>

      {/* Secret Secured Add Hotel Modal */}
      {isModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.7)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px", backdropFilter: "blur(5px)"
        }}>
          <div style={{
            background: "white", borderRadius: "20px", maxWidth: "600px", width: "100%", padding: "30px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", maxHeight: "90vh", overflowY: "auto", boxSizing: "border-box"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a", margin: 0 }}>🔐 Add Hotel & Upload Multiple Photos</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: "20px", fontWeight: "bold", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Hotel Name *</label>
                <input 
                  type="text" required placeholder="e.g. Himalayan Peak Resort" 
                  value={newHotel.name} onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} 
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>City *</label>
                  <input 
                    type="text" required placeholder="Uttarkashi / Matli" 
                    value={newHotel.city} onChange={(e) => setNewHotel({...newHotel, city: e.target.value})}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} 
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Location / Area *</label>
                  <input 
                    type="text" required placeholder="Gangotri Hwy / Market" 
                    value={newHotel.location} onChange={(e) => setNewHotel({...newHotel, location: e.target.value})}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#0284c7", marginBottom: "6px" }}>
                  📁 Upload Photos (Select multiple at once) *
                </label>
                <input 
                  type="file" accept="image/*" multiple 
                  onChange={handleMultipleImagesUpload}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px dashed #0284c7", fontSize: "13px", background: "#f0f9ff", boxSizing: "border-box", cursor: "pointer" }} 
                />
                
                {newHotel.images.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
                      {newHotel.images.map((imgSrc, idx) => (
                        <div key={idx} style={{ position: "relative", width: "50px", height: "50px", borderRadius: "6px", overflow: "hidden", border: "2px solid #0284c7" }}>
                          <img src={imgSrc} alt={`prev ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>
                      ✓ Total {newHotel.images.length} image(s) added!
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Short Description</label>
                <textarea 
                  rows="2" placeholder="Write basic details about the view and comfort..." 
                  value={newHotel.description} onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                style={{
                  background: "#0284c7", color: "white", border: "none", padding: "12px", borderRadius: "10px",
                  fontWeight: "800", fontSize: "14px", cursor: "pointer", marginTop: "5px"
                }}
              >
                Publish Hotel with Multiple Photos 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Modern & Large Card Grid Layout with Hover Effects & Clickable Cards */}
      <div style={{ 
        maxWidth: "1200px", margin: "0 auto", 
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px", boxSizing: "border-box" 
      }}>
        {currentHotels.map((hotel, index) => {
          const isFeatured = index % 3 === 0;

          return (
            <div 
              key={hotel._id || index} 
              onClick={() => navigate(`/hotels/${hotel._id}`)}
              className="hotel-hover-card"
              style={{ 
                background: "#ffffff",
                border: isFeatured ? "2px solid #0284c7" : "1px solid #e2e8f0", 
                borderRadius: "20px", 
                overflow: "hidden", 
                boxShadow: isFeatured ? "0 20px 25px -5px rgba(2, 132, 199, 0.15)" : "0 10px 15px -3px rgba(0,0,0,0.03)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative", boxSizing: "border-box",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ position: "relative", height: "230px", background: "#e2e8f0", overflow: "hidden" }}>
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
                />
                <div style={{
                  position: "absolute", top: "14px", right: "14px", background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(6px)",
                  color: "white", padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "900", zIndex: 2,
                  display: "flex", alignItems: "center", gap: "4px"
                }}>
                  ⭐ {hotel.rating || "4.8"}
                </div>
              </div>

              <div style={{ padding: "22px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      📍 {hotel.location || hotel.city}, Uttarakhand
                    </span>
                    <span style={{ fontSize: "11px", background: "#f0fdf4", color: "#16a34a", padding: "3px 8px", borderRadius: "6px", fontWeight: "700" }}>
                      Verified ✓
                    </span>
                  </div>

                  <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "0 0 10px 0", lineHeight: "1.3" }}>
                    {hotel.name}
                  </h3>

                  <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.4" }}>
                    {hotel.description || "Enjoy modern amenities, breathtaking mountain views, and world-class hospitality tailored for families and couples."}
                  </p>
                </div>

                <div style={{ 
                  borderTop: "1px solid #f1f5f9", paddingTop: "16px", marginTop: "auto",
                  display: "flex", justifyContent: "space-between", alignItems: "center" 
                }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#94a3b8", display: "block", fontWeight: "600" }}>Starting From</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a" }}>₹{hotel.price}</span>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>/night</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/hotels/${hotel._id}`);
                    }}
                    style={{ 
                      padding: "10px 22px", background: isFeatured ? "#0f172a" : "#0284c7", 
                      color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)", transition: "background 0.2s"
                    }}
                  >
                    View Room →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Load More / Show Less Controls */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {visibleCount < hotels.length ? (
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            style={{
              background: "#0284c7", color: "white", border: "none", padding: "14px 45px",
              borderRadius: "14px", fontWeight: "800", fontSize: "15px", cursor: "pointer",
              boxShadow: "0 8px 20px rgba(2, 132, 199, 0.35)", transition: "all 0.2s"
            }}
          >
            Load More Stays ↓
          </button>
        ) : (
          <button 
            onClick={() => setVisibleCount(6)}
            style={{
              background: "#64748b", color: "white", border: "none", padding: "14px 45px",
              borderRadius: "14px", fontWeight: "800", fontSize: "15px", cursor: "pointer",
              boxShadow: "0 8px 20px rgba(100, 116, 139, 0.3)", transition: "all 0.2s"
            }}
          >
            Show Less Stays ↑
          </button>
        )}
      </div>

      {/* CSS Hovers और Zoom Animations के लिए */}
      <style>{`
        .hotel-hover-card:hover {
          transform: translateY(-6px);
          border-color: #0284c7 !important;
          box-shadow: 0 20px 30px -10px rgba(2, 132, 199, 0.25) !important;
        }
        .hotel-hover-card:hover img {
          transform: scale(1.06);
        }
      `}</style>

    </div>
  );
}