import React from "react";

export default function HotelDetails() {
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      {/* HERO IMAGE */}
      <div
        style={{
          height: 360,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1501117716987-c8e1ecb210d1)",
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
            Himalayan View Homestay
          </h1>
          <p style={{ color: "#475569", marginBottom: 20 }}>
            📍 Mussoorie, Uttarakhand · ⭐ 4.6 (120 reviews)
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
            <div>🛏️ Deluxe Room</div>
            <div>👨‍👩‍👧 2 Guests</div>
            <div>🌄 Mountain View</div>
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
              <p style={{ fontSize: 14, color: "#64748b" }}>Price per night</p>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#16a34a" }}>
                ₹3,499
              </h2>
            </div>

            <button
              style={{
                padding: "14px 28px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(37,99,235,0.5)",
              }}
            >
              Book Now
            </button>
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
            Experience peaceful Himalayan living with panoramic mountain views,
            warm hospitality, and modern comfort. Ideal for couples, families,
            and slow travelers.
          </p>
        </div>
      </div>
    </div>
  );
}
