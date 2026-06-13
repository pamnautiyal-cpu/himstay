import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");

  // ✅ लोकल इमेजेस पाथ के साथ अपडेटेड लिस्ट
  const uttarakhandExperiences = [
    { n: "Kedarnath", img: "/images/chardham/kedarnath.jpg" },
    { n: "Badrinath", img: "/images/chardham/badrinath.jpg" },
    { n: "Gangotri", img: "/images/chardham/gangotri.jpg" },
    { n: "Yamunotri", img: "/images/chardham/yamunotri.jpg" },
    { n: "Haridwar", img: "/images/destinations/haridwar.jpg" },
    { n: "Rishikesh", img: "/images/destinations/rishikesh.jpg" }
  ];

  const featuredHomes = [
    { name: "VANYA LUXURY RESORT", location: "Bangalore", price: "0,000", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Sliceinn Sylva", location: "Bangalore", price: "1,588", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }
  ];

  const fallbackImg = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400";
  const cities = ["All", "Rishikesh", "Uttarkashi", "Haridwar", "Badrinath"];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>See the world for less</h1>
        <button className="search-btn" onClick={() => navigate("/hotels")}>SEARCH STAYS</button>
      </section>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "30px 0", flexWrap: "wrap" }}>
        {cities.map(city => (
          <button 
            key={city} 
            onClick={() => setSelectedCity(city)}
            style={{ 
              padding: "8px 16px", borderRadius: "20px", cursor: "pointer",
              border: selectedCity === city ? "2px solid #006ce4" : "1px solid #ccc",
              background: selectedCity === city ? "#eef6ff" : "#fff"
            }}>
            {city}
          </button>
        ))}
      </div>

      <div className="home-content">
        <section className="section">
          <h2>Uttarakhand Tourism</h2>
          <div className="horizontal-scroll-container" style={{ display: "flex", gap: "20px", overflowX: "auto", padding: "10px" }}>
            {uttarakhandExperiences.map((ex, i) => (
              <div key={i} className="scroll-item" onClick={() => navigate("/hotels")} style={{ cursor: "pointer", flexShrink: 0 }}>
                <img 
                  src={ex.img} 
                  alt={ex.n} 
                  style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "8px", background: "#eee" }} 
                  onError={(e) => e.target.src = fallbackImg} 
                />
                <h3>{ex.n}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Featured homes</h2>
          <div className="home-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {featuredHomes.map((h, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")} style={{ cursor: "pointer", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                <img 
                  src={h.img} 
                  alt={h.name} 
                  style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} 
                  onError={(e) => e.target.src = fallbackImg} 
                />
                <div className="card-info" style={{padding: "10px"}}>
                  <h3>{h.name}</h3>
                  <p>INR {h.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}