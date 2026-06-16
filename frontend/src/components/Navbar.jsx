import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Firebase इम्पोर्ट
import { onAuthStateChanged, signOut } from "firebase/auth"; // Auth फंक्शन्स

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // यूजर का स्टेट ट्रैक करें
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

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
          
          <Link to="/offers" style={{ color: "#f59e0b", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            🔥 Offers
          </Link>
          
          <Link to="/admin/bookings" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "12px", border: "1px solid #475569", padding: "2px 8px", borderRadius: "4px" }}>
            Admin
          </Link>

          <Link to="/list-property" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
            📢 List Property
          </Link>
          
          <div style={{ height: "20px", width: "1px", background: "#475569" }} /> 
          
          {user ? (
            // अगर लॉगिन है तो ये दिखेगा:
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ color: "#fff", fontSize: "12px" }}>Hi, {user.email.split('@')[0]}</span>
              <button 
                onClick={handleLogout} 
                style={{ background: "#ef4444", border: "none", color: "#fff", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
              >
                Logout
              </button>
            </div>
          ) : (
            // अगर लॉगिन नहीं है तो ये दिखेगा:
            <>
              <Link to="/login" style={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}>🔐 Login</Link>
              <Link to="/signup" style={{ background: "#22c55e", padding: "8px 16px", borderRadius: "20px", color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}