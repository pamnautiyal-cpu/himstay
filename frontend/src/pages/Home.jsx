import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ background: "#020617", minHeight: "100vh" }}>

      {/* ================= HERO ================= */}
      <section className="hero-modern">
        <div className="hero-overlay" />

        <div className="hero-inner">
          <h1>
            Discover stays <br />
            in the <span>Himalayas</span>
          </h1>

          <p>
            Handpicked hotels, homestays, treks & wellness retreats
            across Uttarakhand
          </p>

          <div className="hero-actions">
            <Link to="/hotels" className="btn-primary">
              Explore Stays
            </Link>
            <Link to="/contact" className="btn-secondary">
              Plan with Experts
            </Link>
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="cards-section">
        <h2 className="section-title">Top Destinations</h2>

        <div className="cards-grid">
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, image]) => (
            <Link
              key={name}
              to={`/destination/${name.toLowerCase()}`}
              className="image-card"
            >
              <img src={image} alt={name} />
              <div className="card-gradient" />
              <div className="card-title">{name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= TREKS ================= */}
      <section className="cards-section">
        <h2 className="section-title">Popular Treks</h2>

        <div className="cards-grid">
          {[
            ["Kedarkantha Trek", "/treks/kedarkantha", "/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "/treks/har-ki-dun", "/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "/treks/nag-tibba", "/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "/treks/valley-of-flowers", "/images/treks/valley-of-flowers.jpg"],
          ].map(([title, link, image]) => (
            <Link to={link} key={title} className="image-card">
              <img src={image} alt={title} />
              <div className="card-gradient" />
              <div className="card-title">{title}</div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
