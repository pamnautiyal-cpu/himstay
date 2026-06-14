import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ Social Icons के लिए इम्पॉर्ट्स
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");

  const uttarakhandExperiences = [/* ... आपका पुराना डेटा सुरक्षित है ... */];
  const yogaExperiences = [/* ... आपका पुराना डेटा सुरक्षित है ... */];
  const trekExperiences = [/* ... आपका पुराना डेटा सुरक्षित है ... */];
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
    // ✅ यहाँ बैकग्राउंड इमेज लगाई है
    <div className="home-container" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      
      {/* 1. PREMIUM HERO SECTION (पुराना स्ट्रक्चर) */}
      <section style={{ 
        background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(5px)", 
        padding: "80px 20px", textAlign: "center", color: "white", marginBottom: "40px"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}>Find your next escape</h1>
        {/* ... सर्च बार और बाकी इनपुट्स वैसे ही हैं ... */}
      </section>

      {/* 2. FEATURED HOMES GRID (✅ यहाँ बॉर्डर और ग्रिड दिया है) */}
      <section className="section-wrapper">
        <h2 className="section-heading">Featured Homes</h2>
        <div className="home-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {featuredHomes.map((h, i) => (
            <div key={i} className="home-card" style={{ border: "2px solid #f97316", borderRadius: "15px", padding: "10px" }} onClick={() => navigate(`/details/hotel/${h.name}`)}>
              <img src={h.img} alt={h.name} className="consistent-card-img" />
              <div className="card-info"><h3>{h.name}</h3></div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ सोशल मीडिया आइकन्स (Footer के पास) */}
      <div style={{ textAlign: "center", padding: "40px", color: "white", background: "rgba(0,0,0,0.7)" }}>
        <h3>Connect with us</h3>
        <div style={{ fontSize: "2rem", display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
          <FontAwesomeIcon icon={faFacebook} style={{ cursor: "pointer", color: "#4267B2" }} />
          <FontAwesomeIcon icon={faInstagram} style={{ cursor: "pointer", color: "#C13584" }} />
          <FontAwesomeIcon icon={faWhatsapp} style={{ cursor: "pointer", color: "#25D366" }} />
        </div>
      </div>
    </div>
  );
}