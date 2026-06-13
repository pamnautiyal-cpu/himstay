import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "40px 20px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* ─── GRID LAYOUT ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px", marginBottom: "40px" }}>
          
          {/* Column 1: Contact/Support (Phone/Email removed) */}
          <div>
            <h4 style={columnTitleStyle}>Support</h4>
            <ul style={ulStyle}>
              <li><Link to="/contact" style={linkStyle}>Customer Service</Link></li>
              <li><Link to="/mytrips" style={linkStyle}>Manage your trips</Link></li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 style={columnTitleStyle}>Discover</h4>
            <ul style={ulStyle}>
              <li><span style={linkStyle}>Uttarakhand Tourism</span></li>
              <li><span style={linkStyle}>Trekking & Stays</span></li>
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div>
            <h4 style={columnTitleStyle}>Partners</h4>
            <ul style={ulStyle}>
              <li><Link to="/list-property" style={linkStyle}>List your property</Link></li>
              <li><span style={linkStyle}>Partner Help</span></li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h4 style={columnTitleStyle}>About The Himalayans</h4>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
              Hum Uttarakhand ke local tourism ko promote karte hain. Hamara mission mountains mein safe aur verified stays provide karna hai.
            </p>
          </div>
        </div>

        {/* ─── BOTTOM ROW ─── */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#475569" }}>
          <div>© {new Date().getFullYear()} The Himalayans · All rights reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>🇮🇳 INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const columnTitleStyle = { fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px 0" };
const ulStyle = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" };
const linkStyle = { fontSize: "13px", color: "#006ce4", textDecoration: "none", cursor: "pointer" };