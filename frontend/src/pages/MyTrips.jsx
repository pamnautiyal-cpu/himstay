import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/bookings/user/${userEmail}`)
      .then((res) => {
        setBookings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dynamic trips fetch error:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) {
    return (
      <div style={{ padding: "80px", textAlign: "center", fontSize: "18px", color: "#64748b", fontFamily: "sans-serif" }}>
        🏔️ Loading your Himalayan journeys...
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>My Trips & Bookings</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", marginTop: 0 }}>Manage your verified stays and upcoming adventures.</p>

        {bookings.length === 0 ? (
          <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "50px" }}>🗺️</span>
            <h3>No trips booked yet</h3>
            <button onClick={() => navigate("/hotels")} style={{ background: "#006ce4", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer" }}>Explore Active Stays</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {bookings.map((trip, index) => (
              <div key={trip._id || index} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", position: "relative" }}>
                
                {/* ✅ DYNAMIC STATUS BADGE */}
                <span style={{ 
                  position: "absolute", top: "24px", right: "24px", 
                  background: trip.status === "Confirmed" ? "#f0fdf4" : trip.status === "Cancelled" ? "#fef2f2" : "#fff7ed", 
                  color: trip.status === "Confirmed" ? "#16a34a" : trip.status === "Cancelled" ? "#dc2626" : "#d97706", 
                  fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", 
                  border: `1px solid ${trip.status === "Confirmed" ? "#bbf7d0" : trip.status === "Cancelled" ? "#fecaca" : "#fed7aa"}` 
                }}>
                  ● {trip.status || "Pending"}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <h3>{trip.hotelName || trip.bookingData?.hotelName || "Premium Stay"}</h3>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "15px", background: "#f8fafc", padding: "14px", borderRadius: "8px" }}>
                  <div><span>GUESTS</span><br/><strong>👥 {trip.guests || trip.bookingData?.guests || 2}</strong></div>
                  <div><span>TOTAL PRICE</span><br/><strong style={{ color: "#16a34a" }}>₹{trip.amount || trip.bookingData?.amount}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}