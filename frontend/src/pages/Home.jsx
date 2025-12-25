import React from "react";

const destinations = [
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

const charDham = [
  {
    name: "Kedarnath",
    img: "https://images.unsplash.com/photo-1628094791263-8b0c7b1e5f74",
  },
  {
    name: "Badrinath",
    img: "https://images.unsplash.com/photo-1621939514649-280e2b4c4d56",
  },
  {
    name: "Gangotri",
    img: "https://images.unsplash.com/photo-1597506395094-9c2f5e4d7f91",
  },
  {
    name: "Yamunotri",
    img: "https://images.unsplash.com/photo-1616762686536-7d21c9e64c7c",
  },
];

export default function Home() {
  return (
    <div className="bk-home">
      {/* ===== HERO SEARCH ===== */}
      <section className="bk-hero">
        <h1>Find your next stay</h1>
        <p>Search deals on hotels, homes, and much more…</p>

        <div className="bk-search">
          <input placeholder="Where are you going?" />
          <input type="date" />
          <input type="date" />
          <button>Search</button>
        </div>
      </section>

      {/* ===== UTTARAKHAND ===== */}
      <section className="bk-section">
        <h2>Top destinations in Uttarakhand</h2>
        <div className="bk-grid">
          {destinations.map((d) => (
            <div key={d.name} className="bk-card">
              <img src={d.img} alt={d.name} />
              <span>{d.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CHAR DHAM ===== */}
      <section className="bk-section">
        <h2>Char Dham Yatra Destinations</h2>
        <div className="bk-grid">
          {charDham.map((d) => (
            <div key={d.name} className="bk-card">
              <img src={d.img} alt={d.name} />
              <span>{d.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
