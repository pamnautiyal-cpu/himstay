import React from "react";
import { Link } from "react-router-dom";

export default function YogaDetails() {
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      {/* HERO IMAGE */}
      <div
        style={{
          height: 380,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506126613408-eca07ce68773)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "-90px auto 0", padding: 20 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 22,
            padding: 32,
            boxShadow: "0 25px 60px rgba(15,23,42,.2)",
          }}
        >
          <h1 style={{ fontSize: 34, fontWeight: 900 }}>
            Himalayan Yoga Retreat
          </h1>

          <p style={{ color: "#475569", marginBottom: 20 }}>
            📍 Rishikesh, Uttarakhand · 🧘 7 Days · ⭐ 4.9 (210 reviews)
          </p>

          {/* QUICK INFO */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 30,
            }}
          >
            <div>🧘 Daily Yoga & Meditation</div>
            <div>🌿 Ayurveda Consultation</div>
            <div>🏞️ Himalayan Nature Stay</div>
            <div>🍲 Satvik Meals Included</div>
            <div>👥 Small Groups</div>
            <div>📿 Beginner Friendly</div>
          </div>

          {/* PRICE + BOOK */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p style={{ color: "#64748b", fontSize: 14 }}>
                Package starting from
              </p>
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#16a34a",
                }}
              >
                ₹12,999
              </h2>
              <p style={{ fontSize: 13, color: "#64748b" }}>
                per person
              </p>
            </div>

            <Link to="/booking">
              <button
                style={{
                  padding: "16px 34px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(135deg,#16a34a,#22c55e)",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow:
                    "0 12px 35px rgba(34,197,94,.5)",
                }}
              >
                Book Retreat
              </button>
            </Link>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div
          style={{
            marginTop: 32,
            background: "#fff",
            borderRadius: 22,
            padding: 32,
            boxShadow: "0 18px 45px rgba(15,23,42,.15)",
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 900 }}>
            About this retreat
          </h3>

          <p style={{ color: "#475569", lineHeight: 1.8 }}>
            Reconnect with your inner self through traditional Himalayan
            yoga, guided meditation, and holistic healing practices.
            This retreat is designed to detox your body, calm your mind,
            and rejuvenate your soul.
          </p>

          <p style={{ color: "#475569", lineHeight: 1.8 }}>
            Surrounded by nature, the retreat offers a peaceful environment
            ideal for mindfulness, self-reflection, and wellness.
          </p>
        </div>
      </div>
    </div>
  );
}
