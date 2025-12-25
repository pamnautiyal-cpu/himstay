import React from "react";

const uttarakhand = [
  "Mussoorie",
  "Nainital",
  "Dehradun",
  "Haldwani",
];

const charDham = [
  "Kedarnath",
  "Badrinath",
  "Gangotri",
  "Yamunotri",
  "Hemkund Sahib",
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#eef5ff,#f8fbff,#ffffff)" }}>
      
      {/* SEARCH */}
      <section className="hs-search-wrap">
        <div className="hs-search-card">
          <h1 style={{ marginBottom: 6 }}>Find your next stay</h1>
          <p style={{ color: "#64748b", marginBottom: 16 }}>
            Hotels & homestays across Uttarakhand
          </p>

          <input
            className="hs-search-input"
            placeholder="Where are you going?"
          />

          <div className="hs-search-row">
            <div className="hs-box">📅 Check-in</div>
            <div className="hs-box">📅 Check-out</div>
            <div className="hs-box">👥 2 adults · 1 room</div>
          </div>

          <button className="hs-search-btn">Search</button>
        </div>
      </section>

      {/* UTTARAKHAND */}
      <section className="bk-section">
        <h2>Top destinations in Uttarakhand</h2>
        <div className="bk-text-grid">
          {uttarakhand.map((d) => (
            <div key={d} className="bk-text-card">{d}</div>
          ))}
        </div>
      </section>

      {/* CHAR DHAM */}
      <section className="bk-section">
        <h2>Char Dham Yatra Destinations</h2>
        <div className="bk-text-grid">
          {charDham.map((d) => (
            <div key={d} className="bk-text-card">{d}</div>
          ))}
        </div>
      </section>

    </div>
  );
}
