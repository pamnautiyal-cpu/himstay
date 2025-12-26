import React from "react";
import { useParams } from "react-router-dom";

function TrekDetails() {
  const { trekId } = useParams();

  return (
    <div style={{ padding: "80px 20px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>
        🏔️ {trekId.replace("-", " ").toUpperCase()}
      </h1>

      <p style={{ fontSize: 18, color: "#475569", marginBottom: 24 }}>
        Experience the best trekking adventure in Uttarakhand with scenic views,
        local guides and safe travel.
      </p>

      <ul style={{ lineHeight: 1.8, fontSize: 16 }}>
        <li>⛰️ Altitude: 10,000 – 14,000 ft</li>
        <li>📅 Best season: Oct – Apr</li>
        <li>🥾 Difficulty: Easy to Moderate</li>
        <li>⏳ Duration: 4–6 days</li>
      </ul>

      <button
        style={{
          marginTop: 30,
          padding: "14px 28px",
          borderRadius: 999,
          background: "#2563eb",
          color: "#fff",
          border: "none",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Enquire Trek
      </button>
    </div>
  );
}

export default TrekDetails;
