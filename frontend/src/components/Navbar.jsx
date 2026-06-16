import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth"; 

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
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <Link to="/hotels" style={{ color: "#e2e8f0", textDecoration: "none", fontSize: "14px", transition: "0.3s" }}>🏨 Hotels</Link>
          <Link to="/mytrips" style={{ color: "#e2e8f0", textDecoration: "none", fontSize: "14px", transition: "0.3s" }}>🧳 My Trips</Link>
          
          <Link to="/offers" style={{ color: "#f59e0b", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>🔥 Offers</Link>
          
          <Link to="/admin/bookings" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "12px", border: "1px solid #475569", padding: "4px 10px", borderRadius: "6px" }}>
            Admin
          </Link>

          <Link to="/list-property" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
            📢 List Property
          </Link>
          
          <div style={{ height: "24px", width: "1px", background: "#475569" }} /> 
          
          {user ? (
            /* अगर लॉगिन है तो ये दिखेगा */
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
            /* अगर लॉगिन नहीं है तो ये दिखेगा */
            <>
              <Link to="/login" style={{ color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>🔐 Login</Link>
              <Link to="/signup" style={{ background: "#22c55e", padding: "8px 20px", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "14px", transition: "0.3s" }}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}