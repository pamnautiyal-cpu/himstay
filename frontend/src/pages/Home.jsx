import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // 1. Data Definitions
  const propertyTypes = [{n:"Hotels"}, {n:"Apartments"}, {n:"Resorts"}, {n:"Villas"}];
  const locations = [{n:"Char Dham"}, {n:"Haridwar"}, {n:"Dehradun"}, {n:"Mussoorie"}];
  const experiences = [{n:"Trekking"}, {n:"Yoga & Meditation"}, {n:"Hillstations"}, {n:"Spa & Wellness"}];

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Find your next Himalayan stay</h1>
        <p>Explore premium hotels, cozy homestays, and unique experiences.</p>
        <div className="search-bar">
          <input type="text" placeholder="Where are you going?" />
          <button onClick={() => navigate("/hotels")}>Search</button>
        </div>
      </div>

      {/* Main Content Sections (Wrapped in home-wrap for centering) */}
      <div className="home-wrap">
        
        {/* Browse by Property */}
        <section className="home-section">
          <h2>Browse by property type</h2>
          <div className="home-grid">
            {propertyTypes.map((t, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" alt={t.n} />
                <h3>{t.n}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Uttarakhand */}
        <section className="home-section">
          <h2>Explore Uttarakhand</h2>
          <div className="home-grid">
            {locations.map((u, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src="https://images.unsplash.com/photo-1626621422537-37b2319addef?w=500" alt={u.n} />
                <h3>{u.n}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Experiences */}
        <section className="home-section">
          <h2>Trending Experiences</h2>
          <div className="home-grid">
            {experiences.map((e, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500" alt={e.n} />
                <h3>{e.n}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}