import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const sectionStyle = {
    maxWidth: 1200,
    margin: "60px auto",
    padding: "0 20px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 16,
    marginTop: 20,
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "18px 16px",
    borderRadius: 16,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 15,
    color: "#0f172a",
    boxShadow: "0 14px 35px rgba(15,23,42,0.15)",
    textDecoration: "none",
    cursor: "pointer",
  };

  const featureCard = {
    background: "#ffffff",
    padding: "26px 22px",
    borderRadius: 20,
    boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
  };

  const iconStyle = {
    fontSize: 38,
    marginBottom: 12,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#eaf2ff 0%,#f4f8ff 45%,#ffffff 100%)",
      }}
    >
      {/* HERO */}
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: "48px 40px",
          borderRadius: 32,
          background: "linear-gradient(135deg,#ffffff,#eef2ff)",
          boxShadow: "0 30px 70px rgba(15,23,42,0.15)",
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 8 }}>
          Find your next stay
        </h1>
        <p style={{ color: "#475569" }}>
          Hotels & homestays across Uttarakhand
        </p>
      </div>

      {/* TOP DESTINATIONS */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>
          Top destinations in Uttarakhand
        </h2>
        <div style={gridStyle}>
          {["Mussoorie", "Nainital", "Dehradun", "Haldwani"].map((d) => (
            <div key={d} style={cardStyle}>{d}</div>
          ))}
        </div>
      </section>

      {/* CHAR DHAM */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>
          Char Dham Yatra Destinations
        </h2>
        <div style={gridStyle}>
          {["Kedarnath","Badrinath","Gangotri","Yamunotri","Hemkund Sahib"].map((d) => (
            <div key={d} style={cardStyle}>{d}</div>
          ))}
        </div>
      </section>

      {/* 🏔️ TREKKING & ADVENTURE (DETAIL PAGE LINKS) */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>
          Trekking & Adventure in Uttarakhand
        </h2>

        <div style={gridStyle}>
          <Link to="/treks/kedarkantha" style={cardStyle}>
            🏔️ Kedarkantha Trek
          </Link>

          <Link to="/treks/har-ki-dun" style={cardStyle}>
            🥾 Har Ki Dun Trek
          </Link>

          <Link to="/treks/nag-tibba" style={cardStyle}>
            🌄 Nag Tibba Trek
          </Link>

          <Link to="/treks/valley-of-flowers" style={cardStyle}>
            🌸 Valley of Flowers
          </Link>

          <Link to="/treks/roopkund" style={cardStyle}>
            ❄️ Roopkund Trek
          </Link>
        </div>
      </section>

      {/* 🧘 YOGA & NATURAL THERAPY */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>
          Yoga & Natural Therapy Retreats
        </h2>

        <div style={gridStyle}>
          <Link to="/yoga/himalayan-retreat" style={cardStyle}>
            🧘 Himalayan Yoga Retreat
          </Link>

          <Link to="/yoga/naturopathy" style={cardStyle}>
            🌿 Naturopathy Healing
          </Link>

          <Link to="/yoga/meditation" style={cardStyle}>
            🕉️ Meditation & Pranayama
          </Link>

          <Link to="/yoga/ayurveda" style={cardStyle}>
            💆 Ayurvedic Therapy
          </Link>

          <Link to="/yoga/panchakarma" style={cardStyle}>
            🔥 Panchakarma Detox
          </Link>
        </div>
      </section>

      {/* WHY THE HIMALAYANS */}
      <section style={{ maxWidth: 1200, margin: "80px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800 }}>
          Why The Himalayans?
        </h2>
        <p style={{ color: "#475569", marginBottom: 32 }}>
          Trusted stays, treks & wellness experiences across Uttarakhand
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          <div style={featureCard}>
            <div style={iconStyle}>🏨</div>
            <h4>Book now, pay later</h4>
            <p>Flexible stays & easy payments</p>
          </div>

          <div style={featureCard}>
            <div style={iconStyle}>⭐</div>
            <h4>Verified experiences</h4>
            <p>Handpicked stays & treks</p>
          </div>

          <div style={featureCard}>
            <div style={iconStyle}>🏔️</div>
            <h4>Himalayan expertise</h4>
            <p>Mountains, trekking & wellness</p>
          </div>

          <div style={featureCard}>
            <div style={iconStyle}>📞</div>
            <h4>24/7 local support</h4>
            <p>Real help, anytime</p>
          </div>
        </div>
      </section>
    </div>
  );
0}
