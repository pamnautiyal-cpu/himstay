import React from "react";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontSize: "3rem", color: "#0f172a", marginBottom: "15px" }}>🚧 Coming Soon!</h1>
      <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: "30px" }}>
        We are crafting comprehensive guides and details for this section. Stay tuned!
      </p>
      <button 
        onClick={() => navigate("/")}
        style={{ background: "#0284c7", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
      >
        Back to Home
      </button>
    </div>
  );
}