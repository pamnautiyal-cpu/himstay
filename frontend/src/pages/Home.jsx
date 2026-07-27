import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hotels");
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroImages = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", location: "Gangotri Hwy", price: "2,499", rating: "4.8", category: "Hotels" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600", location: "NH 34", price: "1,899", rating: "4.9", category: "Hotels" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", location: "Barahat Range", price: "2,199", rating: "4.7", category: "Hotels" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600", location: "Near Medicose", price: "2,200", rating: "4.6", category: "Hotels" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600", location: "ITBP Rd", price: "1,599", rating: "4.8", category: "Hotels" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600", location: "Main Market", price: "2,799", rating: "4.9", category: "Hotels" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = (res.data || []).map(item => ({
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

  const majorCities = ["All", "Uttarkashi", "Matli", "Athali", "Rishikesh"];
  const priceRanges = [
    { label: "All Prices", value: "All" },
    { label: "Under ₹2,000", value: "0-2000" },
    { label: "₹2,000 - ₹3,000", value: "2000-3000" },
    { label: "₹3,000+", value: "3000-max" }
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}&price=${encodeURIComponent(selectedPriceRange)}&tab=${activeTab}`);
  };

  const filteredListings = hotels.filter((item) => {
    if (!item.category) return true;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });

  const displayedHotels = filteredListings.slice(0, 4);

  const tourismDestinations = [
    { name: "Kedarnath", desc: "Sacred Jyotirlinga in high Garhwal.", img: "/images/chardham/kedarnath.jpg", path: "/search?query=kedarnath" },
    { name: "Badrinath", desc: "Divine abode of Lord Vishnu.", img: "/images/chardham/badrinath.jpg", path: "/search?query=badrinath" },
    { name: "Gangotri", desc: "Pristine origin of river Ganga.", img: "/images/chardham/gangotri.jpg", path: "/search?query=gangotri" },
    { name: "Yamunotri", desc: "Legendary source of Yamuna.", img: "/images/chardham/yamunotri.jpg", path: "/search?query=yamunotri" }
  ];

  const yogaRetreats = [
    { name: "Himalayan Yoga Sanctuary", desc: "Meditation in mountain silence.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600", path: "/search?query=yoga" },
    { name: "Ayurvedic Wellness", desc: "Healing through ancient herbs.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", path: "/search?query=ayurveda" }
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", color: "#0f172a", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* 🌟 Luxury Hero Section */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.75)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 20px 70px 20px",
        textAlign: "center",
        color: "white",
        transition: "background-image 1s ease-in-out"
      }}>
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", letterSpacing: "-0.5px" }}>
            Book Handpicked Himalayan Stays
          </h1>
          <p style={{ fontSize: "15px", color: "#cbd5e1", marginBottom: "25px", fontWeight: "400" }}>
            Experience luxury mountain retreats, verified homestays, and spiritual sanctuaries.
          </p>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
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
                  padding: "8px 18px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "12px",
                  cursor: "pointer",
                  backdropFilter: "blur(4px)"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Luxury Floating Search Bar */}
          <div style={{
            background: "white",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
            textAlign: "left",
            color: "#0f172a"
          }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              
              <div style={{ flex: 2, minWidth: "150px" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>Destination</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#f8fafc", fontWeight: "600" }}
                >
                  {majorCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 2, minWidth: "150px" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>Price Range</label>
                <select 
                  value={selectedPriceRange} 
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#f8fafc", fontWeight: "600" }}
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 2, minWidth: "160px" }}>
                <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>Keyword</label>
                <input 
                  type="text" 
                  placeholder="e.g. Luxury, Matli..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: "110px", alignSelf: "flex-end" }}>
                <button type="submit" style={{
                  width: "100%", background: "#0284c7", color: "white", border: "none", padding: "11px", 
                  borderRadius: "8px", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 10px rgba(2, 132, 199, 0.3)"
                }}>
                  SEARCH
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Main Content Container with Clean Spacing */}
      <div style={{ maxWidth: "1150px", margin: "40px auto 0", padding: "0 20px" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          <div style={badgeStyle}>🛡️ <div><h4 style={{ margin: 0, fontSize: "13px" }}>100% Verified Stays</h4><p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>Direct curated properties</p></div></div>
          <div style={badgeStyle}>⚡ <div><h4 style={{ margin: 0, fontSize: "13px" }}>Instant Booking</h4><p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>Secure payment & confirmation</p></div></div>
          <div style={badgeStyle}>📞 <div><h4 style={{ margin: 0, fontSize: "13px" }}>24/7 Support</h4><p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>Local Uttarakhand assistance</p></div></div>
        </div>

        {/* Dynamic Featured Stays */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              🔥 Trending Featured Stays ({activeTab})
            </h2>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>Handpicked top-rated mountain retreats</p>
          </div>
          <button 
            onClick={() => navigate("/hotels")}
            style={{ background: "#0284c7", color: "white", border: "none", padding: "7px 14px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
          >
            View All Stays ({filteredListings.length}) →
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", fontSize: "16px", color: "#64748b" }}>Loading Stays...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginBottom: "45px" }}>
            {displayedHotels.map((hotel) => (
              <div 
                key={hotel._id}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                  transition: "transform 0.2s"
                }}
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              >
                <div style={{ position: "relative" }}>
                  <img src={hotel.image} alt={hotel.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(15,23,42,0.85)", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "700" }}>
                    ⭐ {hotel.rating || "4.8"}
                  </span>
                </div>
                <div style={{ padding: "14px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>📍 {hotel.location || hotel.city}</span>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "4px 0 6px 0" }}>{hotel.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "8px", marginTop: "8px" }}>
                    <div>
                      <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>From</span>
                      <span style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>₹{hotel.price}</span>
                    </div>
                    <span style={{ background: "#0284c7", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Char Dham & Tourism Horizontal Scroll */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>✨ Uttarakhand Tourism & Shrines</h2>
          <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none" }}>
            {tourismDestinations.map((item, idx) => (
              <div key={idx} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", minWidth: "220px", cursor: "pointer" }} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "700", margin: "0 0 2px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const badgeStyle = {
  background: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
};