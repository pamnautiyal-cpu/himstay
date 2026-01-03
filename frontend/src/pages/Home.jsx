import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const section = {
    maxWidth: 1200,
    margin: "40px auto",
    padding: "0 16px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 20,
  };

  const card = {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    textDecoration: "none",
    color: "#020617",
    boxShadow: "0 10px 25px rgba(0,0,0,.12)",
  };

  const img = {
    width: "100%",
    height: 150,
    objectFit: "cover",
    display: "block",
  };

  const body = {
    padding: 14,
  };

  const title = {
    fontWeight: 700,
    marginBottom: 6,
  };

  const desc = {
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.4,
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>

      {/* HEADING */}
      <div style={{ maxWidth: 1200, margin: "40px auto 20px", padding: "0 16px" }}>
        <h1>Find your perfect stay 🏔️</h1>
        <p style={{ color: "#475569" }}>
          Hotels, homestays & retreats across Uttarakhand
        </p>
      </div>

      {/* TOP DESTINATIONS */}
      <section style={section}>
        <h2 style={{ marginBottom: 16 }}>Top destinations</h2>
        <div style={grid}>
          {[
            ["Mussoorie", "Queen of Hills with cable car views", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "Famous lake town in Kumaon", "/images/destinations/nainital.jpg"],
            ["Dehradun", "Gateway to Mussoorie & Himalayas", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "Commercial hub of Kumaon region", "/images/destinations/haldwani.jpg"],
          ].map(([name, text, image]) => (
            <Link key={name} to={`/destination/${name.toLowerCase()}`} style={card}>
              <img src={image} alt={name} style={img} />
              <div style={body}>
                <div style={title}>{name}</div>
                <div style={desc}>{text}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ CHAR DHAM – FIXED & VISIBLE */}
      <section style={section}>
        <h2 style={{ marginBottom: 16 }}>Char Dham Yatra</h2>
        <div style={grid}>
          {[
            ["Kedarnath", "Sacred Jyotirlinga of Lord Shiva", "/images/chardham/kedarnath.jpg"],
            ["Badrinath", "Temple of Lord Vishnu", "/images/chardham/badrinath.jpg"],
            ["Gangotri", "Origin of River Ganga", "/images/chardham/gangotri.jpg"],
            ["Yamunotri", "Source of River Yamuna", "/images/chardham/yamunotri.jpg"],
            ["Hemkund Sahib", "Holy Sikh pilgrimage site", "/images/chardham/hemkund.jpg"],
          ].map(([name, text, image]) => (
            <Link
              key={name}
              to={`/chardham/${name.toLowerCase().replace(/\s+/g, "-")}`}
              style={card}
            >
              <img src={image} alt={name} style={img} />
              <div style={body}>
                <div style={title}>{name}</div>
                <div style={desc}>{text}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TREKS */}
      <section style={section}>
        <h2 style={{ marginBottom: 16 }}>Popular treks</h2>
        <div style={grid}>
          {[
            ["Kedarkantha Trek", "Most popular winter trek", "/treks/kedarkantha", "/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "Valley of Gods trek", "/treks/har-ki-dun", "/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "Best weekend trek", "/treks/nag-tibba", "/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "UNESCO heritage alpine valley", "/treks/valley-of-flowers", "/images/treks/valley-of-flowers.jpg"],
          ].map(([name, text, link, image]) => (
            <Link key={name} to={link} style={card}>
              <img src={image} alt={name} style={img} />
              <div style={body}>
                <div style={title}>{name}</div>
                <div style={desc}>{text}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
