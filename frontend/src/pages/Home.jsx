import React, { useState, useEffect } from "react";
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

  const heroImages = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", location: "Gangotri Hwy", price: "2,499", rating: "4.8", category: "Hotels" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600", location: "NH 34", price: "1,899", rating: "4.9", category: "Hotels" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", location: "Barahat Range", price: "2,199", rating: "4.7", category: "Hotels" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600", location: "Near Medicose", price: "2,200", rating: "4.6", category: "Hotels" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600", location: "ITBP Rd", price: "1,599", rating: "4.8", category: "Hotels" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600", location: "Main Market", price: "2,799", rating: "4.9", category: "Hotels" },
    { _id: "local_07", name: "Ganges Riverside Ashram & Yoga Stay", city: "Rishikesh", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank", price: "1,899", rating: "4.9", category: "Yoga" },
    { _id: "local_08", name: "Kedarkantha Base Camp Wooden Cottage", city: "Sankri", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Sankri, Kedarkantha", price: "3,199", rating: "4.7", category: "Treks" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = res.data.map(item => ({
          ...item,
          price: item.price || "2,499",
          rating: item.rating || "4.8",
          category: item.category || "Hotels",
          image: item.image || item.img || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
        }));
        const merged = [...localUttarkashiHotels, ...backendData.filter(bh => !bh._id.startsWith("local_"))];
        setHotels(merged);
        setLoading(false);
      })
      .catch(() => {
        setHotels(localUttarkashiHotels);
        setLoading(false);
      });
  }, []);

  const majorCities = ["All", "Rishikesh", "Uttarkashi", "Kedarnath", "Badrinath", "Haridwar", "Dehradun", "Delhi", "Mumbai"];
  const dbCities = [...new Set(hotels.map((h) => h.location || h.city).filter(Boolean))];
  const cityOptions = [...new Set([...majorCities, ...dbCities])];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}&tab=${activeTab}`);
  };

  const filteredListings = hotels.filter((item) => {
    if (!item.category) return true;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });

  // Data linked with your specific detail pages
  const tourismDestinations = [
    { name: "Kedarnath", desc: "Sacred Jyotirlinga nestled in the high Garhwal Himalayas.", img: "/images/chardham/kedarnath.jpg", path: "/chardham" },
    { name: "Badrinath", desc: "Holy divine abode of Lord Vishnu on the Alaknanda riverbank.", img: "/images/chardham/badrinath.jpg", path: "/chardham" },
    { name: "Gangotri", desc: "Pristine origin point of the holy river Ganga.", img: "/images/chardham/gangotri.jpg", path: "/chardham" },
    { name: "Yamunotri", desc: "Sacred legendary source of the Yamuna River.", img: "/images/chardham/yamunotri.jpg", path: "/chardham" }
  ];

  const yogaRetreats = [
    { name: "Himalayan Yoga Sanctuary", desc: "Deep meditation and spiritual awakening in mountain silence.", img: "/images/yoga/himalayan-yoga-retreat.jpg", path: "/yoga" },
    { name: "Ayurvedic Wellness & Therapy", desc: "Holistic healing through ancient Himalayan herbs.", img: "/images/yoga/ayurvedic-therapy.jpg", path: "/yoga" },
    { name: "Meditation & Pranayama", desc: "Master your breath by the sacred Ganges flow.", img: "/images/yoga/meditation-pranayama.jpg", path: "/yoga" },
    { name: "Panchakarma Detox", desc: "Complete body purification and holistic rejuvenation.", img: "/images/yoga/panchakarma.jpg", path: "/yoga" }
  ];

  const popularTreks = [
    { name: "Kedarkantha Winter Trek", desc: "Classic snow trail expedition with panoramic summit views.", img: "/images/treks/kedarkantha.jpg", path: "/trek-details" },
    { name: "Valley of Flowers", desc: "UNESCO World Heritage alpine floral wonderland.", img: "/images/treks/valley-of-flowers.jpg", path: "/trek-details" },
    { name: "Roopkund Glacial Trek", desc: "The mystical high-altitude glacial lake expedition.", img: "/images/treks/roopkund.jpg", path: "/trek-details" },
    { name: "Har Ki Dun Expedition", desc: "Ancient cradle of Swargarohini in Garhwal.", img: "/images/treks/har-ki-dun.jpg", path: "/trek-details" }
  ];

  const travelBlogs = [
    { title: "Complete Master Guide to Char Dham Yatra 2026", date: "April 12, 2026", img: "/images/chardham/kedarnath.jpg", path: "/blogs" },
    { title: "Top 5 Peaceful Meditation Spots in Rishikesh", date: "March 28, 2026", img: "/images/yoga/himalayan-yoga-retreat.jpg", path: "/blogs" },
    { title: "Essential Packing Checklist for Kedarkantha Trek", date: "March 15, 2026", img: "/images/treks/kedarkantha.jpg", path: "/blogs" }
  ];

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: "50px" }}>
      
      {/* Professional Himalayan Navigation Bar */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "10px 20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "25px", overflowX: "auto", whiteSpace: "nowrap" }}>
        {[
          { label: "🏔️ Char Dham Yatra", path: "/chardham" },
          { label: "🏨 Himalayan Stays", path: "/stays" },
          { label: "🌿 Yoga & Wellness", path: "/yoga" },
          { label: "⚡ Alpine Treks", path: "/treks" },
          { label: "🚖 Mountain Transfers", path: "/cabs" },
          { label: "📖 Explorer Guides", path: "/blogs" }
        ].map((item, idx) => (
          <span key={idx} onClick={() => navigate(item.path)} style={{ fontSize: "13px", fontWeight: "700", color: "#334155", cursor: "pointer", transition: "0.2s" }}
            onMouseEnter={(e) => e.target.style.color = "#0284c7"}
            onMouseLeave={(e) => e.target.style.color = "#334155"}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* Hero Banner */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(11, 19, 43, 0.65), rgba(11, 19, 43, 0.85)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 20px 80px 20px",
        textAlign: "center",
        color: "white",
        transition: "background-image 1s ease-in-out"
      }}>
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px" }}>
            Discover the True Spirit of the Himalayas
          </h1>
          <p style={{ fontSize: "15px", color: "#cbd5e1", marginBottom: "25px" }}>
            Book Verified Mountain Stays, Sacred Char Dham Yatra Packages & Guided Treks
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
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
                  background: activeTab === tab.id ? "#0284c7" : "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "0.2s"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
            textAlign: "left",
            color: "#0f172a"
          }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 2, minWidth: "220px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>Select Destination</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#f8fafc", fontWeight: "600" }}
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 3, minWidth: "240px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>Search Stay / Activity / Keyword</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kedarnath Lodge, Rishikesh Yoga..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: "140px", alignSelf: "flex-end" }}>
                <button type="submit" style={{
                  width: "100%", background: "#0284c7", color: "white", border: "none", padding: "13px", 
                  borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.4)"
                }}>
                  SEARCH
                </button>
              </div>
            </form>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
            {heroImages.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: currentSlide === idx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: currentSlide === idx ? "#38bdf8" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "30px auto 0", padding: "0 20px" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "15px", marginBottom: "35px" }}>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "26px" }}>🛡️</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>100% Verified Properties</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Direct verified stays with best prices.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "26px" }}>⚡</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>Instant Confirmation</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Get booking details instantly on SMS & Email.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "26px" }}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>24/7 Mountain Support</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Dedicated local assistance during your journey.</p>
            </div>
          </div>
        </div>

        {/* Handpicked Stays */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              🔥 Handpicked Stays & Retreat Ads ({activeTab})
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "3px 0 0 0" }}>Explore top-rated mountain hotels and verified stays</p>
          </div>
          <button 
            onClick={() => navigate("/stays")}
            style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
          >
            View All Stays →
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#64748b" }}>🏔️ Loading Stays...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "20px", marginBottom: "40px" }}>
            {filteredListings.length > 0 ? (
              filteredListings.map((hotel) => (
                <div 
                  key={hotel._id}
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"; }}
                    />
                    <span style={{
                      position: "absolute", top: "10px", right: "10px", background: "rgba(15, 23, 42, 0.8)",
                      color: "white", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700"
                    }}>
                      ⭐ {hotel.rating || "4.8"}
                    </span>
                  </div>

                  <div style={{ padding: "15px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>
                        📍 {hotel.location || hotel.city}
                      </span>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "6px 0 10px 0", lineHeight: "1.3" }}>
                        {hotel.name}
                      </h3>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "10px", marginTop: "10px" }}>
                      <div>
                        <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Starting from</span>
                        <span style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>₹{hotel.price || "2,499"}</span>
                        <span style={{ fontSize: "11px", color: "#64748b" }}> / night</span>
                      </div>
                      <button 
                        onClick={() => navigate(`/hotels/${hotel._id}`)}
                        style={{
                          background: "#0284c7", color: "white", border: "none", padding: "8px 14px",
                          borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer"
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#64748b", gridColumn: "span 4", textAlign: "center", padding: "20px" }}>No stays found for this category yet.</p>
            )}
          </div>
        )}

        {/* 1. Uttarakhand Tourism (Linked to CharDhamDetail / DestinationDetail) */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>✨ Divine Shrines & Sacred Trails</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "2px 0 0 0" }}>Uttarakhand Tourism & Shrines</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {tourismDestinations.map((item, idx) => (
              <div key={idx} style={horizontalCardStyle} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Yoga & Wellness (Linked to YogaDetail) */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#059669", textTransform: "uppercase" }}>🌿 Rejuvenate Body & Soul in Mountain Silence</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "2px 0 0 0" }}>Yoga & Wellness Retreats</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {yogaRetreats.map((item, idx) => (
              <div key={idx} style={horizontalCardStyle} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Popular Treks (Linked to TrekDetails) */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#d97706", textTransform: "uppercase" }}>⚡ Thrilling Alpine Routes & Snowy Expeditions</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "2px 0 0 0" }}>Popular Alpine Treks</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {popularTreks.map((item, idx) => (
              <div key={idx} style={horizontalCardStyle} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Blog / Stories Section (Linked to BlogDetail / Blogs) */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ marginBottom: "12px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0 }}>📖 Himalayan Travel Stories & Guides</h2>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>Read expert travel insights and itineraries</p>
          </div>
          <div style={horizontalScrollContainer}>
            {travelBlogs.map((blog, idx) => (
              <div key={idx} style={{ ...horizontalCardStyle, minWidth: "280px" }} onClick={() => navigate(blog.path)}>
                <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <span style={{ fontSize: "11px", color: "#0284c7", fontWeight: "700" }}>{blog.date}</span>
                  <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: "4px 0 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{blog.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section style={{ marginTop: "40px", background: "#0f172a", color: "#fff", padding: "35px 20px", borderRadius: "18px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "20px", fontWeight: "800" }}>Why choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "50px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "2rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>100+</h2>
              <h3 style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>Verified Stays</h3>
            </div>
            <div>
              <h2 style={{ fontSize: "2rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>10k+</h2>
              <h3 style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>Happy Travelers</h3>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const badgeCardStyle = {
  background: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
};

const horizontalScrollContainer = {
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  paddingBottom: "10px",
  scrollBehavior: "smooth",
  scrollbarWidth: "none"
};

const horizontalCardStyle = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
  cursor: "pointer",
  minWidth: "220px",
  flex: "0 0 auto",
  boxShadow: "0 3px 10px rgba(0,0,0,0.03)",
  transition: "transform 0.2s ease"
};