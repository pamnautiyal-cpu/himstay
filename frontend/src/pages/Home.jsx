import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");

  // आपका ओरिजिनल डेटा स्ट्रक्चर
  const uttarakhandExperiences = [
    { n: "Kedarnath", img: "/images/chardham/kedarnath.jpg" },
    { n: "Badrinath", img: "/images/chardham/badrinath.jpg" },
    { n: "Gangotri", img: "/images/chardham/gangotri.jpg" },
    { n: "Yamunotri", img: "/images/chardham/yamunotri.jpg" },
    { n: "Haridwar", img: "/images/destinations/haridwar.jpg" },
    { n: "Rishikesh", img: "/images/destinations/rishikesh.jpg" }
  ];
  const yogaExperiences = [{ n: "Ayurvedic Therapy", img: "/images/yoga/ayurvedic-therapy.jpg" }, { n: "Himalayan Yoga", img: "/images/yoga/himalayan-yoga-retreat.jpg" }, { n: "Meditation", img: "/images/yoga/meditation-pranayama.jpg" }];
  const trekExperiences = [{ n: "Kedarkantha", img: "/images/treks/kedarkantha.jpg" }, { n: "Valley of Flowers", img: "/images/treks/valley-of-flowers.jpg" }, { n: "Roopkund", img: "/images/treks/roopkund.jpg" }];
  const featuredHomes = [
    { name: "VANYA LUXURY RESORT", location: "Bangalore", price: "0,000", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
    { name: "Sliceinn Sylva", location: "Bangalore", price: "1,588", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" }
  ];

  const renderScrollSection = (title, data, category) => (
    <section className="section-wrapper">
      <h2 className="section-heading">{title}</h2>
      <div className="horizontal-scroll-container">
        {data.map((item, i) => (
          <div key={i} className="scroll-item" onClick={() => navigate(`/details/${category}/${item.n || item.name}`)}>
            <img src={item.img} alt={item.n || item.name} className="consistent-card-img" />
            <h3 style={{ marginTop: "10px", fontSize: "14px" }}>{item.n || item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <section style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1626618012640-6723444569d5?q=80&w=2000')", 
        height: "500px", backgroundSize: "cover", backgroundPosition: "center", display: "flex", 
        flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", 
        textAlign: "center", borderRadius: "20px", marginBottom: "60px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" 
      }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "20px", fontWeight: "800", textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}>Find your next escape</h1>
        <div style={{ background: "white", padding: "10px", borderRadius: "50px", display: "flex", gap: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
          <input type="text" placeholder="Where to?" style={{ padding: "15px 25px", border: "none", borderRadius: "50px", outline: "none", color: "#333" }} />
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ padding: "15px", border: "none", borderRadius: "50px", outline: "none", color: "#666" }}>
            <option value="All">All Cities</option>
            <option value="Rishikesh">Rishikesh</option>
            <option value="Uttarkashi">Uttarkashi</option>
            <option value="Haridwar">Haridwar</option>
          </select>
          <button onClick={() => navigate("/hotels")} style={{ padding: "15px 30px", background: "#006ce4", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold" }}>Search</button>
        </div>
      </section>

      <div className="home-content">
        {renderScrollSection("Uttarakhand Tourism", uttarakhandExperiences, "tourism")}
        {renderScrollSection("Yoga & Wellness", yogaExperiences, "yoga")}
        {renderScrollSection("Popular Treks", trekExperiences, "trek")}

        {/* FEATURED HOMES GRID */}
        <section className="section-wrapper">
          <h2 className="section-heading">Featured Homes</h2>
          <div className="home-grid">
            {featuredHomes.map((h, i) => (
              <div key={i} className="home-card" onClick={() => navigate(`/details/hotel/${h.name}`)}>
                <img src={h.img} alt={h.name} className="consistent-card-img" />
                <div className="card-info">
                  <h3 style={{ fontSize: "18px" }}>{h.name}</h3>
                  <p style={{ color: "#059669", fontWeight: "bold" }}>{h.price === "0,000" ? "Price on Request" : `INR ${h.price}`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST SECTION (पुराना वाला) */}
        <section className="trust-section">
           <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>Why choose The Himalayans?</h2>
        </section>

        {/* BLOG SECTION (पुराना वाला) */}
        <section style={{ backgroundColor: "#fffcf8", padding: "60px 20px", marginTop: "40px" }}>
            {/* यहाँ अपना ब्लॉग वाला कोड पेस्ट कर दें */}
        </section>

        {/* SOCIAL FOOTER (आइकन्स वाला फुटर) */}
        <div style={{ textAlign: "center", marginTop: "80px", padding: "40px", background: "rgba(0,0,0,0.8)", borderRadius: "20px", color: "white" }}>
          <h3>Connect with us</h3>
          <div style={{ fontSize: "30px", display: "flex", justifyContent: "center", gap: "25px", marginTop: "15px" }}>
            <FontAwesomeIcon icon={faFacebook} style={{ cursor: "pointer", color: "#4267B2" }} />
            <FontAwesomeIcon icon={faInstagram} style={{ cursor: "pointer", color: "#C13584" }} />
            <FontAwesomeIcon icon={faWhatsapp} style={{ cursor: "pointer", color: "#25D366" }} />
          </div>
        </div>
      </div>
    </div>
  );
}