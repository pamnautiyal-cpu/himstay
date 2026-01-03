import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!city) return;
    navigate(`/hotels?city=${city}`);
  }

  return (
    <div className="booking-home">

      {/* HERO */}
      <section className="booking-hero">
        <div className="booking-hero-inner">
          <h1>Find your perfect stay</h1>
          <p>Hotels, homestays & retreats across Uttarakhand</p>

          {/* SEARCH CARD */}
          <form className="search-card" onSubmit={handleSearch}>
            <input
              placeholder="Enter destination (Mussoorie, Nainital...)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button type="submit">
              Search
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
