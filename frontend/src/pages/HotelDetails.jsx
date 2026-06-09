import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// प्रोडक्शन डिप्लॉयमेंट को ध्यान में रखते हुए डायनेमिक बैकएंड यूआरएल
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/hotels/${id}`)
      .then((res) => {
        setHotel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hotel detail fetch error", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", fontSize: "18px", fontFamily: "sans-serif", color: "#64748b" }}>
        Loading hotel details…
      </div>
    );
  }

  if (!hotel) {
    return (
      <div style={{ padding: 40, textAlign: "center", fontSize: "18px", fontFamily: "sans-serif", color: "#64748b" }}>
        Hotel not found
      </div>
    );
  }

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* HERO IMAGE */}
      <div
        style={{
          height: 360,
          backgroundImage: hotel.image
            ? `url(${hotel.image})`
            : "url(https://images.unsplash.com/photo-1501117716987-c8e1ecb210d1)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "-80px auto 0", padding: 20 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 30,
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          }}
        >
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 10px 0", color: "#1e293b" }}>
            {hotel.name}
          </h1>

          <p style={{ color: "#475569", marginBottom: 20, fontSize: "16px" }}>
            📍 {hotel.city || hotel.location} · ⭐ {hotel.rating || 4.5}
          </p>

          {/* INFO GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginBottom: 30,
              color: "#334155",
              fontSize: "15px"
            }}
          >
            <div>🛏️ {hotel.roomType || "Deluxe Room"}</div>
            <div>👨‍👩‍👧 {hotel.guests || 2} Guests</div>
            <div>🌄 {hotel.view || "Mountain View"}</div>
            <div>📶 Free Wi-Fi</div>
            <div>🍳 Breakfast Included</div>
            <div>🚗 Free Parking</div>
          </div>

          {/* PRICE + BOOK */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              paddingTop: "20px",
              borderTop: "1px solid #e2e8f0"
            }}
          >
            <div>
              <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 4px 0" }}>
                Price per night
              </p>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#16a34a", margin: 0 }}>
                ₹{hotel.price}
              </h2>
            </div>

            <Link to={`/booking?hotelId=${hotel._id}`}>
              <button
                style={{
                  padding: "14px 32px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(37,99,235,0.4)",
                }}
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div
          style={{
            marginTop: 30,
            background: "#fff",
            borderRadius: 20,
            padding: 30,
            boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
            border: "1px solid #e2e8f0"
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: "#1e293b" }}>
            About this stay
          </h3>
          <p style={{ color: "#475569", lineHeight: 1.7, margin: 0 }}>
            {hotel.description ||
              "Experience peaceful Himalayan living with warm hospitality and modern comfort."}
          </p>
        </div>
      </div>
    </div>
  );
}