import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Data Arrays
  const uttarakhandExperiences = [
    { n: "Trekking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400" },
    { n: "Adventure", img: "https://images.unsplash.com/photo-1527203561188-dae1bc1a4176?w=400" },
    { n: "Yoga & Wellness", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400" },
    { n: "Char Dham Yatra", img: "https://images.unsplash.com/photo-1544735716-39742463e264?w=400" }
  ];

  const propertyTypes = [
    { n: "Hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { n: "Apartments", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" },
    { n: "Resorts", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { n: "Villas", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const topDestinations = [
    { n: "Bangalore", count: "5,372", img: "https://images.unsplash.com/photo-1596176530529-781635457887?w=400" },
    { n: "Mumbai", count: "4,177", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400" },
    { n: "New Delhi", count: "12,786", img: "https://images.unsplash.com/photo-1587474260584-916f1c71329c?w=400" },
    { n: "Hyderabad", count: "2,735", img: "https://images.unsplash.com/photo-1582468357030-4221a2099032?w=400" }
  ];

  const featuredHomes = [
    { name: "VANYA LUXURY RESORT", location: "Bangalore", price: "5,000", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Sliceinn Sylva", location: "Bangalore", price: "1,588", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero-search-box">
        <h1>See the world for less</h1>
        <div className="search-container">
           <input type="text" placeholder="Where are you going?" />
           <button onClick={() => navigate("/hotels")}>SEARCH</button>
        </div>
        <div className="search-options" style={{ marginTop: "15px", color: "white", fontSize: "14px" }}>
          <label style={{ margin: "0 10px" }}><input type="checkbox" /> Entire homes</label>
          <label style={{ margin: "0 10px" }}><input type="checkbox" /> For work</label>
        </div>
      </section>

      <div className="home-wrap">
        {/* 2. Recent Searches */}
        <section className="home-section">
          <h2>Your recent searches</h2>
          <div className="home-grid" style={{ gridTemplateColumns: "repeat(2, 1fr) !important" }}>
            <div className="home-card" style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <p><strong>Dehradun ↔ Mumbai</strong></p>
            </div>
            <div className="home-card" style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <p><strong>Dehradun ↔ Bangalore</strong></p>
            </div>
          </div>
        </section>

        {/* 3. Uttarakhand Tourism */}
        <section className="home-section">
          <h2>Uttarakhand Tourism: Explore & Experience</h2>
          <div className="home-grid">
            {uttarakhandExperiences.map((ex, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={ex.img} alt={ex.n} />
                <h3>{ex.n}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Featured Homes */}
        <section className="home-section">
          <h2>Featured homes</h2>
          <div className="home-grid">
            {featuredHomes.map((h, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={h.img} alt={h.name} />
                <h3>{h.name}</h3>
                <p>INR {h.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Top Destinations */}
        <section className="home-section">
          <h2>Top destinations in India</h2>
          <div className="home-grid">
            {topDestinations.map((d, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={d.img} alt={d.n} />
                <h3>{d.n}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Property Type */}
        <section className="home-section">
          <h2>Browse by property type</h2>
          <div className="home-grid">
            {propertyTypes.map((t, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={t.img} alt={t.n} />
                <h3>{t.n}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}