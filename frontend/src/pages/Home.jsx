import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // तुम्हारे चारों प्रीमियम डेस्टिनेशंस
  const trendingDestinations = [
    { name: "Mussoorie", stays: "1,240 properties", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", flag: "🏔️" },
    { name: "Nainital", stays: "967 properties", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", flag: "🛶" },
    { name: "Auli", stays: "480 properties", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", flag: "⛷️" },
    { name: "Rishikesh", stays: "2,150 properties", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", flag: "🧘" }
  ];

  const propertyTypes = [
    { name: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Apartments", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
    { name: "Resorts", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400" },
    { name: "Villas", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/hotels?city=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/hotels");
    }
  };

  return (
    <div style={{ fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif", background: "#f8fafc", minHeight: "100vh", color: "#0f172a" }}>
      
      {/* 🏔️ 1. PREMIUM DARK LUXURY HERO BANNER (तुम्हारी ओरिजिनल थीम के साथ सिंक) */}
      <div style={{ 
        background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)", 
        padding: "80px 20px 100px", 
        color: "#fff", 
        textAlign: "center" 
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.2rem", fontWeight: "800", margin: "0 0 16px 0", letterSpacing: "-1.5px", background: "linear-gradient(to right, #ffffff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Find your next Himalayan stay
          </h1>
          <p style={{ fontSize: "1.3rem", margin: "0 0 40px 0", fontWeight: "400", color: "#94a3b8" }}>
            Explore premium hotels, cozy homestays, and unique experiences.
          </p>
        </div>
      </div>

      {/* 🟨 2. FLOATING PREMIUM SEARCH BAR (Booking.com लेआउट, पर बिना कॉपी लगे) */}
      <div style={{ maxWidth: "1100px", margin: "-40px auto 0", padding: "0 20px", position: "relative", zIndex: "10" }}>
        <form onSubmit={handleSearch} style={{ 
          display: "flex", 
          background: "#1e293b", // डार्क स्लेट बैकग्राउंड (प्रीमियम लुक)
          padding: "6px", 
          borderRadius: "12px", 
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          gap: "6px",
          alignItems: "stretch",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          {/* Input Area */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", borderRadius: "8px", padding: "0 16px" }}>
            <span style={{ marginRight: "12px", fontSize: "18px" }}>🛏️</span>
            <input 
              type="text" 
              placeholder="Where are you going? (e.g. Uttarkashi, Rishikesh)" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ width: "100%", padding: "16px 0", border: "none", fontSize: "15px", outline: "none", color: "#0f172a", fontWeight: "500" }} 
            />
          </div>
          
          {/* Calendar Indicator */}
          <div style={{ width: "240px", display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", borderRadius: "#fff", padding: "0 16px", color: "#cbd5e1", fontSize: "14px", fontWeight: "500", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}>
            <span style={{ marginRight: "10px" }}>📅</span> June 2026
          </div>

          {/* Premium Blue Action Button */}
          <button type="submit" style={{ 
            padding: "0 36px", 
            background: "#2563eb", 
            color: "#fff", 
            border: "none", 
            borderRadius: "8px", 
            fontSize: "15px", 
            fontWeight: "700", 
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(37,99,235,0.4)"
          }}>
            Search
          </button>
        </form>
      </div>

      {/* 📄 MAIN LAYOUT AREA */}
      <div style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 20px" }}>
        
        {/* 📦 PROPERTY TYPES */}
        <div style={{ marginBottom: "50px" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "16px", color: "#0f172a" }}>Browse by property type</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {propertyTypes.map((type) => (
              <div key={type.name} style={{ cursor: "pointer" }} onClick={() => navigate("/hotels")}>
                <div style={{ height: "160px", borderRadius: "12px", overflow: "hidden", marginBottom: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                  <img src={type.image} alt={type.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h4 style={{ margin: "0", fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>{type.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* 🏔️ TRENDING DESTINATIONS */}
        <div style={{ marginBottom: "60px" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>Trending destinations</h3>
          <p style={{ color: "#64748b", margin: "0 0 24px 0", fontSize: "14px" }}>Most popular choices for Himalayan travelers</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {trendingDestinations.map((city) => (
              <div 
                key={city.name} 
                onClick={() => navigate(`/hotels?city=${encodeURIComponent(city.name)}`)}
                style={{ 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)", 
                  border: "1px solid #e2e8f0", 
                  cursor: "pointer",
                  background: "#fff"
                }}
              >
                <div style={{ height: "180px", position: "relative" }}>
                  <img src={city.image} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ 
                    position: "absolute", 
                    top: "16px", 
                    left: "16px", 
                    color: "#fff", 
                    fontSize: "20px", 
                    fontWeight: "800", 
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    {city.name} {city.flag}
                  </div>
                </div>
                
                <div style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>{city.stays}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}