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
      const scrollAmount = direction === "left" ? -320 : 320;
      staysScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Random shuffle function for dynamic feel
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Hero Banner Slider Images
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

  // Local Uttarkashi Stays & Master List
  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "/images/hotals/Hotel Nagraja Palace1.jpg", location: "Gangotri Hwy", price: "2,499", rating: "4.8", category: "Hotels" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay1.jpg", location: "NH 34", price: "1,899", rating: "4.9", category: "Hotels" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Barahat Range", price: "2,199", rating: "4.7", category: "Hotels" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "Near Medicose", price: "2,200", rating: "4.6", category: "Hotels" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", location: "ITBP Rd", price: "1,599", rating: "4.8", category: "Hotels" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", location: "Main Market", price: "2,799", rating: "4.9", category: "Hotels" },
    { _id: "dummy_01", name: "Snow Peak Luxury Villa", city: "Harsil", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600", location: "Apple Orchards", price: "4,500", rating: "5.0", category: "Hotels" },
    { _id: "dummy_02", name: "Ganga Riverside Glamping", city: "Rishikesh", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600", location: "Brahmapuri", price: "3,200", rating: "4.9", category: "Hotels" },
    { _id: "local_07", name: "Ganges Riverside Ashram", city: "Rishikesh", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank", price: "1,899", rating: "4.9", category: "Yoga" },
    { _id: "local_08", name: "Kedarkantha Base Cottage", city: "Sankri", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Sankri", price: "3,199", rating: "4.7", category: "Treks" }
  ];

  // Unique and fixed images for Uttarakhand Districts
  const uttarakhandDistricts = [
    { id: "uttarkashi", name: "Uttarkashi", tagline: "Mountain Rajma & Trekking", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", food: "Pahari Rajma, Red Rice" },
    { id: "tehri", name: "Tehri Garhwal", tagline: "Lake View Delicacies", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", food: "Chainsoo, Gahat Dal" },
    { id: "dehradun", name: "Dehradun & Mussoorie", tagline: "Cafes & Mountain Flavors", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", food: "Kafuli, Bal Mithai" },
    { id: "nainital", name: "Nainital", tagline: "Kumaoni Flavors & Lakes", image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=600&q=80", food: "Bhatt ki Churkani, Aloo Gutke" }
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
          ...backendData.filter(bh => bh._id && !String(bh._id).startsWith("local_") && !String(bh._id).startsWith("dummy_"))
        ];
        
        setHotels(shuffleArray(merged));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        setHotels(shuffleArray(localUttarkashiHotels));
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
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0f172a", color: "#f8fafc", minHeight: "100vh", paddingBottom: "70px", overflowX: "hidden", width: "100%", boxSizing: "border-box" }}>
      
      {/* Hero Banner Section */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.95)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 15px 60px 15px",
        textAlign: "center",
        color: "white",
        borderBottom: "1px solid #334155",
        transition: "background-image 1s ease-in-out",
        boxSizing: "border-box"
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          
          <span style={{ 
            background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", padding: "6px 16px", borderRadius: "30px", 
            fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", display: "inline-block", 
            marginBottom: "14px", border: "1px solid rgba(56, 189, 248, 0.3)" 
          }}>
            ✨ Handpicked Stays & Journeys
          </span>

          <h1 style={{ fontSize: "clamp(26px, 4.5vw, 42px)", fontWeight: "900", marginBottom: "12px", letterSpacing: "-1px", lineHeight: "1.15" }}>
            Discover the True Spirit of the Himalayas
          </h1>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "#94a3b8", marginBottom: "25px", fontWeight: "400" }}>
            Book Verified Mountain Stays, Sacred Char Dham Yatra Packages & Guided Alpine Treks
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {[
              { id: "Hotels", label: "🏨 Stays" },
              { id: "Yoga", label: "🌿 Yoga" },
              { id: "Treks", label: "⚡ Treks" }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "#0284c7" : "rgba(30, 41, 59, 0.8)",
                  color: "white",
                  border: activeTab === tab.id ? "none" : "1px solid #475569",
                  padding: "8px 16px",
                  borderRadius: "30px",
                  fontWeight: "700",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Compact and Clean Search Box */}
          <div style={{
            background: "#1e293b",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.5)",
            textAlign: "left",
            color: "#f8fafc",
            border: "1px solid #334155",
            boxSizing: "border-box"
          }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: "1 1 100%", minWidth: "100%" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>DESTINATION</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #475569", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#0f172a", color: "#fff", fontWeight: "600", boxSizing: "border-box" }}
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: "1 1 100%", minWidth: "100%" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>KEYWORD</label>
                <input 
                  type="text" 
                  placeholder="Hotel name, location, or trek..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #475569", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#0f172a", color: "#fff", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ width: "100%" }}>
                <button type="submit" style={{
                  width: "100%", background: "#0284c7", color: "white", border: "none", padding: "12px", 
                  borderRadius: "8px", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 8px 16px -4px rgba(2, 132, 199, 0.5)"
                }}>
                  SEARCH EXPERIENCE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ maxWidth: "1240px", margin: "40px auto 0", padding: "0 20px", boxSizing: "border-box" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "50px" }}>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "28px" }}>🛡️</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#fff", fontSize: "15px", fontWeight: "800" }}>100% Verified Properties</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Direct verified stays with best prices.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "28px" }}>⚡</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#fff", fontSize: "15px", fontWeight: "800" }}>Instant Confirmation</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Get booking details instantly on SMS.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "28px" }}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#fff", fontSize: "15px", fontWeight: "800" }}>24/7 Mountain Support</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Dedicated local assistance during travel.</p>
            </div>
          </div>
        </div>

        {/* Handpicked Stays */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1.5px" }}>FEATURED ACCOMMODATIONS</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>
                Handpicked Stays & Retreats
              </h2>
            </div>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() => scrollStays("left")} style={navButtonStyle}>‹</button>
              <button onClick={() => scrollStays("right")} style={navButtonStyle}>›</button>
              <button 
                onClick={() => navigate("/hotels")}
                style={{ background: "transparent", border: "none", color: "#38bdf8", fontWeight: "800", cursor: "pointer", fontSize: "14px", marginLeft: "8px" }}
              >
                View All →
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", fontSize: "15px", color: "#94a3b8" }}>🏔️ Loading Verified Stays...</div>
          ) : (
            <div 
              ref={staysScrollRef}
              style={horizontalScrollContainer}
            >
              {filteredListings.length > 0 ? (
                filteredListings.map((hotel) => (
                  <div 
                    key={hotel._id}
                    onClick={() => navigate(`/hotels/${hotel._id}`)}
                    className="hover-card"
                    style={largeCardStyle}
                  >
                    <div style={{ position: "relative" }}>
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                        onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
                      />
                      <span style={{
                        position: "absolute", top: "12px", right: "12px", background: "rgba(15, 23, 42, 0.85)",
                        color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "800"
                      }}>
                        ⭐ {hotel.rating || "4.8"}
                      </span>
                    </div>

                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1, boxSizing: "border-box" }}>
                      <div>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          📍 {hotel.location || hotel.city}
                        </span>
                        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "6px 0 8px 0", lineHeight: "1.3" }}>
                          {hotel.name}
                        </h3>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #334155", paddingTop: "12px", marginTop: "8px" }}>
                        <div>
                          <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>Starting from</span>
                          <span style={{ fontSize: "16px", fontWeight: "900", color: "#fff" }}>₹{hotel.price || "2,499"}</span>
                        </div>
                        <span 
                          style={{
                            background: "#0284c7", color: "white", padding: "6px 12px",
                            borderRadius: "8px", fontWeight: "700", fontSize: "12px"
                          }}
                        >
                          Details
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#94a3b8", padding: "20px" }}>No stays available in this category.</p>
              )}
            </div>
          )}
        </div>

        {/* Special Offer / Promo Banner */}
        <div style={{
          margin: "50px 0",
          background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
          borderRadius: "20px",
          padding: "30px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 20px 25px -5px rgba(2, 132, 199, 0.3)",
          boxSizing: "border-box"
        }}>
          <div>
            <span style={{ background: "rgba(255, 255, 255, 0.2)", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              ⚡ Limited Period Offer
            </span>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: "900", margin: "12px 0 8px 0" }}>
              Get 20% OFF on Your First Char Dham Booking!
            </h2>
            <p style={{ fontSize: "14px", color: "#e0f2fe", margin: 0, maxWidth: "600px", lineHeight: "1.5" }}>
              Use code <strong style={{ background: "white", color: "#0369a1", padding: "2px 8px", borderRadius: "4px" }}>HIMALAYA20</strong> during checkout to avail instant discount on verified stays and packages.
            </p>
          </div>
          <button 
            onClick={() => navigate("/search?tab=Hotels")}
            style={{
              background: "#0f172a",
              color: "white",
              border: "none",
              padding: "14px 26px",
              borderRadius: "12px",
              fontWeight: "900",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              width: "100%",
              maxWidth: "210px"
            }}
          >
            Claim Offer Now
          </button>
        </div>

        {/* Yoga & Wellness */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#34d399", textTransform: "uppercase", letterSpacing: "1.5px" }}>REJUVENATE BODY & SOUL</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>Yoga & Wellness Retreats</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {yogaRetreats.map((item, idx) => (
              <div key={idx} onClick={() => navigate(item.path)} className="hover-card" style={largeCardStyle}>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} 
                />
                <div style={{ padding: "16px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Treks */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "1.5px" }}>THRILLING EXPEDITIONS</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>Popular Alpine Treks</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {popularTreks.map((item, idx) => (
              <div key={idx} onClick={() => navigate(item.path)} className="hover-card" style={largeCardStyle}>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} 
                />
                <div style={{ padding: "16px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilgrimage Section */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              SACRED DESTINATIONS
            </span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>
              Explore Pilgrimage & Char Dham
            </h2>
          </div>

          <div style={horizontalScrollContainer}>
            {sacredPlaces.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => window.open(item.searchUrl, "_blank")}
                className="hover-card"
                style={largeCardStyle}
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} 
                />
                <div style={{ padding: "16px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Districts & Local Food Section with Unique Fixed Images */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1.5px" }}>HIMALAYAN CULTURE & CUISINE</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>
                Explore Districts & Local Food
              </h2>
            </div>
            <button 
              onClick={() => navigate("/districts")}
              style={{ background: "transparent", border: "none", color: "#38bdf8", fontWeight: "800", cursor: "pointer", fontSize: "14px" }}
            >
              View All Districts →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {uttarakhandDistricts.map((dist) => (
              <div 
                key={dist.id}
                onClick={() => navigate(`/districts/${dist.id}`)}
                className="hover-card"
                style={{
                  background: "#1e293b",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #334155",
                  cursor: "pointer",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease"
                }}
              >
                <img 
                  src={dist.image} 
                  alt={dist.name} 
                  style={{ width: "100%", height: "160px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
                />
                <div style={{ padding: "16px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>{dist.name}</h3>
                  <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 12px 0" }}>{dist.tagline}</p>
                  <span style={{ background: "rgba(52, 211, 153, 0.1)", color: "#34d399", fontSize: "11px", fontWeight: "700", padding: "5px 10px", borderRadius: "6px", display: "inline-block", border: "1px solid rgba(52, 211, 153, 0.2)" }}>
                    🍽️ {dist.food}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section style={{ marginTop: "50px", background: "#1e293b", color: "#fff", padding: "40px 20px", borderRadius: "16px", textAlign: "center", border: "1px solid #334155", boxSizing: "border-box" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginBottom: "25px", fontWeight: "900" }}>Why Choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "space-around", gap: "30px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "40px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>100+</h2>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px", fontWeight: "600" }}>Verified Mountain Stays</p>
            </div>
            <div>
              <h2 style={{ fontSize: "40px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>10k+</h2>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px", fontWeight: "600" }}>Happy Travelers</p>
            </div>
          </div>
        </section>

      </div>

      {/* Global Hover Effect Stylesheet Injection */}
      <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          border-color: #38bdf8 !important;
          box-shadow: 0 15px 30px -5px rgba(56, 189, 248, 0.2) !important;
        }
      `}</style>
    </div>
  );
}

const badgeCardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #334155",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
  boxSizing: "border-box"
};

const navButtonStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "1px solid #475569",
  background: "#1e293b",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff"
};

const horizontalScrollContainer = {
  display: "flex",
  gap: "20px",
  overflowX: "auto",
  paddingBottom: "12px",
  scrollBehavior: "smooth",
  scrollbarWidth: "none",
  alignItems: "stretch",
  boxSizing: "border-box",
  WebkitOverflowScrolling: "touch"
};

const largeCardStyle = {
  background: "#1e293b",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #334155",
  cursor: "pointer",
  minWidth: "280px",
  width: "280px",
  flex: "0 0 auto",
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  transition: "all 0.2s ease",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box"
};