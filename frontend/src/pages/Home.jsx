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
    overflow: "hidden",
    boxShadow: "0 20px 45px rgba(15,23,42,.15)",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: 700,
    textAlign: "center",
  };

  const img = {
    width: "100%",
    height: 160,
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

      {/* DESTINATIONS */}
      <section style={section}>
        <h2>Top destinations in Uttarakhand</h2>
        <div style={grid}>
          {[
            ["Mussoorie", "/assets/images/destinations/mussoorie.jpg"],
            ["Nainital", "/assets/images/destinations/nainital.jpg"],
            ["Dehradun", "/assets/images/destinations/dehradun.jpg"],
            ["Haldwani", "/assets/images/destinations/haldwani.jpg"],
          ].map(([name, src]) => (
            <div key={name} style={card}>
              <img src={src} alt={name} style={img} />
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
            ["Kedarnath", "/assets/images/chardham/kedarnath.jpg"],
            ["Badrinath", "/assets/images/chardham/badrinath.jpg"],
            ["Gangotri", "/assets/images/chardham/gangotri.jpg"],
            ["Yamunotri", "/assets/images/chardham/yamunotri.jpg"],
            ["Hemkund Sahib", "/assets/images/chardham/hemkund.jpg"],
          ].map(([name, src]) => (
            <div key={name} style={card}>
              <img src={src} alt={name} style={img} />
              <div style={{ padding: 16 }}>{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TREKS */}
      <section style={section}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={grid}>
          {[
            ["Kedarkantha Trek", "/treks/kedarkantha", "/assets/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "/treks/har-ki-dun", "/assets/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "/treks/nag-tibba", "/assets/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "/treks/valley-of-flowers", "/assets/images/treks/valley-of-flowers.jpg"],
            ["Roopkund Trek", "/treks/roopkund", "/assets/images/treks/roopkund.jpg"],
          ].map(([name, link, src]) => (
            <Link key={name} to={link} style={card}>
              <img src={src} alt={name} style={img} />
              <div style={{ padding: 16 }}>{name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* YOGA */}
      <section style={section}>
        <h2>Yoga & Natural Therapy Retreats</h2>
        <div style={grid}>
          {[
            ["Himalayan Yoga Retreat", "/yoga/himalayan-retreat", "/assets/images/yoga/himalayan-yoga.jpg"],
            ["Naturopathy Healing", "/yoga/naturopathy", "/assets/images/yoga/naturopathy.jpg"],
            ["Meditation & Pranayama", "/yoga/meditation", "/assets/images/yoga/meditation.jpg"],
            ["Ayurvedic Therapy", "/yoga/ayurveda", "/assets/images/yoga/ayurveda.jpg"],
            ["Panchakarma Detox", "/yoga/panchakarma", "/assets/images/yoga/panchakarma.jpg"],
          ].map(([name, link, src]) => (
            <Link key={name} to={link} style={card}>
              <img src={src} alt={name} style={img} />
              <div style={{ padding: 16 }}>{name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
