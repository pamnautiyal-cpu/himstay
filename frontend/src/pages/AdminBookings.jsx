import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // बैकएंड से सभी बुकिंग्स फेच करना
    axios.get(`${BACKEND_URL}/api/bookings`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Admin error:", err));
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ color: "#0f172a", marginBottom: "20px" }}>📊 Admin Booking Console</h1>
      
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#0f1e36", color: "#fff" }}>
              <th style={{ padding: "12px" }}>Booking Date</th>
              <th style={{ padding: "12px" }}>Customer Email</th>
              <th style={{ padding: "12px" }}>Hotel</th>
              <th style={{ padding: "12px" }}>Amount</th>
              <th style={{ padding: "12px" }}>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "12px" }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{b.email || b.bookingData?.email}</td>
                <td style={{ padding: "12px" }}>{b.hotelName || b.bookingData?.hotelName}</td>
                <td style={{ padding: "12px" }}>₹{b.amount || b.bookingData?.amount}</td>
                <td style={{ padding: "12px", fontFamily: "monospace", color: "#64748b" }}>{b.paymentId || "Captured"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}