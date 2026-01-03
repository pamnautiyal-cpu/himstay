import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const section = {
    maxWidth: 1200,
    margin: "60px auto",
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
    boxShadow: "0 10px 30px rgba(0,0,0,.12)",
    transition: "transform .25s ease, box-shadow .25s ease",
  };

  const img = {
    width: "100%",
    height: 150,
    objectFit: "cover",
    display: "block",
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>

      {/* 🔹 PAGE HEADING (NO IMAGE) */}
      <section style={{ ...section, marginTop: 40 }}>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>
          Find your perfect stay 🏔️
        </h1>
        <p style={{ color: "#475569" }}>
          Hotels, homestays & retreats across Uttarakhand
        </p>
      </section>

      {/* 🔹 TOP DESTINATIONS */}
      <section style={section}>
        <h2 style={{ marginBottom: 18 }}>Top destinations</h2>

        <div style={grid}>
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, image]) => (
            <Link
              key={name}
              to={`/destination/${name.toLowerCase()}`}
              style={card}
              className="home-card"
            >
              <img src={image} alt={name} style={img} />
              <div style={{ padding: 14, fontWeight: 700 }}>
                {name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔹 TREKS */}
      <section style={section}>
        <h2 style={{ marginBottom: 18 }}>Popular treks</h2>

        <div style={grid}>
          {[
            ["Kedarkantha Trek", "/treks/kedarkantha", "/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "/treks/har-ki-dun", "/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "/treks/nag-tibba", "/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "/treks/valley-of-flowers", "/images/treks/valley-of-flowers.jpg"],
          ].map(([title, link, image]) => (
            <Link key={title} to={link} style={card} className="home-card">
              <img src={image} alt={title} style={img} />
              <div style={{ padding: 14, fontWeight: 700 }}>
                {title}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
