import React from "react";
import { useParams } from "react-router-dom";
import { treks } from "../data/trekData";

export default function TrekDetails() {
  const { slug } = useParams();
  const trek = treks.find(t => t.slug === slug);

  if (!trek) {
    return <h2 style={{ padding: 40 }}>Trek not found</h2>;
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <img
        src={trek.image}
        alt={trek.name}
        style={{
          width: "100%",
          height: 420,
          objectFit: "cover"
        }}
      />

      <div style={{ maxWidth: 1100, margin: "30px auto", padding: 20 }}>
        <h1>{trek.name}</h1>
        <p>📍 {trek.location}</p>

        <p style={{ marginTop: 20 }}>{trek.desc}</p>

        <div
          style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.12)"
          }}
        >
          <h3>{trek.price}</h3>
          <p>🗓 Duration: {trek.duration}</p>

          <button
            style={{
              marginTop: 20,
              padding: "14px 20px",
              borderRadius: 12,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Book Trek
          </button>
        </div>
      </div>
    </div>
  );
}
