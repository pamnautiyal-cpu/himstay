import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [modalInfo, setModalInfo] = useState({ show: false, title: "", message: "" });
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

  const handleListPropertyClick = (e) => {
    if (!user) {
      e.preventDefault();
      setModalInfo({
        show: true,
        title: "Authentication Required",
        message: "You need to log in or sign up first before listing your property on The Himalayans."
      });
    }
  };

  const handleMyTripsClick = (e) => {
    if (!user) {
      e.preventDefault();
      setModalInfo({
        show: true,
        title: "Authentication Required",
        message: "Please log in or sign up first to view your trips!"
      });
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
    display: "flex",
    alignItems: "center"
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
        
        {/* Left Section: Clean Home Icon + Brand Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Sirf Icon bina kisi border/box ke */}
          <Link to="/" title="Home" style={{ ...navLinkStyle, fontSize: "18px", padding: "6px" }}>
            🏠
          </Link>

          {/* Brand Logo / Name */}
          <Link to="/discover" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "800", fontSize: "22px", letterSpacing: "0.5px", display: "flex", alignItems: "center" }}>
             The Himalayans
          </Link>
        </div>

        {/* Right Section: Navigation Links & Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/hotels" style={navLinkStyle}>Hotels</Link>
          <Link to="/mytrips" onClick={handleMyTripsClick} style={navLinkStyle}>My Trips</Link>
          <Link to="/offers" style={{ ...navLinkStyle, color: "#f59e0b", fontWeight: "600" }}>Offers</Link>
          <Link to="/admin" style={navLinkStyle}>🛠️ Admin</Link>
          <Link to="/list-property" onClick={handleListPropertyClick} style={navLinkStyle}>List Property</Link>
          
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
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link to="/signup" style={{ background: "#0ea5e9", padding: "8px 20px", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "14px", boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)", transition: "0.2s", display: "flex", alignItems: "center" }}>Sign up</Link>
            </>
          )}
        </div>
      </div>

      {/* 🌟 MODERN STYLISH POPUP MODAL */}
      {modalInfo.show && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(5px)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000
        }}>
          <div style={{
            background: "#ffffff", padding: "35px 30px", borderRadius: "16px",
            textAlign: "center", maxWidth: "420px", width: "90%",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            animation: "fadeIn 0.3s ease-in-out"
          }}>
            <div style={{ fontSize: "45px", marginBottom: "15px" }}>🔒</div>
            <h3 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}>
              {modalInfo.title}
            </h3>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.5", marginBottom: "25px" }}>
              {modalInfo.message}
            </p>
            
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                onClick={() => setModalInfo({ show: false, title: "", message: "" })}
                style={{
                  flex: 1, background: "#f1f5f9", color: "#475569", border: "none",
                  padding: "12px", borderRadius: "8px", fontSize: "14px",
                  cursor: "pointer", fontWeight: "600"
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setModalInfo({ show: false, title: "", message: "" });
                  navigate("/login");
                }}
                style={{
                  flex: 1, background: "#0ea5e9", color: "#fff", border: "none",
                  padding: "12px", borderRadius: "8px", fontSize: "14px",
                  cursor: "pointer", fontWeight: "600", boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)"
                }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}