import React from "react";

export default function YogaDetail() {
  const section = {
    maxWidth: 1100,
    margin: "60px auto",
    padding: "0 20px",
  };

  const hero = {
    borderRadius: 28,
    padding: "60px 40px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.7), rgba(15,23,42,0.4)), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b') center/cover",
    color: "#fff",
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 22,
    marginTop: 30,
  };

  const card = {
    background: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 16px 40px rgba(15,23,42,0.18)",
  };

  const img = {
    width: "100%",
    height: 180,
    objectFit: "cover",
  };

  const pad = { padding: 18 };

  return (
    <div style={{ background: "#f4f8ff", minHeight: "100vh" }}>
      
      {/* HERO */}
      <section style={section}>
        <div style={hero}>
          <h1 style={{ fontSize: 42, fontWeight: 900 }}>
            Himalayan Yoga & Natural Therapy
          </h1>
          <p style={{ fontSize: 18, maxWidth: 600, marginTop: 12 }}>
            Rejuvenate your body, mind & soul in the lap of the Himalayas
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section style={section}>
        <h2>About the Retreat</h2>
        <p style={{ color: "#475569", maxWidth: 800 }}>
          Our Himalayan Yoga Retreats focus on traditional yoga practices,
          meditation, pranayama, ayurveda and natural healing therapies.
          Designed for stress relief, detox and spiritual balance.
        </p>
      </section>

      {/* PROGRAMS */}
      <section style={section}>
        <h2>Yoga & Therapy Programs</h2>

        <div style={grid}>
          <div style={card}>
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
              alt="Meditation"
              style={img}
            />
            <div style={pad}>
              <h4>Meditation & Pranayama</h4>
              <p>Mindfulness, breathing & inner peace</p>
            </div>
          </div>

          <div style={card}>
            <img
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35"
              alt="Ayurveda"
              style={img}
            />
            <div style={pad}>
              <h4>Ayurvedic Therapy</h4>
              <p>Traditional healing & body balance</p>
            </div>
          </div>

          <div style={card}>
            <img
              src="https://images.unsplash.com/photo-1556228724-4a1f9b3b2b1c"
              alt="Naturopathy"
              style={img}
            />
            <div style={pad}>
              <h4>Naturopathy Healing</h4>
              <p>Natural detox & immunity boost</p>
            </div>
          </div>

          <div style={card}>
            <img
              src="https://images.unsplash.com/photo-1625631980641-9a35a6adf46a"
              alt="Panchakarma"
              style={img}
            />
            <div style={pad}>
              <h4>Panchakarma Detox</h4>
              <p>Complete mind–body purification</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={section}>
        <div
          style={{
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            padding: "40px",
            borderRadius: 24,
            textAlign: "center",
          }}
        >
          <h2>Ready to begin your wellness journey?</h2>
          <p style={{ opacity: 0.9 }}>
            Book your Himalayan Yoga Retreat today
          </p>

          <button
            style={{
              marginTop: 18,
              padding: "14px 28px",
              borderRadius: 999,
              border: "none",
              background: "#22c55e",
              color: "#022c22",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Enquire Now
          </button>
        </div>
      </section>
    </div>
  );
}
