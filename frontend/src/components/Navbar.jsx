import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const navLinkStyle = {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <header style={{ 
      background: "rgba(11, 19, 43, 0.98)", 
      backdropFilter: "blur(10px)",
      padding: "12px 30px", 
      borderBottom: "1px solid rgba(51, 65, 85, 0.6)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        
        {/* Brand Name */}
        <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "800", fontSize: "22px", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>🏔️</span> The Himalayans
        </Link>

        {/* Central Category Links (Char Dham, Yoga, Treks, etc.) */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <Link to="/chardham" style={navLinkStyle}>Char Dham</Link>
          <Link to="/stays" style={navLinkStyle}>Stays</Link>
          <Link to="/yoga" style={navLinkStyle}>Yoga & Wellness</Link>
          <Link to="/treks" style={navLinkStyle}>Alpine Treks</Link>
          <Link to="/cabs" style={navLinkStyle}>Transfers</Link>
          <Link to="/blogs" style={navLinkStyle}>Guides</Link>
          <Link to="/offers" style={{ ...navLinkStyle, color: "#f59e0b", fontWeight: "700" }}>🔥 Offers</Link>
        </div>

        {/* Right Side Actions (Hotels, Admin, Login/Signup) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/mytrips" style={navLinkStyle}>🧳 My Trips</Link>
          <Link to="/list-property" style={navLinkStyle}>📢 List Property</Link>
          <Link to="/admin" style={navLinkStyle}>🛠️ Admin</Link>
          
          <div style={{ height: "20px", width: "1px", background: "#475569", margin: "0 4px" }} /> 
          
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#cbd5e1", fontSize: "12px", fontWeight: "500" }}>Hi, {user.email.split('@')[0]}</span>
              <button 
                onClick={handleLogout} 
                style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", transition: "0.2s" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle}>🔐 Login</Link>
              <Link to="/signup" style={{ background: "#0ea5e9", padding: "7px 16px", borderRadius: "6px", color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "13px", boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)", transition: "0.2s" }}>Sign Up</Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}