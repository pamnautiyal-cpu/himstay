import React, { useState } from "react";

export default function Booking() {
  const [data, setData] = useState({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: 2,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Booking request submitted!");
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh", padding: 20 }}>
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 20,
          padding: 30,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>
          Complete your booking
        </h1>
        <p style={{ color: "#475569", marginBottom: 20 }}>
          Himalayan View Homestay · Mussoorie
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <input
            name="name"
            placeholder="Full name"
            required
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            onChange={handleChange}
            style={inputStyle}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              type="date"
              name="checkin"
              required
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="date"
              name="checkout"
              required
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <select
            name="guests"
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>

          <button
            type="submit"
            style={{
              marginTop: 10,
              padding: "14px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(34,197,94,0.45)",
            }}
          >
            Confirm Booking
          </button>
        </form>

        <p style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}>
          No payment required now · Free cancellation
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5f5",
  fontSize: 14,
};
