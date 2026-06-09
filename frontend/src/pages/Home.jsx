import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const destinations = ["Mussoorie", "Nainital", "Rishikesh", "Auli", "Uttarkashi"];

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/hotels?city=${search}`);
    } else {
      navigate("/hotels");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>Discover the Himalayas</h1>
      <p style={{ textAlign: "center", color: "#64748b" }}>Hotels, Homestays & Adventure Experiences</p>

      {/* फंक्शनल सर्च बार */}
      <div style={{ display: "flex", gap: "10px", maxWidth: "600px", margin: "20px auto 40px" }}>
        <input
          type="text"
          placeholder="Where are you going?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
        />
        <button onClick={handleSearch} style={{ padding: "12px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Search
        </button>
      </div>

      {/* क्लिकेबल डेस्टिनेशन कार्ड्स */}
      <h3>Popular Destinations</h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {destinations.map((city) => (
          <div
            key={city}
            onClick={() => navigate(`/hotels?city=${city}`)}
            style={{ padding: "15px 25px", background: "#f1f5f9", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}
          >
            {city}
          </div>
        ))}
      </div>
    </div>
  );
}