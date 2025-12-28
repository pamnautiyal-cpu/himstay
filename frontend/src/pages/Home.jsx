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
    gap: 20,
    marginTop: 24,
  };

  const card = {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 20px 45px rgba(15,23,42,.15)",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: 700,
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  };

  const img = {
    width: "100%",
    height: 170,
    objectFit: "cover",
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: 20 }}>
        <h1 style={{ fontSize: 44, fontWeight: 900 }}>Find your next stay</h1>
        <p style={{ color: "#475569" }}>
          Hotels, treks & wellness across Uttarakhand
        </p>
      </div>

      {/* TOP DESTINATIONS */}
      <section style={section}>
        <h2>Top destinations in Uttarakhand</h2>
        <div style={grid}>
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, image]) => (
            <div key={name} style={card} className="card">
              <div className="card-img-wrap">
                <img src={image} alt={name} style={img} className="zoom-img" />
                <div className="card-overlay">Explore →</div>
              </div>
              <div style={{ padding: 16 }}>{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAR DHAM */}
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
            <div key={name} style={card} className="card">
              <div className="card-img-wrap">
                <img src={image} alt={name} style={img} className="zoom-img" />
                <div className="card-overlay">View →</div>
              </div>
              <div style={{ padding: 16 }}>{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TREKKING */}
      <section style={section}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={grid}>
          {[
            ["Kedarkantha Trek", "/treks/kedarkantha", "/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "/treks/har-ki-dun", "/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "/treks/nag-tibba", "/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "/treks/valley-of-flowers", "/images/treks/valley-of-flowers.jpg"],
            ["Roopkund Trek", "/treks/roopkund", "/images/treks/roopkund.jpg"],
          ].map(([title, link, image]) => (
            <Link to={link} key={title} style={card} className="card">
              <div className="card-img-wrap">
                <img src={image} alt={title} style={img} className="zoom-img" />
                <div className="card-overlay">View trek →</div>
              </div>
              <div style={{ padding: 16 }}>{title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* YOGA & NATURAL THERAPY */}
      <section style={section}>
        <h2>Yoga & Natural Therapy</h2>
        <div style={grid}>
          {[
            ["Himalayan Yoga Retreat", "/images/yoga/yoga-retreat.jpg"],
            ["Meditation & Pranayama", "/images/yoga/meditation.jpg"],
            ["Ayurvedic Therapy", "/images/yoga/ayurveda.jpg"],
            ["Panchakarma Detox", "/images/yoga/panchakarma.jpg"],
          ].map(([name, image]) => (
            <div key={name} style={card} className="card">
              <div className="card-img-wrap">
                <img src={image} alt={name} style={img} className="zoom-img" />
                <div className="card-overlay">Discover →</div>
              </div>
              <div style={{ padding: 16 }}>{name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
