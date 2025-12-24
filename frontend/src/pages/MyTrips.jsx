import React from "react";
import { Link } from "react-router-dom";

export default function MyTrips() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(to bottom, #e0f2fe, #f0f9ff)",
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 10,
          }}
        >
          Your Himalayan Trips 🏔️
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#334155",
            marginBottom: 30,
          }}
        >
          Track all your upcoming and past bookings with The Himalayans.
        </p>

        {/* Illustration */}
        <img
          src="https://i.imgur.com/YOwM8Uh.png"
          alt="Himalayan mountains"
          style={{
            width: "100%",
            maxWidth: 600,
            margin: "20px auto",
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            display: "block",
          }}
        />
      </div>

      {/* ===== EMPTY STATE ===== */}
      <div
        style={{
          marginTop: 50,
          textAlign: "center",
          color: "#475569",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>
          No trips booked yet 😔
        </h2>

        <p style={{ marginBottom: 20 }}>
          Start exploring cozy stays in the Himalayas.
        </p>

        <Link
          to="/hotels"
          style={{
            padding: "12px 26px",
            borderRadius: 999,
            background: "#0ea5e9",
            color: "white",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 600,
            display: "inline-block",
          }}
        >
          Explore Hotels
        </Link>
      </div>
    </div>
  );
}
