import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/bookings`)
      .then((res) => {
        setBookings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Booking fetch error:", err);
        setBookings([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif", color: "#64748b" }}>
        🏔️ Loading your trips...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: "5px", color: "#1e293b" }}>
          🏔️ My Trips
        </h1>
        <p style={{ color: "#64748b", marginBottom: 30 }}>
          View all your confirmed Himalayan bookings.
        </p>

        {bookings.length === 0 ? (
          <div style={{ background: "#fff", padding: 40, borderRadius: 20, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
            <h2 style={{ color: "#334155" }}>No trips booked yet 😔</h2>
            <p style={{ color: "#64748b" }}>Explore our stays and book your first trip now.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid #e2e8f0" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <h2 style={{ margin: "0 0 5px 0", color: "#1e293b", fontSize: "22px" }}>
                    {booking.hotelId?.name || "Premium Himalayan Resort"}
                  </h2>
                  <div style={{ color: "#64748b", fontSize: "14px", fontWeight: "500" }}>
                    📍 {booking.hotelId?.city || booking.city || "Uttarakhand"}
                  </div>
                </div>
                <span style={{ background: "#dcfce7", color: "#16a34a", padding: "6px 14px", borderRadius: "20px", fontWeight: "bold", fontSize: "14px" }}>
                  Confirmed ✅
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #f1f5f9", color: "#475569", fontSize: "14px" }}>
                <div>👤 <strong>Guest Name:</strong> {booking.name}</div>
                <div>📞 <strong>Phone:</strong> {booking.phone}</div>
                <div>📧 <strong>Email:</strong> {booking.email}</div>
                <div>👥 <strong>Total Guests:</strong> {booking.guests || 2}</div>
                <div>📅 <strong>Check In Date:</strong> {booking.checkIn}</div>
                <div>🎒 <strong>Package Type:</strong> {booking.packageType || "Standard"}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}