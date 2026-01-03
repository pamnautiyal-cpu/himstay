import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-wrap">

      {/* HERO */}
      <section className="hero-new">
        <div className="hero-inner">
          <span className="hero-badge">Uttarakhand • Himalayas</span>

          <h1>
            Discover stays,<br />
            treks & spiritual journeys
          </h1>

          <p>
            Handpicked hotels, Char Dham, treks and wellness retreats
            across the Himalayas.
          </p>

          <div className="hero-cta">
            <Link to="/hotels" className="btn-main">Explore Hotels</Link>
            <Link to="/contact" className="btn-outline">Talk to Expert</Link>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="block">
        <h2>Top destinations</h2>
        <div className="card-grid">
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, img]) => (
            <Link key={name} to="#" className="card-new">
              <img src={img} alt={name} />
              <div className="card-text">
                <h3>{name}</h3>
                <span>Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
