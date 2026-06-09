import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // तुम्हारे चारों पॉपुलर डेस्टिनेशंस
  const destinations = [
    { name: "Mussoorie", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { name: "Nainital", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    { name: "Auli", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    { name: "Rishikesh", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" }
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
    <div style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      {/* HERO SECTION BACKGROUND */}
      <div style={{ height: "60vh", background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470') center/cover no-repeat", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", padding: "20px" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "10px", textAlign: "center" }}>Discover the Himalayas</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px", textAlign: "center" }}>Hotels, Homestays & Adventure Experiences</p>
        
        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "600px", background: "#fff", padding: "8px", borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
          <input 
            type="text" 
            placeholder="Where are you going?" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            style={{ flex: 1, padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "16px", outline: "none", color: "#000" }} 
          />
          <button type="submit" style={{ padding: "12px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Search</button>
        </form>
      </div>

      {/* POPULAR DESTINATIONS SECTION */}
      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px", color: "#1e293b" }}>Popular Destinations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {destinations.map((item) => (
            <div 
              key={item.name} 
              onClick={() => navigate(`/hotels?city=${encodeURIComponent(item.name)}`)}
              style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ height: "160px" }}>
                <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "16px" }}>
                <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1e293b" }}>{item.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}