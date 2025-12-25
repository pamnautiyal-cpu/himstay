import React from "react";
import { Link } from "react-router-dom";

const uttarakhand = ["Mussoorie", "Nainital", "Dehradun", "Haldwani"];
const charDham = [
  "Kedarnath",
  "Badrinath",
  "Gangotri",
  "Yamunotri",
  "Hemkund Sahib",
];

export default function Home() {
  return (
    <div className="dash-page">
      {/* HERO */}
      <section className="dash-hero">
        <h1>Find your next stay</h1>
        <p>Hotels & homestays across Uttarakhand</p>

        <div className="dash-search">
          <input placeholder="Where are you going?" />
          <input type="date" />
          <input type="date" />
          <button>Search</button>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="dash-section">
        <h2>Top destinations in Uttarakhand</h2>
        <div className="dash-grid">
          {uttarakhand.map((c) => (
            <Link
              key={c}
              to={`/hotels?city=${c}`}
              className="dash-card"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="dash-section">
        <h2>Char Dham Yatra Destinations</h2>
        <div className="dash-grid">
          {charDham.map((c) => (
            <Link
              key={c}
              to={`/hotels?city=${c}`}
              className="dash-card"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
