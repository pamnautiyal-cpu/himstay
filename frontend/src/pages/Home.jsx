import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const propertyTypes = [
    { name: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Apartments", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
    { name: "Resorts", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400" },
    { name: "Villas", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const destinations = [
    { name: "Char Dham", image: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=500" },
    { name: "Haridwar", image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=500" },
    { name: "Dehradun", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500" },
    { name: "Mussoorie", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500" }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find your next Himalayan stay</h1>
        <p>Explore premium hotels, cozy homestays, and unique experiences.</p>
        <div className="search-bar">
          <input type="text" placeholder="Where are you going?" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={() => navigate("/hotels")}>Search</button>
        </div>
      </div>

      <div className="home-wrap">
        <section className="home-section">
          <h2>Browse by property type</h2>
          <div className="home-grid">
            {propertyTypes.map((t, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={t.image} alt={t.name} />
                <h3>{t.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2>Explore Uttarakhand</h2>
          <div className="home-grid">
            {destinations.map((d, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={d.image} alt={d.name} />
                <h3>{d.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}