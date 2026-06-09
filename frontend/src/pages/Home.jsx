import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const types = [{n:"Hotels"}, {n:"Apartments"}, {n:"Resorts"}, {n:"Villas"}];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find your next stay</h1>
        <div className="search-container">
          <input type="text" placeholder="Where are you going?" />
          <button onClick={() => navigate("/hotels")}>Search</button>
        </div>
      </div>

      <div className="home-wrap">
        <section className="home-section">
          <h2>Browse by property type</h2>
          <div className="home-grid">
            {types.map((t, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" alt={t.n} />
                <div className="card-body"><h3>{t.n}</h3></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}