import React from "react";
import { useParams } from "react-router-dom";

const yogaData = {
  "himalayan-retreat": {
    name: "Himalayan Yoga Retreat",
    location: "Rishikesh",
    price: "₹12,999",
    image: "https://source.unsplash.com/800x600/?yoga,himalayas",
    desc: "Peaceful yoga retreat with meditation & nature healing."
  }
};

export default function YogaDetails() {
  const { slug } = useParams();
  const yoga = yogaData[slug];

  if (!yoga) {
    return <h2 style={{ padding: 40 }}>Yoga retreat not found</h2>;
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <img
        src={yoga.image}
        alt={yoga.name}
        style={{ width: "100%", height: 420, objectFit: "cover" }}
      />

      <div style={{ maxWidth: 1100, margin: "30px auto", padding: 20 }}>
        <h1>{yoga.name}</h1>
        <p>📍 {yoga.location}</p>
        <p style={{ marginTop: 20 }}>{yoga.desc}</p>

        <h3 style={{ marginTop: 20 }}>{yoga.price}</h3>

        <button
          style={{
            marginTop: 20,
            padding: "14px 20px",
            borderRadius: 12,
            border: "none",
            background: "#16a34a",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Book Retreat
        </button>
      </div>
    </div>
  );
}
