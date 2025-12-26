import BookingForm from "../components/BookingForm";
import React from "react";
import { useParams } from "react-router-dom";

const trekData = {
  kedarkantha: {
    title: "Kedarkantha Trek",
    image:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
    desc:
      "One of the most popular winter treks in Uttarakhand with breathtaking Himalayan views.",
    itinerary: [
      "Day 1: Dehradun → Sankri (drive)",
      "Day 2: Sankri → Juda Ka Talab",
      "Day 3: Juda Ka Talab → Kedarkantha Base",
      "Day 4: Summit → Sankri",
      "Day 5: Return to Dehradun",
    ],
  },

  nagtibba: {
    title: "Nag Tibba Trek",
    image:
      "https://images.unsplash.com/photo-1612444530583-0a9d9f0cb7f5",
    desc:
      "Perfect weekend trek near Dehradun, ideal for beginners.",
    itinerary: [
      "Day 1: Dehradun → Pantwari → Base Camp",
      "Day 2: Summit → Return",
    ],
  },
};

export default function TrekDetails() {
  const { slug } = useParams();
  const trek = trekData[slug];

  if (!trek) {
    return <h2 style={{ padding: 40 }}>Trek not found</h2>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "60px auto", padding: 20 }}>
      <img
        src={trek.image}
        alt={trek.title}
        style={{
          width: "100%",
          height: 320,
          objectFit: "cover",
          borderRadius: 24,
          marginBottom: 24,
        }}
      />

      <h1 style={{ fontSize: 34 }}>{trek.title}</h1>
      <p style={{ marginTop: 12, color: "#475569" }}>{trek.desc}</p>

      <h3 style={{ marginTop: 30 }}>📅 Itinerary</h3>
      <ul>
        {trek.itinerary.map((day, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {day}
          </li>
        ))}
      </ul>

      <button
        style={{
          marginTop: 30,
          padding: "14px 24px",
          borderRadius: 10,
          border: "none",
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "#fff",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        Book This Trek
      <BookingForm title={trek.title} />

    </div>
  );
}
