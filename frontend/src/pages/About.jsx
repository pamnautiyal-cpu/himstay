import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#f8fafc", color: "#0f172a", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* Hero Header Banner */}
      <div style={{
        background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)",
        color: "white",
        padding: "70px 20px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "#38bdf8", display: "block", marginBottom: "10px" }}>
            About Our Journey
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "15px", letterSpacing: "-0.5px" }}>
            Redefining Himalayan Travel & Hospitality
          </h1>
          <p style={{ fontSize: "16px", color: "#cbd5e1", lineHeight: "1.6" }}>
            Your most trusted gateway to authentic mountain stays, sacred pilgrimages, and breathtaking alpine adventures across Uttarakhand.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ maxWidth: "1000px", margin: "-40px auto 0", padding: "0 20px", position: "relative" }}>
        
        {/* Mission Card */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
          marginBottom: "40px"
        }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "15px" }}>
            🏔️ Who We Are
          </h2>
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.8", marginBottom: "20px" }}>
            <strong>The Himalayans</strong> is a modern, tech-enabled travel platform built out of a profound passion for the Garhwal and Kumaon Himalayas. We bridge the gap between travelers seeking soulful mountain experiences and verified local hospitality providers. Whether you are embarking on the sacred Char Dham Yatra (Kedarnath, Badrinath, Gangotri, Yamunotri), seeking spiritual awakening at a Rishikesh yoga sanctuary, or pushing limits on snowy alpine treks, we ensure your journey is seamless, safe, and deeply memorable.
          </p>
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.8", margin: 0 }}>
            By combining a clean, high-performance digital interface with deep local roots in Uttarakhand, we empower independent homestays and boutique mountain properties while offering travelers transparent pricing and instant confirmations.
          </p>
        </div>

        {/* Core Pillars / Features Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          
          <div style={featureCardStyle}>
            <span style={{ fontSize: "32px", marginBottom: "12px", display: "block" }}>🛡️</span>
            <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>100% Verified Stays</h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
              Every property on our platform undergoes rigorous manual verification for quality, safety, and authentic local hospitality standards.
            </p>
          </div>

          <div style={featureCardStyle}>
            <span style={{ fontSize: "32px", marginBottom: "12px", display: "block" }}>⚡</span>
            <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>Seamless Bookings</h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
              Instant booking confirmations, real-time availability filters, and secure digital management for all your mountain getaways.
            </p>
          </div>

          <div style={featureCardStyle}>
            <span style={{ fontSize: "32px", marginBottom: "12px", display: "block" }}>📞</span>
            <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>24/7 Mountain Support</h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
              Our dedicated local support team is available round-the-clock to assist you with route updates, weather advisories, and on-ground help.
            </p>
          </div>

        </div>

        {/* Call to Action Box */}
        <div style={{
          background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
          borderRadius: "16px",
          padding: "40px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 10px 25px rgba(2, 132, 199, 0.25)"
        }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "10px" }}>Ready to Explore the Himalayas?</h2>
          <p style={{ fontSize: "15px", color: "#e0f2fe", marginBottom: "25px", maxWidth: "600px", margin: "0 auto 25px auto" }}>
            Discover handpicked hotels, sacred yatra packages, and unforgettable adventures today.
          </p>
          <button 
            onClick={() => navigate("/")}
            style={{
              background: "white",
              color: "#0284c7",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            Start Exploring Now
          </button>
        </div>

      </div>
    </div>
  );
}

const featureCardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "30px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
  textAlign: "left"
};