import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const section = {
    maxWidth: 1200,
    margin: "70px auto",
    padding: "0 20px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
    marginTop: 28,
  };

  const card = {
    background: "#ffffff",
    borderRadius: 18,
    boxShadow: "0 18px 40px rgba(2,6,23,.12)",
    textDecoration: "none",
    color: "#020617",
    fontWeight: 700,
    textAlign: "center",
    overflow: "hidden",
    transition: "transform .3s ease, box-shadow .3s ease",
  };

  const img = {
    width: "100%",
    height: 180,
    objectFit: "cover",
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* ===== HERO (CLEAN – NO IMAGE) ===== */}
      <section className="hero-clean">
        <div className="hero-clean-inner">
          <h1>
            Discover stays, treks <br /> & spiritual journeys
          </h1>

          <p>
            Handpicked hotels, Char Dham, treks and wellness retreats
            across the Himalayas.
          </p>

          <div className="hero-actions">
            <Link to="/hotels" className="btn-primary">Explore Hotels</Link>
            <Link to="/contact" className="btn-secondary">Talk to Expert</Link>
          </div>
        </div>
      </section>

      {/* ===== TOP DESTINATIONS ===== */}
      <section style={section}>
        <h2>Top destinations in Uttarakhand</h2>
        <div style={grid}>
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, image]) => (
            <Link key={name} to={`/destination/${name.toLowerCase()}`} style={card} className="home-card">
              <img src={image} alt={name} style={img} />
              <div className="card-title">{name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CHAR DHAM ===== */}
      <section style={section}>
        <h2>Char Dham Yatra Destinations</h2>
        <div style={grid}>
          {[
            ["Kedarnath", "/images/chardham/kedarnath.jpg"],
            ["Badrinath", "/images/chardham/badrinath.jpg"],
            ["Gangotri", "/images/chardham/gangotri.jpg"],
            ["Yamunotri", "/images/chardham/yamunotri.jpg"],
            ["Hemkund Sahib", "/images/chardham/hemkund.jpg"],
          ].map(([name, image]) => (
            <Link key={name} to={`/chardham/${name.toLowerCase()}`} style={card} className="home-card">
              <img src={image} alt={name} style={img} />
              <div className="card-title">{name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TREKS ===== */}
      <section style={section}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={grid}>
          {[
            ["Kedarkantha Trek", "/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "/images/treks/valley-of-flowers.jpg"],
            ["Roopkund Trek", "/images/treks/roopkund.jpg"],
          ].map(([name, image]) => (
            <Link key={name} to="/treks" style={card} className="home-card">
              <img src={image} alt={name} style={img} />
              <div className="card-title">{name}</div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
