import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Har item ke liye alag image URL ka object
  const propertyTypes = [
    { n: "Hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { n: "Apartments", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" },
    { n: "Resorts", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { n: "Villas", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const experiences = [
    { n: "Trekking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400" },
    { n: "Yoga & Meditation", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" },
    { n: "Hillstations", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400" },
    { n: "Spa & Wellness", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400" }
  ];

  return (
    <div className="home-wrap">
      {/* Property Type Section */}
      <section className="home-section">
        <h2>Browse by property type</h2>
        <div className="home-grid">
          {propertyTypes.map((t, i) => (
            <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
              <img src={t.img} alt={t.n} />
              <h3>{t.n}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Experiences Section */}
      <section className="home-section">
        <h2>Trending Experiences</h2>
        <div className="home-grid">
          {experiences.map((e, i) => (
            <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
              <img src={e.img} alt={e.n} />
              <h3>{e.n}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}