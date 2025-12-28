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
            <div key={name} style={card}>
              <img src={image} alt={name} style={img} />
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
            <div key={name} style={card}>
              <img src={image} alt={name} style={img} />
              <div style={{ padding: 16 }}>{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TREKKING */}
      <section style={section}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={grid}>
          <Link to="/treks/kedarkantha" style={card}>
            <img src="/images/treks/kedarkantha.jpg" style={img} />
            <div style={{ padding: 16 }}>Kedarkantha Trek</div>
          </Link>

          <Link to="/treks/har-ki-dun" style={card}>
            <img src="/images/treks/har-ki-dun.jpg" style={img} />
            <div style={{ padding: 16 }}>Har Ki Dun Trek</div>
          </Link>

          <Link to="/treks/nag-tibba" style={card}>
            <img src="/images/treks/nag-tibba.jpg" style={img} />
            <div style={{ padding: 16 }}>Nag Tibba Trek</div>
          </Link>

          <Link to="/treks/valley-of-flowers" style={card}>
            <img src="/images/treks/valley-of-flowers.jpg" style={img} />
            <div style={{ padding: 16 }}>Valley of Flowers</div>
          </Link>

          <Link to="/treks/roopkund" style={card}>
            <img src="/images/treks/roopkund.jpg" style={img} />
            <div style={{ padding: 16 }}>Roopkund Trek</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
