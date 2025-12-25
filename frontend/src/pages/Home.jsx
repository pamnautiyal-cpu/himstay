import React from "react";

/* ===== DESTINATION DATA WITH IMAGES ===== */

const uttarakhandDestinations = [
  {
    name: "Mussoorie",
    img: "https://images.unsplash.com/photo-1586372215481-3c1c6c1f63c5",
  },
  {
    name: "Nainital",
    img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
  },
  {
    name: "Dehradun",
    img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
  },
  {
    name: "Haldwani",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
];

const charDhamDestinations = [
  {
    name: "Uttarkashi",
    img: "https://images.unsplash.com/photo-1600962815726-457c46a12681",
  },
  {
    name: "Pauri",
    img: "https://images.unsplash.com/photo-1585128792020-803d29415281",
  },
  {
    name: "Chamoli",
    img: "https://images.unsplash.com/photo-1544735716-6dc0f8df8f5c",
  },
  {
    name: "Kedarnath",
    img: "https://images.unsplash.com/photo-1628094791263-8b0c7b1e5f74",
  },
  {
    name: "Gangotri",
    img: "https://images.unsplash.com/photo-1597506395094-9c2f5e4d7f91",
  },
  {
    name: "Yamunotri",
    img: "https://images.unsplash.com/photo-1616762686536-7d21c9e64c7c",
  },
  {
    name: "Badrinath",
    img: "https://images.unsplash.com/photo-1621939514649-280e2b4c4d56",
  },
  {
    name: "Hemkund Sahib",
    img: "https://images.unsplash.com/photo-1624012458493-2e04e6c8c3e1",
  },
];

export default function Home() {
  return (
    <div className="hs-home">
      {/* ===== SEARCH CARD ===== */}
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

      {/* ===== UTTARAKHAND ===== */}
      <section className="hs-destination-section">
        <h2>Top destinations in Uttarakhand</h2>

        <div className="hs-destination-grid">
          {uttarakhandDestinations.map((d) => (
            <div key={d.name} className="hs-destination-card">
              <img src={d.img} alt={d.name} />
              <p>{d.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CHAR DHAM ===== */}
      <section className="hs-destination-section">
        <h2>Char Dham Yatra destinations in Uttarakhand</h2>

        <div className="hs-destination-grid">
          {charDhamDestinations.map((d) => (
            <div key={d.name} className="hs-destination-card">
              <img src={d.img} alt={d.name} />
              <p>{d.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
