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

  // सभी नेविगेशन लिंक्स के लिए एक जैसी कॉमन स्टाइल
  const navLinkStyle = {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "all 0.2s ease"
  };

  return (
    <header style={{ 
      background: "#0b132b", 
      padding: "15px 40px", 
      borderBottom: "1px solid #334155",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Brand Name */}
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "800", fontSize: "22px", letterSpacing: "1px" }}>
          The Himalayans
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/hotels" style={navLinkStyle}>🏨 Hotels</Link>
          <Link to="/mytrips" style={navLinkStyle}>🧳 My Trips</Link>
          <Link to="/offers" style={navLinkStyle}>🔥 Offers</Link>
          <Link to="/admin/bookings" style={navLinkStyle}>🛠️ Admin</Link>
          <Link to="/list-property" style={navLinkStyle}>📢 List Property</Link>
          
          <div style={{ height: "24px", width: "1px", background: "#475569", margin: "0 5px" }} /> 
          
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: "500" }}>Hi, {user.email.split('@')[0]}</span>
              <button 
                onClick={handleLogout} 
                style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", transition: "0.3s" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle}>🔐 Login</Link>
              <Link to="/signup" style={{ background: "#22c55e", padding: "8px 20px", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "14px", transition: "0.3s" }}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}