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
    axios.get(`${BACKEND_URL}/api/bookings/user/${userEmail}`)
      .then((res) => {
        setBookings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) return <div style={{ padding: "80px", textAlign: "center" }}>🏔️ Loading journeys...</div>;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1>My Trips & Bookings</h1>
        {bookings.length === 0 ? (
          <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
            <h3>No trips booked yet</h3>
            <button onClick={() => navigate("/hotels")} style={{ background: "#006ce4", color: "#fff", padding: "10px 24px", borderRadius: "6px", cursor: "pointer" }}>Explore Stays</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {bookings.map((trip) => (
              <div key={trip._id} style={{ background: "#fff", borderRadius: "12px", padding: "24px", position: "relative", border: "1px solid #e2e8f0" }}>
                
                {/* Dynamic Status Badge */}
                <span style={{ 
                  position: "absolute", top: "24px", right: "24px", 
                  background: trip.status === "Confirmed" ? "#f0fdf4" : trip.status === "Cancelled" ? "#fef2f2" : "#fff7ed", 
                  color: trip.status === "Confirmed" ? "#16a34a" : trip.status === "Cancelled" ? "#dc2626" : "#d97706", 
                  fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px",
                  border: `1px solid ${trip.status === "Confirmed" ? "#bbf7d0" : trip.status === "Cancelled" ? "#fecaca" : "#fed7aa"}` 
                }}>
                  ● {trip.status || "Pending"}
                </span>

                <h3>{trip.hotelName || trip.bookingData?.hotelName || "Stay"}</h3>
                <p><strong>Price:</strong> ₹{trip.amount || trip.bookingData?.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}