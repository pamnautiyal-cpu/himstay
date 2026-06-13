import React from "react";

export default function Contact() {
  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "40px", textAlign: "center", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <h1 style={{ color: "#0b132b", marginBottom: "20px" }}>Contact Us</h1>
      <p style={{ color: "#475569", marginBottom: "30px" }}>
        Have questions about your booking or want to partner with us? Reach out to our team.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "left", background: "#fff", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p><strong>📍 Address:</strong> Main Market, Uttarkashi, Uttarakhand, 249193</p>
        <p><strong>📞 Phone:</strong> +91 9410106470</p>
        <p><strong>✉️ Email:</strong> infothehimalayans@gmail.com</p>
        <p><strong>⏰ Working Hours:</strong> 9:00 AM - 7:00 PM</p>
      </div>
      
      <div style={{ marginTop: "30px" }}>
        <button onClick={() => window.location.href='mailto:infothehimalayans@gmail.com'} style={btnStyle}>
          Send us an Email
        </button>
      </div>
    </div>
  );
}

const btnStyle = { 
  background: "#0b132b", 
  color: "#fff", 
  padding: "12px 25px", 
  border: "none", 
  borderRadius: "6px", 
  cursor: "pointer", 
  fontSize: "16px" 
};