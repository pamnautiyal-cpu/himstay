import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const propertyTypes = [
    { name: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Apartments", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
    { name: "Resorts", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400" },
    { name: "Villas", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find your next Himalayan stay</h1>
        <p>Explore premium hotels, cozy homestays, and unique experiences.</p>
      </div>

      <div className="home-wrap">
        <h2>Browse by property type</h2>
        <div className="home-grid">
          {propertyTypes.map((item, i) => (
            <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}