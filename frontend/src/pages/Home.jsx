import React from "react";
import { Link } from "react-router-dom";

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
    <div className="bk-home">

      {/* ===== HERO SEARCH ===== */}
      <section className="bk-hero">
        <h1>Find your next stay</h1>
        <p>Hotels & homestays across Uttarakhand</p>

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

        <div className="bk-text-grid">
          {uttarakhand.map((name) => (
            <Link
              key={name}
              to={`/hotels?city=${encodeURIComponent(name)}`}
              className="bk-text-card"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CHAR DHAM ===== */}
      <section className="bk-section">
        <h2>Char Dham Yatra Destinations</h2>

        <div className="bk-text-grid">
          {charDham.map((name) => (
            <Link
              key={name}
              to={`/hotels?city=${encodeURIComponent(name)}`}
              className="bk-text-card"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
