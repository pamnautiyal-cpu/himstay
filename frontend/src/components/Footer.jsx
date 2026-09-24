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
    <footer style={{ 
      background: "#09090b", 
      borderTop: "1px solid rgba(255, 255, 255, 0.08)", 
      padding: "70px 30px 35px", 
      fontFamily: "'Inter', sans-serif", 
      color: "#d4d4d8",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Top Trust Banner */}
        <div style={{ 
          background: "linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%)", 
          border: "1px solid rgba(14, 165, 233, 0.2)", 
          borderRadius: "16px", 
          padding: "24px 30px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: "20px", 
          marginBottom: "60px",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
        }}>
          <div>
            <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: "750", color: "#38bdf8" }}>
              🏔️ Discover Uttarakhand with Confidence
            </h4>
            <p style={{ margin: 0, fontSize: "13.5px", color: "#94a3b8" }}>
              Verified mountain stays, transparent bookings, and secure administration.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["🔒 100% Secure", "💳 UPI & Cards", "🏔️ Local Experts"].map((badge, idx) => (
              <span key={idx} style={{ 
                background: "rgba(255, 255, 255, 0.05)", 
                border: "1px solid rgba(255, 255, 255, 0.1)", 
                padding: "8px 14px", 
                borderRadius: "8px", 
                fontSize: "12.5px", 
                fontWeight: "600", 
                color: "#e2e8f0" 
              }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Grid Section */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr 1fr", 
          gap: "40px", 
          marginBottom: "60px" 
        }} className="footer-grid-container">
          
          {/* Brand Info & Social Media Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
                The Himalayans
              </h2>
              <p style={{ fontSize: "13.5px", color: "#a1a1aa", margin: 0, lineHeight: "1.6" }}>
                Authentic experiences, crafted for the mountains. Explore The Himalayan Way!
              </p>
            </div>

            {/* Social Media Icons with Attached Links */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              
              {/* LinkedIn */}
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle} title="LinkedIn">
                <svg style={{ width: "15px", height: "15px", fill: "#ffffff" }} viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.34a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5z"/></svg>
              </a>

              {/* Instagram (Updated Username: the_him_alayans) */}
              <a href="https://www.instagram.com/the_him_alayans" target="_blank" rel="noopener noreferrer" style={socialIconStyle} title="Instagram">
                <svg style={{ width: "15px", height: "15px", fill: "#ffffff" }} viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
              </a>

              {/* YouTube */}
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle} title="YouTube">
                <svg style={{ width: "15px", height: "15px", fill: "#ffffff" }} viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.9 1.55-1.9 1.81-.91.24-4.66.38-7.66.38-3 0-6.75-.14-7.66-.38-1-.26-1.65-.91-1.9-1.81C4.16 15.8 4 14.19 4 12c0-2.19.16-3.8.44-4.83.25-.9.9-1.55 1.9-1.81C7.25 5.12 11 5 14 5c3 0 6.75.14 7.66.38 1 .26 1.65.91 1.9 1.81z"/></svg>
              </a>

              {/* Facebook (Updated Link: https://www.facebook.com/share/1HCguraMmB/) */}
              <a href="https://www.facebook.com/share/1HCguraMmB/" target="_blank" rel="noopener noreferrer" style={socialIconStyle} title="Facebook">
                <svg style={{ width: "15px", height: "15px", fill: "#ffffff" }} viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20v-7h-2.5v-3H12V9.5a3.5 3.5 0 0 1 3.5-3.5h2.5v3h-2a1 1 0 0 0-1 1v2h3l-.5 3h-2.5v7a10 10 0 0 0 3.5-19z"/></svg>
              </a>

              {/* X / Twitter */}
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle} title="X (Twitter)">
                <svg style={{ width: "14px", height: "14px", fill: "#ffffff" }} viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

              {/* Pinterest */}
              <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle} title="Pinterest">
                <svg style={{ width: "15px", height: "15px", fill: "#ffffff" }} viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.64 19.32c-.1-.85-.18-2.15.04-3.08.2-.88 1.32-5.59 1.32-5.59s-.34-.68-.34-1.68c0-1.57.91-2.74 2.05-2.74.97 0 1.44.73 1.44 1.6 0 .98-.62 2.44-.94 3.8-.27 1.15.58 2.08 1.72 2.08 2.07 0 3.66-2.18 3.66-5.33 0-2.79-2.01-4.74-4.88-4.74-3.32 0-5.27 2.49-5.27 5.06 0 1 .39 2.08.88 2.66.1.12.11.23.08.35l-.32 1.33c-.05.22-.17.27-.39.16-1.46-.68-2.38-2.81-2.38-4.52 0-3.68 2.67-7.07 7.71-7.07 4.05 0 7.2 2.89 7.2 6.75 0 4.03-2.54 7.28-6.07 7.28-1.18 0-2.3-.61-2.68-1.33l-.73 2.78c-.26 1.01-.97 2.28-1.45 3.05A10 10 0 1 0 12 2z"/></svg>
              </a>

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
              <li><Link to="/districts" style={linkStyle}>Uttarakhand Tourism</Link></li>
              <li><Link to="/hotels" style={linkStyle}>Trekking & Stays</Link></li>
            </ul>
          </div>

          {/* Partners & Admin */}
          <div>
            <h4 style={columnTitleStyle}>Partners & Admin</h4>
            <ul style={ulStyle}>
              <li><a href="#list" onClick={handleListPropertyClick} style={linkStyle}>List your property</a></li>
              <li><a href="#manage" onClick={handleManageListingsClick} style={linkStyle}>Manage Listings</a></li>
              <li><Link to="/admin" style={linkStyle}>Admin Access</Link></li>
              <li><Link to="/admin/bookings" style={linkStyle}>Admin Bookings</Link></li>
              <li><Link to="/contact" style={linkStyle}>Partner Help</Link></li>
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
        <div style={{ 
          borderTop: "1px solid rgba(255, 255, 255, 0.08)", 
          paddingTop: "25px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: "20px", 
          fontSize: "13px", 
          color: "#71717a" 
        }}>
          <div>© {new Date().getFullYear()} The Himalayans · All rights reserved.</div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              background: "rgba(255, 255, 255, 0.03)", 
              padding: "6px 14px", 
              borderRadius: "8px", 
              border: "1px solid rgba(255, 255, 255, 0.08)" 
            }}>
              <VisitorCounter />
            </div>
            <div style={{ 
              background: "rgba(255, 255, 255, 0.03)", 
              padding: "6px 14px", 
              borderRadius: "8px", 
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontWeight: "600", 
              color: "#e2e8f0",
              fontSize: "12.5px"
            }}>
              🇮🇳 India (INR ₹)
            </div>
          </div>
        </div>

      </div>

      {/* Responsive Grid Styling */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 30px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid-container {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </footer>
  );
}

const socialIconStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.07)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  textDecoration: "none",
  transition: "all 0.2s"
};

const columnTitleStyle = { 
  fontSize: "12px", 
  fontWeight: "750", 
  color: "#ef4444", 
  margin: "0 0 16px 0",
  textTransform: "uppercase",
  letterSpacing: "1px"
};

const ulStyle = { 
  listStyle: "none", 
  padding: 0, 
  margin: 0, 
  display: "flex", 
  flexDirection: "column", 
  gap: "12px" 
};

const linkStyle = { 
  fontSize: "13.5px", 
  color: "#a1a1aa", 
  textDecoration: "none", 
  cursor: "pointer",
  fontWeight: "450",
  transition: "color 0.2s"
};