import React from "react";

export default function MyTrips() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(to bottom, #e0f2fe, #f0f9ff)",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 10,
          }}
        >
          Your Trips in the Himalayas 🏔️
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#334155",
            marginBottom: 30,
          }}
        >
          Track all your upcoming and past HimStay bookings.
        </p>

        {/* Mountains Illustration */}
        <img
          src="https://i.imgur.com/YOwM8Uh.png"
          alt="mountains"
          style={{
            width: "100%",
            maxWidth: 650,
            margin: "20px auto",
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* Empty State */}
      <div
        style={{
          marginTop: 40,
          textAlign: "center",
          color: "#475569",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>
          No trips booked yet 😔
        </h2>
        <p style={{ marginBottom: 20 }}>Start exploring amazing stays now!</p>

        <a
          href="/hotels"
          style={{
            padding: "12px 26px",
            borderRadius: 999,
            background: "#0ea5e9",
            color: "white",
            textDecoration: "none",
            fontSize: 16,
          }}
        >
          Explore Hotels
        </a>
      </div>
    </div>
  );
}
