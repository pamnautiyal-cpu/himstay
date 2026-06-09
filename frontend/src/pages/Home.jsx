import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const properties = [{n:"Taj", l:"Chennai"}, {n:"Radisson", l:"Madurai"}, {n:"Heritage", l:"Madurai"}, {n:"Marari", l:"Alleppey"}];
  const types = [{n:"Hotels"}, {n:"Apartments"}, {n:"Resorts"}, {n:"Villas"}];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find your next stay</h1>
        <p>Search deals on hotels, homes, and much more...</p>
        <div className="search-bar">
          <input type="text" placeholder="Where are you going?" />
          <button>Search</button>
        </div>
      </div>

      <div className="home-wrap">
        <section className="home-section">
          <h2>Stay at our top unique properties</h2>
          <div className="home-grid">
            {properties.map((p, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" alt={p.n} />
                <div className="card-content">
                  <h3>{p.n}</h3>
                  <p>{p.l}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2>Browse by property type</h2>
          <div className="home-grid">
            {types.map((t, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" alt={t.n} />
                <div className="card-content"><h3>{t.n}</h3></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}