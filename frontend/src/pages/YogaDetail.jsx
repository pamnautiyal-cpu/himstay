import React from "react";
import { Link } from "react-router-dom";

export default function YogaDetails() {
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      {/* HERO */}
      <div
        style={{
          height: 320,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1552058544-f2b08422138a)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div style={{ maxWidth: 1000, margin: "-60px auto 0", padding: 20 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 30,
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          }}
        >
          <h1 style={{ fontSize: 30, fontWeight: 800 }}>
            Himalayan Yoga Retreat
          </h1>

          <p style={{ color: "#475569", marginBottom: 20 }}>
            📍 Rishikesh, Uttarakhand · 🧘‍♂️ Wellness & Meditation
          </p>

          <p style={{ lineHeight: 1.7, color: "#475569" }}>
            Rejuvenate your body and mind with guided yoga, meditation,
            pranayama, and holistic healing in the peaceful Himalayas.
          </p>

          <div style={{ marginTop: 30 }}>
            <Link to="/booking">
              <button
                style={{
                  padding: "14px 28px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(34,197,94,0.5)",
                }}
              >
                Book Yoga Retreat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
