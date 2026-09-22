import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hotels");
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ref for Handpicked Stays Horizontal Scroll
  const staysScrollRef = useRef(null);

  const scrollStays = (direction) => {
    if (staysScrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      staysScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Hero Banner Images
  const heroImages = [
    "/images/hotals/Hotel Nagraja Palace1.jpg",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  // Local Uttarkashi Stays
  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "/images/hotals/Hotel Nagraja Palace1.jpg", location: "Gangotri Hwy", price: "2,499", rating: "4.8", category: "Hotels" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay1.jpg", location: "NH 34", price: "1,899", rating: "4.9", category: "Hotels" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Barahat Range", price: "2,199", rating: "4.7", category: "Hotels" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "Near Medicose", price: "2,200", rating: "4.6", category: "Hotels" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", location: "ITBP Rd", price: "1,599", rating: "4.8", category: "Hotels" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", location: "Main Market", price: "2,799", rating: "4.9", category: "Hotels" },
    { _id: "local_07", name: "Ganges Riverside Ashram", city: "Rishikesh", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank", price: "1,899", rating: "4.9", category: "Yoga" },
    { _id: "local_08", name: "Kedarkantha Base Cottage", city: "Sankri", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Sankri", price: "3,199", rating: "4.7", category: "Treks" }
  ];

  // Districts Data for Homepage Culture Section
  const uttarakhandDistricts = [
    { id: "uttarkashi", name: "उत्तरकाशी", tagline: "पहाड़ी राजमा और ट्रेकिंग", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80", food: "पहाड़ी राजमा, लाल चावल" },
    { id: "tehri", name: "टिहरी गढ़वाल", tagline: "झील किनारे का स्वाद", image: "https://images.unsplash.com/photo-1595655608293-98782a174f83?auto=format&fit=crop&w=600&q=80", food: "चैनसू, गहत की दाल" },
    { id: "dehradun", name: "देहरादून & मसूरी", tagline: "कैफे और पहाड़ी ज़ायका", image: "https://images.unsplash.com/photo-1589182337358-2fabedd73e9d?auto=format&fit=crop&w=600&q=80", food: "कफुली, बाल मिठाई" },
    { id: "nainital", name: "नैनीताल", tagline: "कुमाऊनी ज़ायका और झीलें", image: "https://images.unsplash.com/photo-1590447158019-883281ab4bc1?auto=format&fit=crop&w=600&q=80", food: "भट की चुर्काणी, आलू गुटके" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const rawData = Array.isArray(res.data) ? res.data : [];
        const backendData = rawData.map(item => ({
          ...item,
          price: item.price || "2,499",
          rating: item.rating || "4.8",
          category: item.category || "Hotels",
          image: item.image || item.img || "/images/hotals/Hotel Nagraja Palace1.jpg"
        }));
        
        const merged = [
          ...localUttarkashiHotels, 
          ...backendData.filter(bh => bh._id && !String(bh._id).startsWith("local_"))
        ];
        setHotels(merged);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        setHotels(localUttarkashiHotels);
        setLoading(false);
      });
  }, []);

  const majorCities = ["All", "Rishikesh", "Uttarkashi", "Kedarnath", "Badrinath", "Haridwar", "Dehradun"];
  const dbCities = [...new Set(hotels.map((h) => h.location || h.city).filter(Boolean))];
  const cityOptions = [...new Set([...majorCities, ...dbCities])];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}&tab=${encodeURIComponent(activeTab)}`);
  };

  const filteredListings = hotels.filter((item) => {
    const itemName = (item.name || "").trim().toLowerCase();
    if (itemName === "ravi govindam") return false;

    if (!item.category) return true;
    return String(item.category).trim().toLowerCase() === String(activeTab).trim().toLowerCase();
  });

  const sacredPlaces = [
    { name: "Kedarnath", desc: "Sacred shrine nestled in Garhwal Himalayas.", img: "/images/chardham/kedarnath.jpg", searchUrl: "https://www.google.com/search?q=Kedarnath+Dham+guide" },
    { name: "Badrinath", desc: "Holy divine abode of Lord Vishnu.", img: "/images/chardham/badrinath.jpg", searchUrl: "https://www.google.com/search?q=Badrinath+Dham+guide" },
    { name: "Gangotri", desc: "Pristine origin point of holy river Ganga.", img: "/images/chardham/gangotri.jpg", searchUrl: "https://www.google.com/search?q=Gangotri+temple+guide" },
    { name: "Yamunotri", desc: "Sacred source of the Yamuna River.", img: "/images/chardham/yamunotri.jpg", searchUrl: "https://www.google.com/search?q=Yamunotri+temple+guide" }
  ];

  const yogaRetreats = [
    { name: "Himalayan Sanctuary", desc: "Deep meditation in mountain silence.", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600", path: "/details/himalayan-yoga" },
    { name: "Ayurvedic Wellness", desc: "Holistic healing through herbs.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", path: "/details/ayurvedic-therapy" },
    { name: "Meditation & Pranayama", desc: "Master breath by the sacred Ganges.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600", path: "/details/meditation" },
    { name: "Panchakarma Detox", desc: "Complete body purification stay.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", path: "/details/panchakarma" }
  ];

  const popularTreks = [
    { name: "Kedarkantha Trek", desc: "Classic snow trail expedition with views.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", path: "/details/kedarkantha" },
    { name: "Valley of Flowers", desc: "UNESCO World Heritage floral valley.", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600", path: "/details/valley-of-flowers" },
    { name: "Roopkund Glacial", desc: "Mystical high-altitude glacial lake.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", path: "/details/roopkund" },
    { name: "Har Ki Dun", desc: "Ancient cradle of Swargarohini.", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", path: "/details/harkidun" }
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh", paddingBottom: "70px" }}>
      
      {/* Hero Banner Section */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.85)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px 100px 20px",
        textAlign: "center",
        color: "white",
        transition: "background-image 1s ease-in-out"
      }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "900", marginBottom: "12px", letterSpacing: "-1px", lineHeight: "1.2" }}>
            Discover the True Spirit of the Himalayas
          </h1>
          <p style={{ fontSize: "17px", color: "#e2e8f0", marginBottom: "35px", fontWeight: "400" }}>
            Book Verified Mountain Stays, Sacred Char Dham Yatra Packages & Guided Treks
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "25px", flexWrap: "wrap" }}>
            {[
              { id: "Hotels", label: "🏨 Stays & Hotels" },
              { id: "Yoga", label: "🌿 Yoga Retreats" },
              { id: "Treks", label: "⚡ Trekking Camps" }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "#0284c7" : "rgba(255, 255, 255, 0.15)",
                  color: "white",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px 28px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            textAlign: "left",
            color: "#0f172a"
          }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 2, minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>DESTINATION</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#f8fafc", fontWeight: "600" }}
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 3, minWidth: "220px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>KEYWORD</label>
                <input 
                  type="text" 
                  placeholder="Hotel name, location, or trek..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: "130px", alignSelf: "flex-end" }}>
                <button type="submit" style={{
                  width: "100%", background: "#0284c7", color: "white", border: "none", padding: "13px", 
                  borderRadius: "10px", fontWeight: "800", fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)"
                }}>
                  SEARCH
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ maxWidth: "1240px", margin: "50px auto 0", padding: "0 24px" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "60px" }}>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "32px" }}>🛡️</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "15px", fontWeight: "800" }}>100% Verified Properties</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Direct verified stays with best prices.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "32px" }}>⚡</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "15px", fontWeight: "800" }}>Instant Confirmation</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Get booking details instantly on SMS.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "32px" }}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "15px", fontWeight: "800" }}>24/7 Mountain Support</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Dedicated local assistance during travel.</p>
            </div>
          </div>
        </div>

        {/* Explore Districts & Local Culture Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>उत्तराखंड संस्कृति और ज़ायका</span>
              <h2 style={{ fontSize: "30px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0 0" }}>
                Explore Districts & Local Food
              </h2>
            </div>
            <button 
              onClick={() => navigate("/districts")}
              style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: "800", cursor: "pointer", fontSize: "14px" }}
            >
              View All Districts →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {uttarakhandDistricts.map((dist) => (
              <div 
                key={dist.id}
                onClick={() => navigate(`/districts/${dist.id}`)}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  transition: "transform 0.2s ease"
                }}
              >
                <img src={dist.image} alt={dist.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                <div style={{ padding: "18px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>{dist.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 12px 0" }}>{dist.tagline}</p>
                  <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px" }}>
                    🍽️ {dist.food}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handpicked Stays */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>FEATURED ACCOMMODATIONS</span>
              <h2 style={{ fontSize: "30px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0 0" }}>
                Handpicked Stays & Retreats
              </h2>
            </div>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() => scrollStays("left")} style={navButtonStyle}>‹</button>
              <button onClick={() => scrollStays("right")} style={navButtonStyle}>›</button>
              <button 
                onClick={() => navigate("/hotels")}
                style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: "800", cursor: "pointer", fontSize: "14px", marginLeft: "10px" }}
              >
                View All →
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#64748b" }}>🏔️ Loading Verified Stays...</div>
          ) : (
            <div 
              ref={staysScrollRef}
              style={horizontalScrollContainer}
            >
              {filteredListings.length > 0 ? (
                filteredListings.map((hotel) => (
                  <div 
                    key={hotel._id}
                    style={largeCardStyle}
                  >
                    <div style={{ position: "relative" }}>
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        style={{ width: "100%", height: "160px", objectFit: "cover" }} 
                        onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
                      />
                      <span style={{
                        position: "absolute", top: "12px", right: "12px", background: "rgba(15, 23, 42, 0.85)",
                        color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "800"
                      }}>
                        ⭐ {hotel.rating || "4.8"}
                      </span>
                    </div>

                    <div style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1, boxSizing: "border-box" }}>
                      <div>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>
                          📍 {hotel.location || hotel.city}
                        </span>
                        <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "6px 0 8px 0", lineHeight: "1.3" }}>
                          {hotel.name}
                        </h3>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "12px", marginTop: "8px" }}>
                        <div>
                          <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Starting from</span>
                          <span style={{ fontSize: "17px", fontWeight: "900", color: "#0f172a" }}>₹{hotel.price || "2,499"}</span>
                        </div>
                        <button 
                          onClick={() => navigate(`/hotels/${hotel._id}`)}
                          style={{
                            background: "#0284c7", color: "white", border: "none", padding: "8px 14px",
                            borderRadius: "10px", fontWeight: "700", fontSize: "13px", cursor: "pointer"
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b", padding: "20px" }}>No stays available in this category.</p>
              )}
            </div>
          )}
        </div>

        {/* Special Offer / Promo Banner */}
        <div style={{
          margin: "60px 0",
          background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
          borderRadius: "24px",
          padding: "40px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.4)"
        }}>
          <div>
            <span style={{ background: "rgba(255, 255, 255, 0.2)", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              ⚡ Limited Period Offer
            </span>
            <h2 style={{ fontSize: "28px", fontWeight: "900", margin: "14px 0 8px 0" }}>
              Get 20% OFF on Your First Char Dham Booking!
            </h2>
            <p style={{ fontSize: "15px", color: "#e0f2fe", margin: 0, maxWidth: "600px" }}>
              Use code <strong style={{ background: "white", color: "#0369a1", padding: "2px 8px", borderRadius: "6px" }}>HIMALAYA20</strong> during checkout to avail instant discount on verified stays and packages.
            </p>
          </div>
          <button 
            onClick={() => navigate("/search?tab=Hotels")}
            style={{
              background: "white",
              color: "#0369a1",
              border: "none",
              padding: "14px 28px",
              borderRadius: "14px",
              fontWeight: "900",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease"
            }}
          >
            Claim Offer Now
          </button>
        </div>

        {/* Yoga & Wellness */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", color: "#059669", textTransform: "uppercase", letterSpacing: "1px" }}>REJUVENATE BODY & SOUL</span>
            <h2 style={{ fontSize: "30px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0 0" }}>Yoga & Wellness Retreats</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {yogaRetreats.map((item, idx) => (
              <div key={idx} style={largeCardStyle} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} />
                <div style={{ padding: "18px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Treks */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", color: "#d97706", textTransform: "uppercase", letterSpacing: "1px" }}>THRILLING EXPEDITIONS</span>
            <h2 style={{ fontSize: "30px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0 0" }}>Popular Alpine Treks</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {popularTreks.map((item, idx) => (
              <div key={idx} style={largeCardStyle} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} />
                <div style={{ padding: "18px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilgrimage Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>
              SACRED DESTINATIONS
            </span>
            <h2 style={{ fontSize: "30px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0 0" }}>
              Explore Pilgrimage & Char Dham
            </h2>
          </div>

          <div style={horizontalScrollContainer}>
            {sacredPlaces.map((item, idx) => (
              <a 
                key={idx} 
                href={item.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...largeCardStyle, textDecoration: "none" }}
              >
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} />
                <div style={{ padding: "18px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section style={{ marginTop: "60px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "50px 30px", borderRadius: "24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "30px", fontWeight: "900" }}>Why Choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "80px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "40px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>100+</h2>
              <p style={{ fontSize: "15px", color: "#94a3b8", marginTop: "4px" }}>Verified Mountain Stays</p>
            </div>
            <div>
              <h2 style={{ fontSize: "40px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>10k+</h2>
              <p style={{ fontSize: "15px", color: "#94a3b8", marginTop: "4px" }}>Happy Travelers</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const badgeCardStyle = {
  background: "white",
  padding: "20px 24px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
};

const navButtonStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "1px solid #cbd5e1",
  background: "white",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0f172a"
};

const horizontalScrollContainer = {
  display: "flex",
  gap: "24px",
  overflowX: "auto",
  paddingBottom: "15px",
  scrollBehavior: "smooth",
  scrollbarWidth: "none",
  alignItems: "stretch"
};

const largeCardStyle = {
  background: "#fff",
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
  cursor: "pointer",
  minWidth: "280px",
  width: "290px",
  flex: "0 0 auto",
  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
  transition: "transform 0.2s ease",
  display: "flex",
  flexDirection: "column"
};