import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

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
    return <div style={{ padding: 40 }}>Loading hotel details…</div>;
  }

  if (!hotel) {
    return <div style={{ padding: 40 }}>Hotel not found</div>;
  }

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
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
          <h1 style={{ fontSize: 30, fontWeight: 800 }}>
            {hotel.name}
          </h1>

          <p style={{ color: "#475569", marginBottom: 20 }}>
            📍 {hotel.city} · ⭐ {hotel.rating || 4.5}
          </p>

          {/* INFO GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginBottom: 30,
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
            }}
          >
            <div>
              <p style={{ fontSize: 14, color: "#64748b" }}>
                Price per night
              </p>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#16a34a" }}>
                ₹{hotel.price}
              </h2>
            </div>

            <Link to="/booking">
              <button
                style={{
                  padding: "14px 28px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow:
                    "0 10px 30px rgba(37,99,235,0.5)",
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
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
            About this stay
          </h3>
          <p style={{ color: "#475569", lineHeight: 1.7 }}>
            {hotel.description ||
              "Experience peaceful Himalayan living with warm hospitality and modern comfort."}
          </p>
        </div>
      </div>
    </div>
  );
}
