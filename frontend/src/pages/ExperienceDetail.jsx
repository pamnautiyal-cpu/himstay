import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ExperienceDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.item;
  const type = location.state?.type || "Experience";

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "100px", background: "#0b132b", color: "#fff", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
        <h2>No details available.</h2>
        <button onClick={() => navigate("/")} style={{ background: "#0284c7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", marginTop: "15px", cursor: "pointer" }}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#0b132b", minHeight: "100vh", paddingBottom: "60px", fontFamily: "'Inter', sans-serif", color: "#fff" }}>
      
      {/* Top Hero Banner */}
      <div style={{ position: "relative", height: "400px", width: "100%", overflow: "hidden" }}>
        <img src={data.img} alt={data.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "1100px", padding: "0 20px" }}>
          <span style={{ background: "#0284c7", color: "#fff", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>
            ✨ {type} Preview
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: "900", margin: "12px 0", color: "#fff" }}>{data.name}</h1>
          <p style={{ fontSize: "16px", opacity: 0.9, margin: 0, color: "#94a3b8" }}>📍 {data.location || data.duration || "Uttarakhand Himalayas"}</p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "-40px auto 0 auto", padding: "0 20px", position: "relative", zIndex: 10 }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px", alignItems: "flex-start" }}>
          
          {/* Left Details Box */}
          <div style={{ background: "#111827", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", border: "1px solid #1f2937" }}>
            
            {/* Coming Soon Notice Box */}
            <div style={{ background: "rgba(2, 132, 199, 0.1)", border: "1px solid #0284c7", padding: "20px", borderRadius: "12px", marginBottom: "25px", display: "flex", gap: "15px", alignItems: "center" }}>
              <span style={{ fontSize: "30px" }}>🚧</span>
              <div>
                <h3 style={{ margin: "0 0 4px 0", color: "#38bdf8", fontSize: "18px" }}>Coming Soon with Full Itinerary!</h3>
                <p style={{ margin: 0, color: "#94a3b8", fontSize: "13px" }}>We are crafting comprehensive guided packages, professional instructors, and dates for this section.</p>
              </div>
            </div>

            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#fff", marginBottom: "12px" }}>About This Journey</h2>
            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.7", marginBottom: "25px" }}>
              {data.desc || "Experience the raw beauty of the Himalayas with certified guides, safe gear, and unforgettable scenic routes curated specially for mountain explorers."}
            </p>

            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "12px" }}>Highlights:</h3>
            <ul style={{ paddingLeft: "20px", color: "#94a3b8", fontSize: "14px", lineHeight: "1.8" }}>
              <li>Professional & certified local mountain guides.</li>
              <li>Top-quality safety equipment and medical kit support.</li>
              <li>Organic local Himalayan meals and comfortable camping/stay arrangements.</li>
              <li>Stunning photography points and peaceful environment.</li>
            </ul>

          </div>

          {/* Right Pricing & Offer Card */}
          <div style={{ background: "#111827", padding: "25px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", border: "1px solid #1f2937" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700" }}>Estimated Starting Price</span>
            <div style={{ fontSize: "28px", fontWeight: "900", color: "#fff", margin: "6px 0 16px 0" }}>
              ₹{data.price} <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "400" }}>/ person</span>
            </div>

            {/* Special Offer Box */}
            <div style={{ background: "rgba(22, 163, 74, 0.1)", border: "1px dashed #16a34a", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#4ade80" }}>🎁 Early Bird Offer</span>
              <p style={{ fontSize: "13px", color: "#86efac", margin: "4px 0" }}>Use code <b>HIMALAYA20</b> to get 20% off upon official booking launch.</p>
            </div>

            <button 
              onClick={() => alert("You'll be notified via email when bookings open!")}
              style={{ width: "100%", background: "#0284c7", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginBottom: "12px" }}
            >
              Notify Me When Live
            </button>
            <button 
              onClick={() => navigate("/")}
              style={{ width: "100%", background: "#1f2937", color: "#94a3b8", border: "none", padding: "10px", borderRadius: "10px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}
            >
              Back to Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}