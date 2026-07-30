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

  // 🛡️ FUNCTION TO BLOCK UNATHENTICATED USERS FROM CLICKING LIST PROPERTY
  const handleListPropertyClick = (e) => {
    if (!user) {
      e.preventDefault(); // पेज खुलने या नेविगेट होने से रोकेगा
      alert("Please login or sign up first to list your property!");
      navigate("/login"); // सीधे लॉगिन पेज पर भेज देगा
    }
  };

  const navLinkStyle = {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <header style={{ 
      background: "rgba(11, 19, 43, 0.95)", 
      backdropFilter: "blur(10px)",
      padding: "15px 40px", 
      borderBottom: "1px solid rgba(51, 65, 85, 0.6)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Brand Name */}
        <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "800", fontSize: "24px", letterSpacing: "0.5px" }}>
           The Himalayans
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/hotels" style={navLinkStyle}> Hotels</Link>
          <Link to="/mytrips" style={navLinkStyle}> My Trips</Link>
          <Link to="/offers" style={{ ...navLinkStyle, color: "#f59e0b", fontWeight: "600" }}> Offers</Link>
          <Link to="/admin" style={navLinkStyle}>🛠️ Admin</Link>
          
          {/* 🔒 PROTECTED LIST PROPERTY LINK */}
          <Link to="/list-property" onClick={handleListPropertyClick} style={navLinkStyle}> List Property</Link>
          
          <div style={{ height: "24px", width: "1px", background: "#475569", margin: "0 8px" }} /> 
          
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ color: "#cbd5e1", fontSize: "13px", fontWeight: "500" }}>Hi, {user.email.split('@')[0]}</span>
              <button 
                onClick={handleLogout} 
                style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "0.2s" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle}> Login</Link>
              <Link to="/signup" style={{ background: "#0ea5e9", padding: "8px 20px", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "14px", boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)", transition: "0.2s" }}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}