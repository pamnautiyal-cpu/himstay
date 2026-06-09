import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalFeature, setModalFeature] = useState("");

  const uttarakhandExperiences = [
    { name: "Trekking", desc: "Explore alpine trails", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80" },
    { name: "Yoga & Meditation", desc: "Spiritual healing centers", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80" },
    { name: "Hillstations", desc: "Escape to cold peaks", image: "https://images.unsplash.com/photo-1486873249359-2731bd6da553?w=500&q=80" },
    { name: "Spa & Wellness", desc: "Luxury mountain rejuvenation", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80" },
    { name: "River Rafting", desc: "Conquer white water rapids", image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=500&q=80" },
    { name: "Climbing Adventure", desc: "Rock scaling & mountaineering", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&q=80" }
  ];

  const handleExperienceClick = (exp) => {
    setModalFeature(exp.name);
    setShowModal(true);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#fff", minHeight: "100vh" }}>
      
      {/* 🌌 HERO BANNER */}
      <div style={{ background: "linear-gradient(180deg, #1c2541 0%, #0b132b 100%)", padding: "80px 20px", color: "#fff", textAlign: "center" }}>
        <h1>Find your next Himalayan stay</h1>
        <p style={{ color: "#94a3b8" }}>Explore premium hotels, cozy homestays, and unique experiences.</p>
      </div>

      {/* 📄 MAIN CONTENT AREA */}
      <div style={{ maxWidth: "1100px", margin: "50px auto", padding: "0 20px" }}>
        
        {/* 🏄‍♂️ TRENDING EXPERIENCES SECTION */}
        <div style={{ marginBottom: "60px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Trending Experiences</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {uttarakhandExperiences.map((exp) => (
              <div 
                key={exp.name} 
                onClick={() => handleExperienceClick(exp)}
                style={{ cursor: "pointer", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
              >
                <img src={exp.image} alt={exp.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h4 style={{ margin: "0" }}>{exp.name}</h4>
                  <p style={{ fontSize: "12px", color: "#666" }}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "1000" }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", textAlign: "center" }}>
            <h3>{modalFeature} Feature Coming Soon!</h3>
            <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}