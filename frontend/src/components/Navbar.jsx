import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [modalInfo, setModalInfo] = useState({ show: false, title: "", message: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Firebase Authentication State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Protected Click Handler for List Property
  const handleListPropertyClick = (e) => {
    if (!user) {
      e.preventDefault();
      setModalInfo({
        show: true,
        title: "Authentication Required",
        message: "You need to log in or sign up first before listing your property on The Himalayans."
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinkStyle = {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "8px 14px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };

  return (
    <header style={{ 
      background: "rgba(15, 23, 42, 0.95)", 
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      padding: "14px 24px", 
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Brand Logo & Title */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: "none", 
            fontWeight: "800", 
            fontSize: "22px", 
            letterSpacing: "0.5px", 
            display: "flex", 
            alignItems: "center",
            gap: "10px",
            color: "#ffffff"
          }}
        >
          <div style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(14, 165, 233, 0.2))",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "8px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <svg style={{ width: "22px", height: "22px", fill: "#fbbf24" }} viewBox="0 0 24 24">
              <path d="M14 6l-3.8 5.7 1.8 2.7L14 6zm-8 8l3-4.5 2.5 3.75L9 17l-3-3zm14 3l-6-9-2.5 3.75L15 17h5z" />
            </svg>
          </div>
          <span style={{
            background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            The Himalayans
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }} className="desktop-nav-container">
          <Link to="/hotels" style={navLinkStyle}>
            🏨 Hotels
          </Link>
          
          {/* 🗺️ Explore Culture Link Added Here */}
          <Link to="/districts" style={{ ...navLinkStyle, color: "#38bdf8" }}>
            🗺️ Explore Culture
          </Link>
          
          <Link 
            to="/offers" 
            style={{ 
              ...navLinkStyle, 
              color: "#fbbf24", 
              fontWeight: "600", 
              background: "rgba(251, 191, 36, 0.1)",
              border: "1px solid rgba(251, 191, 36, 0.2)"
            }}
          >
            <span>Offers</span>
            <span style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#fbbf24",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 8px #fbbf24"
            }}></span>
          </Link>

          <Link to="/list-property" onClick={handleListPropertyClick} style={navLinkStyle}>
            🏡 List Property
          </Link>
          
          <div style={{ height: "20px", width: "1px", background: "rgba(255, 255, 255, 0.15)", margin: "0 10px" }} /> 
          
          {/* User Profile / Authentication State */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "6px 14px",
                borderRadius: "30px"
              }}>
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#0f172a",
                  fontWeight: "bold",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                </div>
                <span style={{ color: "#cbd5e1", fontSize: "13px" }}>
                  Hi, <strong style={{ color: "#ffffff", fontWeight: "600" }}>{user.email ? user.email.split('@')[0] : "User"}</strong>
                </span>
              </div>

              <button 
                onClick={handleLogout} 
                style={{ 
                  background: "rgba(239, 68, 68, 0.15)", 
                  border: "1px solid rgba(239, 68, 68, 0.3)", 
                  color: "#fca5a5", 
                  padding: "7px 16px", 
                  borderRadius: "10px", 
                  cursor: "pointer", 
                  fontWeight: "600",
                  fontSize: "13px",
                  transition: "all 0.2s ease"
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px" }}>
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link 
                to="/signup" 
                style={{ 
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)", 
                  padding: "8px 18px", 
                  borderRadius: "10px", 
                  color: "#ffffff", 
                  textDecoration: "none", 
                  fontWeight: "600", 
                  fontSize: "13px",
                  boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)"
                }}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div style={{ display: "none" }} className="mobile-toggle-btn">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              background: "rgba(255, 255, 255, 0.05)", 
              border: "1px solid rgba(255, 255, 255, 0.1)", 
              color: "#ffffff", 
              padding: "8px 12px", 
              borderRadius: "8px", 
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={{ 
          background: "#0f172a", 
          padding: "20px", 
          borderRadius: "16px", 
          marginTop: "12px", 
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex", 
          flexDirection: "column", 
          gap: "10px" 
        }}>
          {user && (
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#f59e0b",
                color: "#0f172a",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>Signed in as</p>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>{user.email}</p>
              </div>
            </div>
          )}

          <Link to="/hotels" onClick={() => setIsMobileMenuOpen(false)} style={navLinkStyle}>🏨 Hotels</Link>
          <Link to="/districts" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, color: "#38bdf8" }}>🗺️ Explore Culture</Link>
          <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, color: "#fbbf24" }}>✨ Offers</Link>
          <Link to="/list-property" onClick={(e) => { setIsMobileMenuOpen(false); handleListPropertyClick(e); }} style={navLinkStyle}>🏡 List Property</Link>
          
          <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.1)", margin: "8px 0" }} />

          {user ? (
            <button 
              onClick={handleLogout} 
              style={{ 
                background: "#ef4444", 
                color: "#ffffff", 
                padding: "10px", 
                borderRadius: "10px", 
                border: "none", 
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, flex: 1, justifyContent: "center", background: "rgba(255, 255, 255, 0.05)" }}>Login</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} style={{ background: "#0ea5e9", color: "#ffffff", padding: "10px", borderRadius: "10px", flex: 1, textAlign: "center", textDecoration: "none", fontWeight: "600" }}>Sign up</Link>
            </div>
          )}
        </div>
      )}

      {/* Authentication Required Modal */}
      {modalInfo.show && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          background: "rgba(15, 23, 42, 0.8)", 
          backdropFilter: "blur(8px)", 
          WebkitBackdropFilter: "blur(8px)",
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          zIndex: 2000,
          padding: "20px"
        }}>
          <div style={{ 
            background: "#ffffff", 
            padding: "32px", 
            borderRadius: "20px", 
            maxWidth: "380px", 
            width: "100%",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ color: "#0f172a", margin: "0 0 8px 0", fontSize: "18px", fontWeight: "700" }}>{modalInfo.title}</h3>
            <p style={{ color: "#64748b", margin: "0 0 24px 0", fontSize: "14px", lineHeight: "1.5" }}>{modalInfo.message}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => setModalInfo({ show: false, title: "", message: "" })} 
                style={{ 
                  flex: 1, 
                  padding: "10px", 
                  borderRadius: "10px", 
                  border: "1px solid #cbd5e1", 
                  background: "#f8fafc",
                  color: "#475569",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => { 
                  setModalInfo({ show: false, title: "", message: "" }); 
                  navigate("/signup", { state: { mode: "signup", isSignup: true } }); 
                }} 
                style={{ 
                  flex: 1, 
                  padding: "10px", 
                  borderRadius: "10px", 
                  background: "#0ea5e9", 
                  color: "#ffffff", 
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Go to Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}