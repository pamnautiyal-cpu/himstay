import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Agoda स्टाइल प्रीमियम इमेजेस के साथ डेस्टिनेशंस
  const destinations = [
    { name: "Mussoorie", stays: "120+ Stays", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { name: "Nainital", stays: "85+ Stays", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    { name: "Auli", stays: "40+ Stays", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    { name: "Rishikesh", stays: "150+ Stays", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" }
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
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#f4f6f9", minHeight: "100vh", color: "#2a2a2a" }}>
      
      {/* 🏔️ HERO SECTION (AGODA STYLE LARGE BANNER) */}
      <div style={{ 
        height: "75vh", 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "0 20px",
        position: "relative"
      }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "800", color: "#fff", marginBottom: "12px", textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
          Discover Your Next Himalayan Escape
        </h1>
        <p style={{ fontSize: "1.4rem", color: "#f8fafc", marginBottom: "35px", textAlign: "center", fontWeight: "400", textShadow: "0 2px 5px rgba(0,0,0,0.3)" }}>
          Cozy Homestays, Luxury Resorts & Adventure Experiences
        </p>
        
        {/* 🔍 PREMIUM BOX SEARCH BAR */}
        <form onSubmit={handleSearch} style={{ 
          display: "flex", 
          gap: "0px", 
          width: "100%", 
          maxWidth: "850px", 
          background: "#fff", 
          padding: "10px", 
          borderRadius: "50px", 
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          border: "4px solid rgba(255,255,255,0.2)",
          overflow: "hidden"
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: "20px" }}>
            <span style={{ fontSize: "20px", marginRight: "10px" }}>🔍</span>
            <input 
              type="text" 
              placeholder="Where are you going? Enter destination or property name..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ width: "100%", padding: "14px 10px", border: "none", fontSize: "16px", outline: "none", color: "#334155" }} 
            />
          </div>
          <button type="submit" style={{ 
            padding: "0 40px", 
            background: "#2563eb", 
            color: "#fff", 
            border: "none", 
            borderRadius: "50px", 
            fontSize: "16px", 
            fontWeight: "bold", 
            cursor: "pointer",
            transition: "background 0.2s",
            boxShadow: "0 4px 15px rgba(37,99,235,0.3)"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#1d4ed8"}
          onMouseOut={(e) => e.currentTarget.style.background = "#2563eb"}
          >
            Search
          </button>
        </form>
      </div>

      {/* 🏔️ POPULAR DESTINATIONS (BOOKING.COM STYLE TILES) */}
      <div style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "6px" }}>
          Trending Destinations in Uttarakhand
        </h2>
        <p style={{ color: "#64748b", margin: "0 0 30px 0", fontSize: "16px" }}>
          Most popular choices for travelers from India
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px" }}>
          {destinations.map((item) => (
            <div 
              key={item.name} 
              onClick={() => navigate(`/hotels?city=${encodeURIComponent(item.name)}`)}
              style={{ 
                background: "#fff", 
                borderRadius: "16px", 
                overflow: "hidden", 
                boxShadow: "0 4px 25px rgba(0,0,0,0.05)", 
                border: "1px solid #e2e8f0", 
                cursor: "pointer", 
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" 
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 35px rgba(0,0,0,0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 25px rgba(0,0,0,0.05)";
              }}
            >
              {/* IMAGE WRAPPER */}
              <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "15px", left: "15px", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", backdropFilter: "blur(4px)" }}>
                  {item.stays}
                </div>
              </div>
              
              {/* CONTENT WRAPPER */}
              <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>{item.name}</h4>
                  <span style={{ fontSize: "13px", color: "#2563eb", fontWeight: "600" }}>Explore stays →</span>
                </div>
                <div style={{ width: "35px", height: "35px", background: "#eff6ff", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: "#2563eb", fontWeight: "bold" }}>
                  ➔
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}