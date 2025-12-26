import React from "react";

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
          {[
            "Kedarnath",
            "Badrinath",
            "Gangotri",
            "Yamunotri",
            "Hemkund Sahib",
          ].map((d) => (
            <div key={d} style={cardStyle}>{d}</div>
          ))}
        </div>
      </section>

      {/* 🏔️ TREKKING & ADVENTURE */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>
          Trekking & Adventure in Uttarakhand
        </h2>

        <div style={gridStyle}>
          <a href="https://unsplash.com/s/photos/kedarkantha-trek" target="_blank" rel="noreferrer" style={cardStyle}>
            🏔️ Kedarkantha Trek
          </a>

          <a href="https://unsplash.com/s/photos/har-ki-dun-trek" target="_blank" rel="noreferrer" style={cardStyle}>
            🥾 Har Ki Dun Trek
          </a>

          <a href="https://unsplash.com/s/photos/nag-tibba-trek" target="_blank" rel="noreferrer" style={cardStyle}>
            🌄 Nag Tibba Trek
          </a>

          <a href="https://unsplash.com/s/photos/valley-of-flowers-uttarakhand" target="_blank" rel="noreferrer" style={cardStyle}>
            🌸 Valley of Flowers
          </a>

          <a href="https://unsplash.com/s/photos/roopkund-trek" target="_blank" rel="noreferrer" style={cardStyle}>
            ❄️ Roopkund Trek
          </a>
        </div>
      </section>

      {/* 🧘 YOGA & NATURAL THERAPY */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>
          Yoga & Natural Therapy Retreats
        </h2>

        <div style={gridStyle}>
          <a href="https://unsplash.com/s/photos/himalayan-yoga-retreat" target="_blank" rel="noreferrer" style={cardStyle}>
            🧘 Himalayan Yoga Retreat
          </a>

          <a href="https://unsplash.com/s/photos/naturopathy-healing" target="_blank" rel="noreferrer" style={cardStyle}>
            🌿 Naturopathy Healing
          </a>

          <a href="https://unsplash.com/s/photos/meditation-pranayama" target="_blank" rel="noreferrer" style={cardStyle}>
            🕉️ Meditation & Pranayama
          </a>

          <a href="https://unsplash.com/s/photos/ayurvedic-therapy" target="_blank" rel="noreferrer" style={cardStyle}>
            💆 Ayurvedic Therapy
          </a>

          <a href="https://unsplash.com/s/photos/panchakarma" target="_blank" rel="noreferrer" style={cardStyle}>
            🔥 Panchakarma Detox
          </a>
        </div>
      </section>
    </div>
  );
}
