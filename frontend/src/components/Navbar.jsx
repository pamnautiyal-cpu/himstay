import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={{ background: "#0b132b", padding: "15px 20px", borderBottom: "1px solid #334155" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Brand Name */}
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
          The Himalayans
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <Link to="/hotels" style={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}>🏨 Hotels</Link>
          <Link to="/mytrips" style={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}>🧳 My Trips</Link>
          
          {/* New Professional Button: Offers/Deals */}
          <Link to="/offers" style={{ color: "#f59e0b", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            🔥 Offers
          </Link>
          
          <Link to="/admin/bookings" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "12px", border: "1px solid #475569", padding: "2px 8px", borderRadius: "4px" }}>
            Admin
          </Link>

          <Link to="/list-property" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
            📢 List Property
          </Link>
          
          <div style={{ height: "20px", width: "1px", background: "#475569" }} /> {/* Divider */}
          
          <Link to="/login" style={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}>🔐 Login</Link>
          <Link to="/signup" style={{ background: "#22c55e", padding: "8px 16px", borderRadius: "20px", color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>Sign up</Link>
        </div>
      </div>
    </header>
  );
}