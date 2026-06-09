import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminBookings() {
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
        console.error("Admin booking fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif", color: "#64748b" }}>
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1e293b", marginBottom: "20px" }}>
          Admin Dashboard – All Bookings
        </h1>

        {bookings.length === 0 ? (
          <div style={{ background: "#fff", padding: 40, borderRadius: 12, textAlign: "center", border: "1px solid #e2e8f0" }}>
            <h3>No bookings found in database.</h3>
          </div>
        ) : (
          <div style={{ overflowX: "auto", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.04)", border: "1px solid #e2e8f0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f1f5f9", color: "#475569", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "16px" }}>Hotel Details</th>
                  <th style={{ padding: "16px" }}>Guest Name</th>
                  <th style={{ padding: "16px" }}>Contact</th>
                  <th style={{ padding: "16px" }}>Guests</th>
                  <th style={{ padding: "16px" }}>Check-in</th>
                  <th style={{ padding: "16px" }}>Package</th>
                  <th style={{ padding: "16px" }}>Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} style={{ borderBottom: "1px solid #f1f5f9", color: "#334155" }}>
                    <td style={{ padding: "16px" }}>
                      <strong style={{ color: "#1e293b" }}>{b.hotelId?.name || "N/A"}</strong>
                      <br />
                      <small style={{ color: "#64748b" }}>📍 {b.hotelId?.city || "N/A"}</small>
                    </td>
                    <td style={{ padding: "16px", fontWeight: "500" }}>{b.name}</td>
                    <td style={{ padding: "16px" }}>
                      📞 {b.phone}
                      <br />
                      <small style={{ color: "#64748b" }}>✉️ {b.email}</small>
                    </td>
                    <td style={{ padding: "16px" }}>{b.guests || 1}</td>
                    <td style={{ padding: "16px", fontWeight: "500" }}>{b.checkIn}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>
                        {b.packageType || "Standard"}
                      </span>
                    </td>
                    <td style={{ padding: "16px", color: "#64748b" }}>
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}