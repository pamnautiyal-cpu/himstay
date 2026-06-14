import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");

  const uttarakhandExperiences = [
    { n: "Kedarnath", img: "/images/chardham/kedarnath.jpg" },
    { n: "Badrinath", img: "/images/chardham/badrinath.jpg" },
    { n: "Gangotri", img: "/images/chardham/gangotri.jpg" },
    { n: "Yamunotri", img: "/images/chardham/yamunotri.jpg" }
  ];
  
  const yogaExperiences = [{ n: "Ayurvedic Therapy", img: "/images/yoga/ayurvedic-therapy.jpg" }, { n: "Himalayan Yoga", img: "/images/yoga/himalayan-yoga-retreat.jpg" }];
  const trekExperiences = [{ n: "Kedarkantha", img: "/images/treks/kedarkantha.jpg" }, { n: "Valley of Flowers", img: "/images/treks/valley-of-flowers.jpg" }];
  
  const featuredHomes = [
    { name: "VANYA LUXURY RESORT", location: "Bangalore", price: "0,000", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
    { name: "Sliceinn Sylva", location: "Bangalore", price: "1,588", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" }
  ];

  const renderScrollSection = (title, data, category) => (
    <section className="section-wrapper" style={{ margin: "40px 0" }}>
      <h2 className="section-heading">{title}</h2>
      <div className="horizontal-scroll-container">
        {data.map((item, i) => (
          <div key={i} className="scroll-item" onClick={() => navigate(`/details/${category}/${item.n}`)} style={{ border: "2px solid #eee", borderRadius: "15px", padding: "10px" }}>
            <img src={item.img} alt={item.n} className="consistent-card-img" style={{ borderRadius: "10px" }} />
            <h3 style={{ marginTop: "10px", fontSize: "14px" }}>{item.n}</h3>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600')", backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
      
      {/* 1. PREMIUM GLASS HERO SECTION */}
      <section style={{ 
        background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(12px)", 
        padding: "100px 20px", textAlign: "center", color: "white", borderRadius: "0 0 50px 50px", marginBottom: "60px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" 
      }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "30px", fontWeight: "800", textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}>Find your next escape</h1>
        <div style={{ background: "white", padding: "10px", borderRadius: "50px", display: "inline-flex", gap: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
          <input type="text" placeholder="Where to?" style={{ padding: "15px 25px", border: "none", borderRadius: "50px", outline: "none", color: "#333" }} />
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ padding: "15px", border: "none", outline: "none", color: "#666" }}>
            <option>Uttarkashi</option><option>Rishikesh</option>
          </select>
          <button onClick={() => navigate("/hotels")} style={{ padding: "15px 30px", background: "#f97316", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold" }}>Search</button>
        </div>
      </section>

      {/* 2. FEATURED HOMES (GRID STYLE) */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        {renderScrollSection("Uttarakhand Tourism", uttarakhandExperiences, "tourism")}

        <h2 className="section-heading">Featured Homes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", marginTop: "20px" }}>
          {featuredHomes.map((h, i) => (
            <div key={i} style={{ border: "4px solid #f97316", borderRadius: "20px", padding: "10px", background: "#fff", cursor: "pointer" }} onClick={() => navigate(`/details/hotel/${h.name}`)}>
              <img src={h.img} alt={h.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "15px" }} />
              <h3 style={{ padding: "10px" }}>{h.name}</h3>
            </div>
          ))}
        </div>

        {/* SOCIAL MEDIA FOOTER */}
        <div style={{ textAlign: "center", marginTop: "80px", padding: "40px", background: "rgba(0,0,0,0.8)", borderRadius: "20px", color: "white" }}>
          <h3>Connect with us</h3>
          <div style={{ fontSize: "40px", display: "flex", justifyContent: "center", gap: "30px", marginTop: "20px" }}>
            <FontAwesomeIcon icon={faFacebook} style={{ color: "#4267B2", cursor: "pointer" }} />
            <FontAwesomeIcon icon={faInstagram} style={{ color: "#C13584", cursor: "pointer" }} />
            <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#25D366", cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </div>
  );
}