import React from "react";
import { useNavigate } from "react-router-dom"; // <--- YE LINE SABSE ZARURI HAI

export default function Home() {
  const navigate = useNavigate();

  const uttarakhandExperiences = [
    { n: "Kedarnath", img: "https://images.unsplash.com/photo-1626078239088-75701c901e69?w=600" },
    { n: "Badrinath", img: "https://images.unsplash.com/photo-1605540306126-70e4e6b18c64?w=600" },
    { n: "Gangotri", img: "https://images.unsplash.com/photo-1672393375831-29e87515f426?w=600" },
    { n: "Yamunotri", img: "https://images.unsplash.com/photo-1672393374880-994191c95195?w=600" },
    { n: "Haridwar", img: "https://images.unsplash.com/photo-1596701780211-137267123963?w=600" },
    { n: "Rishikesh", img: "https://images.unsplash.com/photo-1596701780183-f66099511674?w=600" }
  ];

  const featuredHomes = [
    { name: "VANYA LUXURY RESORT", location: "Bangalore", price: "5,000", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Sliceinn Sylva", location: "Bangalore", price: "1,588", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>See the world for less</h1>
        <button className="search-btn" onClick={() => navigate("/hotels")}>SEARCH STAYS</button>
      </section>

      <div className="home-content">
        <section className="section">
          <h2>Uttarakhand Tourism</h2>
          <div className="horizontal-scroll-container">
            {uttarakhandExperiences.map((ex, i) => (
              <div key={i} className="scroll-item" onClick={() => navigate("/hotels")}>
                <img src={ex.img} alt={ex.n} />
                <h3>{ex.n}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Featured homes</h2>
          <div className="home-grid">
            {featuredHomes.map((h, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={h.img} alt={h.name} />
                <div className="card-info" style={{padding: "10px"}}>
                  <h3>{h.name}</h3>
                  <p>INR {h.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}