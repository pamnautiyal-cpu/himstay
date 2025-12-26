import React from "react";
import { useParams } from "react-router-dom";

const trekData = {
  kedarkantha: {
    title: "Kedarkantha Trek",
    desc: "One of the most popular winter treks in Uttarakhand with stunning Himalayan views.",
  },
  harkidun: {
    title: "Har Ki Dun Trek",
    desc: "A beautiful valley trek known as the Valley of Gods.",
  },
  nagtibba: {
    title: "Nag Tibba Trek",
    desc: "Perfect weekend trek near Dehradun with snow views.",
  },
};

export default function TrekDetails() {
  const { slug } = useParams();
  const trek = trekData[slug];

  if (!trek) return <h2 style={{ padding: 40 }}>Trek not found</h2>;

  return (
    <div style={{ maxWidth: 900, margin: "60px auto", padding: 20 }}>
      <h1>{trek.title}</h1>
      <p style={{ marginTop: 12 }}>{trek.desc}</p>

      <h3 style={{ marginTop: 30 }}>Highlights</h3>
      <ul>
        <li>Best season: Oct – April</li>
        <li>Altitude: 12,500 ft</li>
        <li>Difficulty: Easy – Moderate</li>
      </ul>

      <button
        style={{
          marginTop: 30,
          padding: "12px 20px",
          borderRadius: 8,
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Book Trek
      </button>
    </div>
  );
}
