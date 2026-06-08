import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/bookings`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading your trips...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: 40,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          🏔️ My Trips
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: 30,
          }}
        >
          View all your Himalayan bookings.
        </p>

        {bookings.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: 40,
              borderRadius: 20,
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2>No trips booked yet 😔</h2>
            <p>Book your first Himalayan stay.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 24,
                marginBottom: 20,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ marginBottom: 8 }}>
                {booking.hotelId?.name || "Hotel"}
              </h2>

              <div style={{ color: "#64748b" }}>
                📍 {booking.hotelId?.city}
              </div>

              <div style={{ marginTop: 10 }}>
                👤 {booking.name}
              </div>

              <div>
                📧 {booking.email}
              </div>

              <div>
                📞 {booking.phone}
              </div>

              <div>
                👥 Guests: {booking.guests}
              </div>

              <div>
                📅 Check In: {booking.checkIn}
              </div>

              <div>
                🎒 Package: {booking.packageType}
              </div>

              <div
                style={{
                  marginTop: 14,
                  color: "#16a34a",
                  fontWeight: 700,
                }}
              >
                Booking Confirmed ✅
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}