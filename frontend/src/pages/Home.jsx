import React from "react";

const destinations = [
  { name: "New Delhi & NCR" },
  { name: "Goa" },
  { name: "Bangalore" },
  { name: "Mumbai" },
  { name: "Hyderabad" },
];

export default function Home() {
  return (
    <div className="hs-home">

      {/* ===== SEARCH CARD (AGODA STYLE) ===== */}
      <section className="hs-search-wrap">
        <div className="hs-search-card">

          <div className="hs-search-tabs">
            <button className="active">Overnight Stays</button>
            <button>Day Use Stays</button>
          </div>

          <input
            className="hs-search-input"
            placeholder="Enter a destination or property"
          />

          <div className="hs-search-row">
            <div className="hs-box">📅 Check-in</div>
            <div className="hs-box">📅 Check-out</div>
            <div className="hs-box">👥 2 adults · 1 room</div>
          </div>

          <button className="hs-search-btn">SEARCH</button>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="hs-destination-section">
        <h2>Top destinations in India</h2>

        <div className="hs-destination-grid">
          {destinations.map((d) => (
            <div key={d.name} className="hs-destination-card">
              <div className="hs-destination-img" />
              <p>{d.name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
