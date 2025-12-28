import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");

  const [hotel, setHotel] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    guests: 1,
    checkIn: "",
    packageType: "Hotel Stay",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!hotelId) return;

    axios
      .get(`${BACKEND_URL}/api/hotels/${hotelId}`)
      .then((res) => setHotel(res.data))
      .catch((err) =>
        console.error("Booking hotel fetch error", err)
      );
  }, [hotelId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    axios
      .post(`${BACKEND_URL}/api/bookings`, {
        hotelId,
        ...form,
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Booking submit error", err);
        alert("Booking failed. Try again.");
        setLoading(false);
      });
  }

  if (success) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <h1>✅ Booking Confirmed</h1>
        <p>We have received your booking request.</p>
      </div>
    );
  }

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

        {hotel && (
          <p style={{ color: "#475569", marginBottom: 20 }}>
            🏨 <b>{hotel.name}</b> · {hotel.city} · ₹{hotel.price}/night
          </p>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          <input name="name" placeholder="Full Name" style={inputStyle} onChange={handleChange} required />
          <input name="email" placeholder="Email Address" type="email" style={inputStyle} onChange={handleChange} required />
          <input name="phone" placeholder="Mobile Number" type="tel" style={inputStyle} onChange={handleChange} required />
          <input name="city" placeholder="City" style={inputStyle} onChange={handleChange} />

          <input name="checkIn" type="date" style={inputStyle} onChange={handleChange} />
          <input name="guests" type="number" min="1" placeholder="Number of Guests" style={inputStyle} onChange={handleChange} />

          <select name="packageType" style={inputStyle} onChange={handleChange}>
            <option>Hotel Stay</option>
            <option>Trekking Package</option>
            <option>Yoga Retreat</option>
          </select>

          <textarea
            name="notes"
            placeholder="Special Requests (optional)"
            rows={4}
            style={{ ...inputStyle, gridColumn: "1 / -1" }}
            onChange={handleChange}
          />

          <div style={{ gridColumn: "1 / -1" }}>
            <h2 style={{ color: "#16a34a" }}>
              ₹{hotel ? hotel.price : "—"}
            </h2>
          </div>

          <button
            type="submit"
            disabled={loading}
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
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Booking..." : "Confirm Booking"}
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
