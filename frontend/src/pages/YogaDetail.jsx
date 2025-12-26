import React from "react";
import { useParams } from "react-router-dom";

const yogaData = {
  retreat: {
    title: "Himalayan Yoga Retreat",
    desc: "Relax, rejuvenate and reconnect with nature in the Himalayas.",
  },
  meditation: {
    title: "Meditation & Pranayama",
    desc: "Guided meditation sessions with experienced gurus.",
  },
  ayurveda: {
    title: "Ayurvedic Therapy",
    desc: "Traditional Ayurvedic healing & detox programs.",
  },
};

export default function YogaDetails() {
  const { slug } = useParams();
  const yoga = yogaData[slug];

  if (!yoga) return <h2 style={{ padding: 40 }}>Program not found</h2>;

  return (
    <div style={{ maxWidth: 900, margin: "60px auto", padding: 20 }}>
      <h1>{yoga.title}</h1>
      <p style={{ marginTop: 12 }}>{yoga.desc}</p>

      <h3 style={{ marginTop: 30 }}>What’s included</h3>
      <ul>
        <li>Daily yoga sessions</li>
        <li>Healthy meals</li>
        <li>Peaceful Himalayan stay</li>
      </ul>

      <button
        style={{
          marginTop: 30,
          padding: "12px 20px",
          borderRadius: 8,
          border: "none",
          background: "#16a34a",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Enquire Now
      </button>
    </div>
  );
}
