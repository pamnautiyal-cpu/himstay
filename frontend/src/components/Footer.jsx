import React from "react";
import { Link, useNavigate } from "react-router-dom";
import VisitorCounter from "../components/VisitorCounter";

export default function Footer() {
  const navigate = useNavigate();

  const handleListPropertyClick = (e) => {
    e.preventDefault();
    const password = prompt("Enter Admin Secret Passcode to Add Hotel:");
    if (password === "040788") {
      localStorage.setItem("is_hotel_admin", "true");
      navigate("/hotels"); 
      window.location.reload();
    } else if (password !== null) {
      alert("Incorrect Passcode!");
    }
  };

  const handleManageListingsClick = (e) => {
    e.preventDefault();
    const password = prompt("Enter Admin Secret Passcode to Manage/Delete Listings:");
    if (password === "040788") {
      localStorage.setItem("is_manage_admin", "true");
      navigate("/hotels"); 
      window.location.reload();
    } else if (password !== null) {
      alert("Incorrect Passcode!");
    }
  };

  return (
    <footer style={{ background: "#ffffff", borderTop: "1px solid #eaeeed", padding: "60px 20px 30px", fontFamily: "'Inter', sans-serif", color: "#334155" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Top Trust Banner */}
        <div style={{ background: "#f0f6ff", border: "1px solid #d1e4ff", borderRadius: "12px", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", marginBottom: "40px" }}>
          <div>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "700", color: "#006ce4" }}>🏔️ Discover Uttarakhand with Confidence</h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Verified mountain stays, transparent bookings, and secure administration.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["🔒 100% Secure", "💳 UPI & Cards", "🏔️ Local Experts"].map((badge, idx) => (
              <span key={idx} style={{ background: "#ffffff", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#475569" }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Grid Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px", marginBottom: "50px" }}>
          
          {/* Brand Info */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#006ce4", margin: "0 0 10px 0", letterSpacing: "-0.5px" }}>The Himalayans</h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 20px 0", lineHeight: "1.6" }}>Authentic experiences, crafted for the mountains.</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["🌐", "📘", "📸", "🐦"].map((icon, idx) => (
                <span key={idx} style={{ background: "#f8fafc", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0", fontSize: "13px", cursor: "pointer" }}>
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 style={columnTitleStyle}>Support</h4>
            <ul style={ulStyle}>
              <li><Link to="/contact" style={linkStyle}>Customer Service</Link></li>
              <li><Link to="/mytrips" style={linkStyle}>Manage your trips</Link></li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h4 style={columnTitleStyle}>Discover</h4>
            <ul style={ulStyle}>
              <li><span style={linkStyle}>Uttarakhand Tourism</span></li>
              <li><span style={linkStyle}>Trekking & Stays</span></li>
            </ul>
          </div>

          {/* Partners & Admin */}
          <div>
            <h4 style={columnTitleStyle}>Partners & Admin</h4>
            <ul style={ulStyle}>
              <li><a href="#" onClick={handleListPropertyClick} style={linkStyle}>List your property</a></li>
              <li><a href="#" onClick={handleManageListingsClick} style={linkStyle}>Manage Listings</a></li>
              <li><Link to="/admin" style={linkStyle}>Admin Access</Link></li>
              <li><Link to="/admin/bookings" style={linkStyle}>Admin Bookings</Link></li>
              <li><span style={linkStyle}>Partner Help</span></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 style={columnTitleStyle}>About</h4>
            <ul style={ulStyle}>
              <li><Link to="/about" style={linkStyle}>About The Himalayans</Link></li>
              <li><Link to="/terms" style={linkStyle}>Terms & Privacy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", fontSize: "13px", color: "#64748b" }}>
          <div>© {new Date().getFullYear()} The Himalayans · All rights reserved.</div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f8fafc", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <VisitorCounter />
            </div>
            <span style={{ fontWeight: "600", color: "#0f172a" }}>🇮🇳 India (INR ₹)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

const columnTitleStyle = { 
  fontSize: "14px", 
  fontWeight: "700", 
  color: "#0f172a", 
  margin: "0 0 16px 0",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
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
  color: "#006ce4", 
  textDecoration: "none", 
  cursor: "pointer",
  transition: "opacity 0.2s"
};