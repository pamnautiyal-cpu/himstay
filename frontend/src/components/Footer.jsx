import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "40px 20px 20px", fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* ─── 5-COLUMN GRID LAYOUT (HUBAHU SCREENSHOT JAISA) ─── */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
          gap: "30px",
          marginBottom: "40px"
        }}>
          
          {/* Column 1: Support */}
          <div>
            <h4 style={columnTitleStyle}>Support</h4>
            <ul style={ulStyle}>
              <li><Link to="/contact" style={linkStyle}>Customer Service</Link></li>
              <li><Link to="/mytrips" style={linkStyle}>Manage your trips</Link></li>
              <li><span style={linkStyle}>Safety Resource Center</span></li>
              <li><span style={linkStyle}>Legal Info</span></li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 style={columnTitleStyle}>Discover</h4>
            <ul style={ulStyle}>
              <li><span style={linkStyle}>Genius loyalty program</span></li>
              <li><span style={linkStyle}>Seasonal & holiday deals</span></li>
              <li><span style={linkStyle}>Travel stories</span></li>
              <li><span style={linkStyle}>Trekking & Yoga</span></li>
              <li><span style={linkStyle}>Cruises</span></li>
            </ul>
          </div>

          {/* Column 3: Terms and settings */}
          <div>
            <h4 style={columnTitleStyle}>Terms and settings</h4>
            <ul style={ulStyle}>
              <li><span style={linkStyle}>Privacy Notice</span></li>
              <li><span style={linkStyle}>Terms of Service</span></li>
              <li><span style={linkStyle}>Accessibility Statement</span></li>
              <li><span style={linkStyle}>Grievance officer</span></li>
              <li><span style={linkStyle}>Cookie Consent</span></li>
            </ul>
          </div>

          {/* Column 4: Partners */}
          <div>
            <h4 style={columnTitleStyle}>Partners</h4>
            <ul style={ulStyle}>
              <li><span style={linkStyle}>Extranet login</span></li>
              <li><span style={linkStyle}>Partner help</span></li>
              <li><Link to="/contact" style={linkStyle}>List your property</Link></li>
              <li><span style={linkStyle}>Become an affiliate</span></li>
            </ul>
          </div>

          {/* Column 5: About */}
          <div>
            <h4 style={columnTitleStyle}>About</h4>
            <ul style={ulStyle}>
              <li><span style={linkStyle}>About The Himalayans</span></li>
              <li><span style={linkStyle}>Sustainability</span></li>
              <li><span style={linkStyle}>Careers</span></li>
              <li><span style={linkStyle}>Press center</span></li>
              <li><span style={linkStyle}>Investor relations</span></li>
            </ul>
          </div>

        </div>

        {/* ─── BOTTOM ROW: COPYRIGHT & CURRENCY DATA ─── */}
        <div style={{ 
          borderTop: "1px solid #e2e8f0", 
          paddingTop: "20px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "13px",
          color: "#475569"
        }}>
          <div>
            © 2026 The Himalayans · All rights reserved.
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontWeight: "600" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="https://flagcdn.com/w20/in.png" alt="India Flag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span>INR (₹)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

// 🧰 STYLE OBJECTS FOR CLEAN CODE
const columnTitleStyle = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 16px 0"
};

const ulStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const linkStyle = {
  fontSize: "13px",
  color: "#006ce4", // Booking.com का सिग्नेचर लिंक कलर
  textDecoration: "none",
  cursor: "pointer",
  transition: "color 0.1s ease"
};