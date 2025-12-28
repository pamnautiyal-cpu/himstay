import React from "react";
import { Link } from "react-router-dom";

export default function TrekDetails() {
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      {/* HERO IMAGE */}
      <div
        style={{
          height: 380,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1549880338-65ddcdfd017b)",
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
            Kedarkantha Trek
          </h1>

          <p style={{ color: "#475569", marginBottom: 20 }}>
            📍 Uttarkashi, Uttarakhand · ⏱️ 5 Days · ⭐ 4.8 (320 reviews)
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
            <div>🥾 Difficulty: Easy–Moderate</div>
            <div>🏔️ Altitude: 12,500 ft</div>
            <div>❄️ Best Season: Dec – Apr</div>
            <div>👥 Group Size: 10–20</div>
            <div>🍽️ Meals Included</div>
            <div>🏕️ Camping + Homestay</div>
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
                Starting from
              </p>
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#16a34a",
                }}
              >
                ₹6,999
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
                    "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow:
                    "0 12px 35px rgba(37,99,235,.5)",
                }}
              >
                Book Trek
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
            About this trek
          </h3>

          <p style={{ color: "#475569", lineHeight: 1.8 }}>
            Kedarkantha is one of the most popular Himalayan winter treks,
            known for its snow-covered trails, dense pine forests, and
            breathtaking summit views. Ideal for beginners as well as
            experienced trekkers, this trek offers a perfect mix of
            adventure and scenic beauty.
          </p>

          <p style={{ color: "#475569", lineHeight: 1.8 }}>
            The summit climb rewards you with a 360° panoramic view of
            Swargarohini, Bandarpoonch, and Black Peak.
          </p>
        </div>
      </div>
    </div>
  );
}
