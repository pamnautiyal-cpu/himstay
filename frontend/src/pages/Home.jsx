import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const propertyTypes = [
    { n: "Hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { n: "Apartments", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" },
    { n: "Resorts", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { n: "Villas", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const destinations = [
    { n: "Char Dham", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400" },
    { n: "Dehradun", img: "https://images.unsplash.com/photo-1589330206184-4860b6910609?w=400" },
    { n: "Haridwar", img: "https://images.unsplash.com/photo-1561361513-3d0a095003d8?w=400" },
    { n: "Nainital", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400" }
  ];

  const experiences = [
    { n: "Trekking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400" },
    { n: "Yoga & Meditation", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" },
    { n: "Hillstations", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400" },
    { n: "Spa & Wellness", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400" }
  ];

  return (
    <div>
      {/* Agoda Style Hero Search Section */}
      <section className="hero-search-box">
        <h1>See the world for less</h1>
        <div className="search-container">
           <input type="text" placeholder="Where are you going?" />
           <button onClick={() => navigate("/hotels")}>SEARCH</button>
        </div>
      </section>

      {/* Existing Sections */}
      <div className="home-wrap">
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

        <section className="home-section">
          <h2>Popular Destinations</h2>
          <div className="home-grid">
            {destinations.map((d, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={d.img} alt={d.n} />
                <h3>{d.n}</h3>
              </div>
            ))}
          </div>
        </section>

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
    </div>
  );
}