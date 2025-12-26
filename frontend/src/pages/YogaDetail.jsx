import BookingForm from "../components/BookingForm";
import React from "react";
import { useParams } from "react-router-dom";

const yogaData = {
  retreat: {
    title: "Himalayan Yoga Retreat",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    desc:
      "A peaceful yoga retreat in the Himalayas for mind, body & soul.",
    schedule: [
      "Morning Yoga & Pranayama",
      "Healthy Satvik Meals",
      "Meditation Sessions",
      "Nature Walks",
    ],
  },

  ayurveda: {
    title: "Ayurvedic Therapy",
    image:
      "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1",
    desc:
      "Traditional Ayurvedic therapies for detox & rejuvenation.",
    schedule: [
      "Doctor Consultation",
      "Oil Therapy",
      "Steam Therapy",
      "Detox Diet",
    ],
  },
};

export default function YogaDetails() {
  const { slug } = useParams();
  const yoga = yogaData[slug];

  if (!yoga) {
    return <h2 style={{ padding: 40 }}>Program not found</h2>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "60px auto", padding: 20 }}>
      <img
        src={yoga.image}
        alt={yoga.title}
        style={{
          width: "100%",
          height: 320,
          objectFit: "cover",
          borderRadius: 24,
          marginBottom: 24,
        }}
      />

      <h1 style={{ fontSize: 34 }}>{yoga.title}</h1>
      <p style={{ marginTop: 12, color: "#475569" }}>{yoga.desc}</p>

      <h3 style={{ marginTop: 30 }}>🧘 Daily Program</h3>
      <ul>
        {yoga.schedule.map((item, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {item}
          </li>
        ))}
      </ul>

      <button
        style={{
          marginTop: 30,
          padding: "14px 24px",
          borderRadius: 10,
          border: "none",
          background: "linear-gradient(135deg,#16a34a,#15803d)",
          color: "#fff",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        Enquire Now
      <BookingForm title={yoga.title} />

    </div>
  );
}
