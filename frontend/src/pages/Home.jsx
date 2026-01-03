import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* ===== HERO ===== */}
      <section className="hero-booking">
        <div className="hero-content">
          <h1>Find your perfect stay 🏔️</h1>
          <p>Hotels, homestays & retreats across Uttarakhand</p>

          <div className="hero-search">
            <input placeholder="Enter destination (Mussoorie)" />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="section">
        <h2>Top destinations</h2>

        <div className="grid">
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, image]) => (
            <Link
              key={name}
              to={`/destination/${name.toLowerCase()}`}
              className="card"
            >
              <img src={image} alt={name} />
              <div className="card-title">{name}</div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
