import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalFeature, setModalFeature] = useState("");

  const trendingDestinations = [
    { name: "Mussoorie", stays: "1,240 properties", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", flag: "🏔️" },
    { name: "Nainital", stays: "967 properties", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", flag: "🛶" },
    { name: "Auli", stays: "480 properties", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", flag: "⛷️" },
    { name: "Rishikesh", stays: "2,150 properties", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", flag: "🧘" }
  ];

  const propertyTypes = [
    { name: "Hotels", isLive: true, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Apartments", isLive: false, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
    { name: "Resorts", isLive: false, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400" },
    { name: "Villas", isLive: false, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/hotels?city=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/hotels");
    }
  };

  const handlePropertyClick = (type) => {
    if (type.isLive) {
      navigate("/hotels");
    } else {
      setModalFeature(type.name);
      setShowModal(true);
    }
  };

  return (
    <div style={{ fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif", background: "#f8fafc", minHeight: "100vh", color: "#0f172a", position: "relative" }}>
      
      {/* 🌌 1. MIXED TWILIGHT LUXURY HERO BANNER (नेवबार के साथ एकदम 100% सीमलेस सिंक) */}
      <div style={{ 
        background: "linear-gradient(180deg, #1c2541 0%, #0b132b 100%)", // मिक्स्ड डीप टोन ग्रेडिएंट
        padding: "80px 20px 100px", 
        color: "#fff", 
        textAlign: "center" 
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.2rem", fontWeight: "800", margin: "0 0 16px 0", letterSpacing: "-1.5px", background: "linear-gradient(to right, #ffffff, #e2e8f0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Find your next Himalayan stay
          </h1>
          <p style={{ fontSize: "1.3rem", margin: "0 0 40px 0", fontWeight: "400", color: "#94a3b8" }}>
            Explore premium hotels, cozy homestays, and unique experiences.
          </p>
        </div>
      </div>

      {/* 🟨 2. FLOATING PREMIUM SEARCH BAR */}
      <div style={{ maxWidth: "1100px", margin: "-40px auto 0", padding: "0 20px", position: "relative", zIndex: "10" }}>
        <form onSubmit={handleSearch} style={{ 
          display: "flex", 
          background: "#1e293b", 
          padding: "6px", 
          borderRadius: "12px", 
          boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
          gap: "6px",
          alignItems: "stretch",
          border: "1px solid rgba(255,255,255,0.08)"
        }}>
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
          
          <div style={{ width: "240px", display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "0 16px", color: "#cbd5e1", fontSize: "14px", fontWeight: "500", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}>
            <span style={{ marginRight: "10px" }}>📅</span> June 2026
          </div>

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
        
        {/* 📦 PROPERTY TYPES SECTION */}
        <div style={{ marginBottom: "50px" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "16px", color: "#0f172a" }}>Browse by property type</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {propertyTypes.map((type) => (
              <div 
                key={type.name} 
                style={{ cursor: "pointer", transition: "transform 0.2s" }} 
                onClick={() => handlePropertyClick(type)}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ height: "160px", borderRadius: "12px", overflow: "hidden", marginBottom: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid #e2e8f0" }}>
                  <img src={type.image} alt={type.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h4 style={{ margin: "0", fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>
                  {type.name} {!type.isLive && <span style={{ fontSize: "11px", fontWeight: "500", color: "#ef4444", background: "#fef2f2", padding: "2px 6px", borderRadius: "4px", marginLeft: "4px" }}>Soon</span>}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* 🏔️ TRENDING DESTINATIONS SECTION */}
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
                  background: "#fff",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
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

      {/* POPUP MODAL */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "200" }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", maxWidth: "400px", width: "90%", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize: "50px", marginBottom: "10px" }}>🏔️🚀</div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 10px 0" }}>{modalFeature} Feature Coming Soon!</h3>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", margin: "0 0 20px 0" }}>
              We are currently onboarding top-tier premium verified {modalFeature.toLowerCase()} in Uttarakhand to give you the best experience. Stay tuned!
            </p>
            <button 
              onClick={() => setShowModal(false)}
              style={{ width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
            >
              Great, Got it!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}