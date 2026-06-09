import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalFeature, setModalFeature] = useState("");

  // 🏔️ उत्तराखंड के 6 मुख्य डेस्टिनेशंस (अब बैकग्राउंड इमेज और डार्क ओवरले कोडिंग के साथ)
  const uttarakhandDestinations = [
    { name: "Char Dham", stays: "350 properties", isLive: true, targetCity: "Uttarkashi", image: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=500&q=80" },
    { name: "Haridwar", stays: "1,041 properties", isLive: false, image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=500&q=80" },
    { name: "Dehradun", stays: "960 properties", isLive: false, image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&q=80" },
    { name: "Mussoorie", stays: "1,240 properties", isLive: false, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80" },
    { name: "Nainital", stays: "967 properties", isLive: false, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80" },
    { name: "Rishikesh", stays: "2,150 properties", isLive: false, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&q=80" }
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

  const handleDestinationClick = (dest) => {
    if (dest.isLive) {
      navigate(`/hotels?city=${encodeURIComponent(dest.targetCity)}`);
    } else {
      setModalFeature(dest.name);
      setShowModal(true);
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
    <div style={{ fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif", background: "#fff", minHeight: "100vh", color: "#1a1a1a", position: "relative" }}>
      
      {/* 🌌 1. HERO BANNER */}
      <div style={{ 
        background: "linear-gradient(180deg, #1c2541 0%, #0b132b 100%)", 
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

      {/* 🟨 2. FLOATING SEARCH BAR */}
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
              placeholder="Where are you going? (e.g. Uttarkashi, Mussoorie)" 
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

      {/* 📄 MAIN CONTENT AREA */}
      <div style={{ maxWidth: "1100px", margin: "50px auto", padding: "0 20px" }}>
        
        {/* 📦 PROPERTY TYPES */}
        <div style={{ marginBottom: "50px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#1a1a1a" }}>Browse by property type</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {propertyTypes.map((type) => (
              <div key={type.name} style={{ cursor: "pointer" }} onClick={() => handlePropertyClick(type)}>
                <div style={{ height: "160px", borderRadius: "8px", overflow: "hidden", marginBottom: "8px", border: "1px solid #e6e6e6", position: "relative" }}>
                  <img src={type.image} alt={type.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {!type.isLive && (
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontWeight: "bold", fontSize: "14px" }}>
                      Soon
                    </div>
                  )}
                </div>
                <h4 style={{ margin: "0", fontSize: "16px", fontWeight: "700", color: "#1a1a1a" }}>{type.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* 🏔️ EXPLORE UTTARAKHAND (BACKGROUND IMAGE + BOLD TEXT TILES LIKE BOOKING.COM) */}
        <div style={{ marginBottom: "60px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px 0" }}>Explore Uttarakhand</h3>
          <p style={{ color: "#595959", margin: "0 0 24px 0", fontSize: "14px" }}>These popular destinations have a lot to offer</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {uttarakhandDestinations.map((dest) => (
              <div 
                key={dest.name} 
                onClick={() => handleDestinationClick(dest)}
                style={{ 
                  height: "160px",
                  borderRadius: "12px", 
                  // 🖼️ इमेज को सीधे कार्ड के बैकग्राउंड में लगाया गया है
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.7)), url(${dest.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end", // सारे टेक्स्ट को नीचे अलाइन करने के लिए
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
                }}
              >
                {/* अगर लाइव नहीं है तो सुंदर डार्क ब्लर 'Soon' बैनर ओवरले */}
                {!dest.isLive && (
                  <div style={{ 
                    position: "absolute", 
                    top: "12px", 
                    right: "12px", 
                    background: "rgba(15, 23, 42, 0.75)", 
                    color: "#fff", 
                    fontSize: "11px", 
                    fontWeight: "700", 
                    padding: "3px 8px", 
                    borderRadius: "4px" 
                  }}>
                    ⏳ Soon
                  </div>
                )}

                {dest.isLive && (
                  <div style={{ 
                    position: "absolute", 
                    top: "12px", 
                    right: "12px", 
                    background: "#2563eb", 
                    color: "#fff", 
                    fontSize: "11px", 
                    fontWeight: "800", 
                    padding: "3px 8px", 
                    borderRadius: "4px" 
                  }}>
                    LIVE ⚡
                  </div>
                )}

                {/* शहर और प्रॉपर्टी काउंट - एकदम हैवी बोल्ड और वाइट टेक्स्ट */}
                <h4 style={{ margin: "0 0 2px 0", fontSize: "22px", fontWeight: "800", color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                  {dest.name}
                </h4>
                <span style={{ fontSize: "14px", color: "#e2e8f0", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                  {dest.stays}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 🎁 TRAVEL MORE, SPEND LESS */}
        <div style={{ 
          border: "1px solid #e6e6e6", 
          borderRadius: "8px", 
          padding: "24px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: "700", color: "#1a1a1a" }}>Sign in, save money</h3>
            <p style={{ margin: "0 0 20px 0", color: "#595959", fontSize: "14px" }}>Save 10% or more at participating properties – just look for the blue Genius label</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="button" onClick={() => navigate("/login")} style={{ background: "#006ce4", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>Sign in</button>
              <button type="button" onClick={() => navigate("/signup")} style={{ background: "transparent", color: "#006ce4", border: "none", padding: "10px 14px", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>Register</button>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#eff6ff", padding: "20px", borderRadius: "12px" }}>
            <span style={{ fontSize: "45px" }}>🎁</span>
            <div style={{ marginLeft: "10px", background: "#006ce4", color: "#fff", padding: "4px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>Genius</div>
          </div>
        </div>

      </div>

      {/* POPUP MODAL */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "200" }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", maxWidth: "400px", width: "90%", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize: "50px", marginBottom: "10px" }}>🏔️🚀</div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 10px 0" }}>{modalFeature} Stays Coming Soon!</h3>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", margin: "0 0 20px 0" }}>
              We are currently integrating top verified premium properties in {modalFeature}. Right now, our verified properties in <b>Char Dham (Uttarkashi / Matli)</b> are fully functional and ready to book!
            </p>
            <button type="button" onClick={() => setShowModal(false)} style={{ width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}>
              Great, Take Me to Active Stays
            </button>
          </div>
        </div>
      )}

    </div>
  );
}