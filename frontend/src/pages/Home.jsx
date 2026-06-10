import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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
    { name: "VANYA LUXURY RESORT", location: "Bangalore", price: "5,000", rating: "8.2", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Sliceinn Sylva", location: "Bangalore", price: "1,588", rating: "8.3", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }
  ];

  return (
    <div>
      {/* Search Section */}
      <section className="hero-search-box">
        <h1>See the world for less</h1>
        <div className="search-container">
           <input type="text" placeholder="Where are you going?" />
           <button onClick={() => navigate("/hotels")}>SEARCH</button>
        </div>
        {/* NEW: Checkboxes */}
        <div className="search-options" style={{ marginTop: "15px", color: "white", fontSize: "14px" }}>
          <label style={{ margin: "0 10px" }}><input type="checkbox" /> I'm looking for an entire home or apartment</label>
          <label style={{ margin: "0 10px" }}><input type="checkbox" /> I'm traveling for work</label>
          <label style={{ margin: "0 10px" }}><input type="checkbox" /> Add flights to my search</label>
        </div>
      </section>

      <div className="home-wrap">
        {/* NEW: Recent Searches */}
        <section className="home-section">
          <h2>Your recent searches</h2>
          <div className="home-grid" style={{ gridTemplateColumns: "repeat(2, 1fr) !important" }}>
            <div className="home-card" style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <p><strong>Dehradun (DED) ↔ Mumbai (All airports)</strong></p>
              <p style={{fontSize: "12px", color: "#666"}}>Sat, Jul 11-Sat, Jul 18 • 1 traveler</p>
            </div>
            <div className="home-card" style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <p><strong>Dehradun (DED) ↔ Bangalore (BLR)</strong></p>
              <p style={{fontSize: "12px", color: "#666"}}>Sat, Jul 11-Sat, Jul 18 • 1 traveler</p>
            </div>
          </div>
        </section>

        {/* Existing Sections */}
        <section className="home-section">
          <h2>Top destinations in India</h2>
          <div className="home-grid">
            {topDestinations.map((d, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={d.img} alt={d.n} />
                <h3>{d.n}</h3>
                <p style={{fontSize: "12px", color: "#666"}}>{d.count} accommodations</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2>Featured homes recommended for you</h2>
          <div className="home-grid">
            {featuredHomes.map((h, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={h.img} alt={h.name} />
                <div style={{paddingTop: "10px"}}>
                  <h3 style={{fontSize: "14px"}}>{h.name}</h3>
                  <p style={{fontSize: "12px", color: "#666"}}>{h.location}</p>
                  <p style={{fontWeight: "bold", fontSize: "14px"}}>INR {h.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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