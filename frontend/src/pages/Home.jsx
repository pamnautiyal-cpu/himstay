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
        <p style={{ color: "#475569", marginBottom: 24 }}>
          Hotels & homestays across Uttarakhand
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            placeholder="Where are you going?"
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #c7d2fe",
            }}
          />
          <input type="date" style={{ padding: 12, borderRadius: 10 }} />
          <input type="date" style={{ padding: 12, borderRadius: 10 }} />
          <button
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* TOP DESTINATIONS */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>
          Top destinations in Uttarakhand
        </h2>

        <div style={gridStyle}>
          {["Mussoorie", "Nainital", "Dehradun", "Haldwani"].map((d) => (
            <div key={d} style={cardStyle}>
              {d}
            </div>
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
            <div key={d} style={cardStyle}>
              {d}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
{/* ===== TREKKING & ADVENTURE ===== */}
<section className="hs-destination-section">
  <h2>Trekking & Adventure Experiences</h2>

  <div className="bk-grid">
    <div className="bk-card"><span>🌸 Valley of Flowers Trek</span></div>
    <div className="bk-card"><span>🥾 Kedarkantha Trek</span></div>
    <div className="bk-card"><span>🏞 Har Ki Dun Trek</span></div>
    <div className="bk-card"><span>⛰ Nag Tibba Trek</span></div>
    <div className="bk-card"><span>🧭 Kuari Pass Trek</span></div>
    <div className="bk-card"><span>🌊 River Rafting – Rishikesh</span></div>
    <div className="bk-card"><span>🔥 Camping & Bonfire</span></div>
    <div className="bk-card"><span>🚵 Mountain Biking</span></div>
  </div>
</section>
