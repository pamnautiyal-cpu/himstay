import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // स्क्रीनशॉट के अनुसार ट्रेंडिंग डेस्टिनेशंस
  const trendingDestinations = [
    { name: "Mussoorie", stays: "1,240 properties", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", flag: "🏔️" },
    { name: "Nainital", stays: "967 properties", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", flag: "🛶" },
    { name: "Auli", stays: "480 properties", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", flag: "⛷️" },
    { name: "Rishikesh", stays: "2,150 properties", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", flag: "🧘" }
  ];

  // ब्राउज़ बाय प्रॉपर्टी टाइप
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
    <div style={{ fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif", background: "#fff", minHeight: "100vh", color: "#1a1a1a" }}>
      
      {/* 🟦 1. DEEP BLUE HERO BANNER */}
      <div style={{ background: "#003580", padding: "60px 20px 80px", color: "#fff", position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "700", margin: "0 0 10px 0", letterSpacing: "-1px" }}>
            Find your next stay
          </h1>
          <p style={{ fontSize: "1.5rem", margin: "0 0 30px 0", fontWeight: "300", color: "#f2f2f2" }}>
            Search deals on hotels, homes, and much more...
          </p>
        </div>
      </div>

      {/* 🟨 2. FLOATING YELLOW SEARCH BAR */}
      <div style={{ maxWidth: "1100px", margin: "-30px auto 0", padding: "0 20px", position: "relative", zIndex: "10" }}>
        <form onSubmit={handleSearch} style={{ 
          display: "flex", 
          background: "#ffb700", 
          padding: "4px", 
          borderRadius: "8px", 
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          gap: "4px",
          alignItems: "stretch"
        }}>
          {/* Input Block */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", borderRadius: "6px", padding: "0 16px" }}>
            <span style={{ marginRight: "10px", fontSize: "18px", color: "#6b7280" }}>🛏️</span>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ width: "100%", padding: "16px 0", border: "none", fontSize: "15px", outline: "none", color: "#1a1a1a", fontWeight: "500" }} 
            />
          </div>
          
          {/* Date Placeholder Box (Screen Look) */}
          <div style={{ width: "240px", display: "flex", alignItems: "center", background: "#fff", borderRadius: "6px", padding: "0 16px", cursor: "pointer", color: "#1a1a1a", fontSize: "14px", fontWeight: "500" }}>
            <span style={{ marginRight: "10px" }}>📅</span> June 09 — June 15
          </div>

          {/* Search Button */}
          <button type="submit" style={{ 
            padding: "0 32px", 
            background: "#006ce4", 
            color: "#fff", 
            border: "none", 
            borderRadius: "6px", 
            fontSize: "16px", 
            fontWeight: "600", 
            cursor: "pointer",
            transition: "background 0.1s"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#0053b3"}
          onMouseOut={(e) => e.currentTarget.style.background = "#006ce4"}
          >
            Search
          </button>
        </form>
      </div>

      {/* 📄 MAIN CONTENT AREA */}
      <div style={{ maxWidth: "1100px", margin: "50px auto", padding: "0 20px" }}>
        
        {/* 📦 3. BROWSE BY PROPERTY TYPE */}
        <div style={{ marginBottom: "50px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#1a1a1a" }}>Browse by property type</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {propertyTypes.map((type) => (
              <div key={type.name} style={{ cursor: "pointer" }} onClick={() => navigate("/hotels")}>
                <div style={{ height: "160px", borderRadius: "8px", overflow: "hidden", marginBottom: "8px" }}>
                  <img src={type.image} alt={type.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h4 style={{ margin: "0", fontSize: "16px", fontWeight: "700", color: "#1a1a1a" }}>{type.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* 🏔️ 4. TRENDING DESTINATIONS TILES */}
        <div style={{ marginBottom: "50px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px 0" }}>Trending destinations</h3>
          <p style={{ color: "#595959", margin: "0 0 20px 0", fontSize: "14px" }}>Most popular choices for travelers from India</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {trendingDestinations.map((city) => (
              <div 
                key={city.name} 
                onClick={() => navigate(`/hotels?city=${encodeURIComponent(city.name)}`)}
                style={{ 
                  borderRadius: "8px", 
                  overflow: "hidden", 
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)", 
                  border: "1px solid #e6e6e6", 
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                {/* Image Grid Layer */}
                <div style={{ height: "180px", position: "relative" }}>
                  <img src={city.image} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {/* Floating Title Inside Image Style */}
                  <div style={{ 
                    position: "absolute", 
                    top: "16px", 
                    left: "16px", 
                    color: "#fff", 
                    fontSize: "22px", 
                    fontWeight: "700", 
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    {city.name} {city.flag}
                  </div>
                </div>
                
                {/* Detail Box */}
                <div style={{ padding: "12px 16px", background: "#fff" }}>
                  <span style={{ fontSize: "13px", color: "#595959", fontWeight: "500" }}>{city.stays}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}