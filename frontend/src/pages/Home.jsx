import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const uttarakhandExperiences = [
    { n: "Kedarnath", img: "https://images.unsplash.com/photo-1590523278191-9951da64da60?w=400" },
    { n: "Badrinath", img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400" },
    { n: "Gangotri", img: "https://images.unsplash.com/photo-1544735716-39742463e264?w=400" },
    { n: "Yamunotri", img: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=400" },
    { n: "Trekking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400" },
    { n: "Adventure", img: "https://images.unsplash.com/photo-1527203561188-dae1bc1a4176?w=400" }
  ];

  const featuredHomes = [
    { name: "VANYA LUXURY RESORT", location: "Bangalore", price: "5,000", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Sliceinn Sylva", location: "Bangalore", price: "1,588", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }
  ];

  const topDestinations = [
    { n: "Bangalore", count: "5,372", img: "https://images.unsplash.com/photo-1596176530529-781635457887?w=400" },
    { n: "Mumbai", count: "4,177", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400" },
    { n: "New Delhi", count: "12,786", img: "https://images.unsplash.com/photo-1587474260584-916f1c71329c?w=400" },
    { n: "Hyderabad", count: "2,735", img: "https://images.unsplash.com/photo-1582468357030-4221a2099032?w=400" }
  ];

  const propertyTypes = [
    { n: "Hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { n: "Apartments", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" },
    { n: "Resorts", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { n: "Villas", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero-search-box">
        <h1>See the world for less</h1>
        <button onClick={() => navigate("/hotels")}>SEARCH</button>
      </section>

      <div className="home-wrap">
        {/* 1. SLIDER SECTION (Uttarakhand) */}
        <section className="home-section">
          <h2>Uttarakhand Tourism: Explore & Experience</h2>
          <div className="horizontal-scroll-container">
            {uttarakhandExperiences.map((ex, i) => (
              <div key={i} className="scroll-item" onClick={() => navigate("/hotels")}>
                <img src={ex.img} alt={ex.n} />
                <h3>{ex.n}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 2. GRID SECTIONS (Purane cards safe hain) */}
        <section className="home-section">
          <h2>Featured homes</h2>
          <div className="home-grid">
            {featuredHomes.map((h, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={h.img} /> <h3>{h.name}</h3> <p>INR {h.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2>Top destinations in India</h2>
          <div className="home-grid">
            {topDestinations.map((d, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={d.img} /> <h3>{d.n}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}