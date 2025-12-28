import React from "react";

export default function Booking() {
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh", padding: "60px 20px" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 30px 70px rgba(15,23,42,0.2)",
        }}
      >
        <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 10 }}>
          Complete Your Booking
        </h1>
        <p style={{ color: "#475569", marginBottom: 30 }}>
          Secure booking · No hidden charges · 24/7 support
        </p>

        {/* FORM */}
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          <input
            placeholder="Full Name"
            style={inputStyle}
          />
          <input
            placeholder="Email Address"
            type="email"
            style={inputStyle}
          />
          <input
            placeholder="Mobile Number"
            type="tel"
            style={inputStyle}
          />
          <input
            placeholder="City"
            style={inputStyle}
          />

          <input
            type="date"
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Number of Guests"
            style={inputStyle}
          />

          <select style={inputStyle}>
            <option>Select Package</option>
            <option>Hotel Stay</option>
            <option>Trekking Package</option>
            <option>Yoga Retreat</option>
          </select>

          <textarea
            placeholder="Special Requests (optional)"
            rows={4}
            style={{ ...inputStyle, gridColumn: "1 / -1" }}
          />

          {/* PRICE */}
          <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
            <p style={{ color: "#64748b", fontSize: 14 }}>
              Total Amount
            </p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#16a34a" }}>
              ₹12,999
            </h2>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            style={{
              gridColumn: "1 / -1",
              padding: "18px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "#fff",
              fontSize: 18,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 15px 40px rgba(37,99,235,.5)",
            }}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "16px 18px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  fontSize: 15,
  outline: "none",
};
