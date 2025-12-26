import React from "react";
import { useParams } from "react-router-dom";

const trekImages = {
  kedarkantha: [
    "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    "https://images.unsplash.com/photo-1548013146-72479768bada",
    "https://images.unsplash.com/photo-1586372215481-3c1c6c1f63c5",
  ],
  nagtibba: [
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
    "https://images.unsplash.com/photo-1600962815726-457c46a12681",
  ],
};

export default function TrekDetails() {
  const { slug } = useParams();
  const images = trekImages[slug] || [];

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 10 }}>
        {slug?.replace("-", " ").toUpperCase()}
      </h1>

      <p style={{ color: "#475569", marginBottom: 30 }}>
        Experience the beauty of Uttarakhand trekking trails
      </p>

      {/* IMAGE GALLERY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="trek"
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>

      {/* DETAILS */}
      <div style={{ marginTop: 40 }}>
        <h3>About this trek</h3>
        <p>
          This trek offers breathtaking Himalayan views, snow trails,
          alpine forests and unforgettable adventure.
        </p>

        <ul>
          <li>⛰️ Difficulty: Easy–Moderate</li>
          <li>📅 Best season: Dec – April</li>
          <li>🕒 Duration: 4–6 days</li>
          <li>👥 Group size: 6–15</li>
        </ul>
      </div>
    </div>
  );
}
