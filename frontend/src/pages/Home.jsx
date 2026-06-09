import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const uttarakhandDestinations = [
    { name: "Char Dham", stays: "350 properties", image: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=500" },
    { name: "Haridwar", stays: "1,041 properties", image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=500" }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find your next Himalayan stay</h1>
        <p>Explore premium hotels, cozy homestays, and unique experiences.</p>
      </div>

      <div className="home-wrap">
        <section className="home-section">
          <h2>Explore Uttarakhand</h2>
          <div className="home-grid">
            {uttarakhandDestinations.map((d) => (
              <div key={d.name} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={d.image} alt={d.name} />
                <div className="card-body"><h3>{d.name}</h3><p>{d.stays}</p></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}