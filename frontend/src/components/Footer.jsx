import React from "react";
import { Link } from "react-router-dom";
import VisitorCounter from "../components/VisitorCounter"; // इम्पोर्ट सुरक्षित है

export default function Footer() {
  return (
    <footer style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "40px 20px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* ✅ Brand Section */}
        <div style={{ marginBottom: "40px", textAlign: "left" }}>
          <h2 style={{ fontSize: "20px", color: "#006ce4", margin: "0 0 10px 0" }}>The Himalayans</h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Authentic experiences, crafted for the mountains.</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px", marginBottom: "40px" }}>
          
          <div>
            <h4 style={columnTitleStyle}>Support</h4>
            <ul style={ulStyle}>
              <li><Link to="/contact" style={linkStyle}>Customer Service</Link></li>
              <li><Link to="/mytrips" style={linkStyle}>Manage your trips</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={columnTitleStyle}>Discover</h4>
            <ul style={ulStyle}>
              <li><span style={linkStyle}>Uttarakhand Tourism</span></li>
              <li><span style={linkStyle}>Trekking & Stays</span></li>
            </ul>
          </div>

          <div>
            <h4 style={columnTitleStyle}>Partners</h4>
            <ul style={ulStyle}>
              <li><Link to="/list-property" style={linkStyle}>List your property</Link></li>
              <li><span style={linkStyle}>Partner Help</span></li>
            </ul>
          </div>

          <div>
            <h4 style={columnTitleStyle}>About</h4>
            <ul style={ulStyle}>
              <li><Link to="/about" style={linkStyle}>About The Himalayans</Link></li>
              <li><Link to="/terms" style={linkStyle}>Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#475569" }}>
          <div>© {new Date().getFullYear()} The Himalayans · All rights reserved.</div>
          
          {/* Visitor Counter यहाँ जोड़ा गया है */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <VisitorCounter />
            <span>🇮🇳 India (INR ₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const columnTitleStyle = { fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px 0" };
const ulStyle = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" };
const linkStyle = { fontSize: "13px", color: "#006ce4", textDecoration: "none", cursor: "pointer" };