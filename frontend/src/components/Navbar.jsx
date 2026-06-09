import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header style={{ background: "#0b132b", padding: "15px 20px", borderBottom: "1px solid #334155" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Left: Brand Name */}
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
          The Himalayans
        </Link>

        {/* Right: Menu Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link to="/hotels" style={{ color: "#fff", textDecoration: "none" }}>🏨 Hotels</Link>
          <Link to="/mytrips" style={{ color: "#fff", textDecoration: "none" }}>🧳 My Trips</Link>
          
          {/* ये रहे तुम्हारे अलग-अलग लिंक */}
          <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>✉️ Contact</Link>
          <Link to="/list-property" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: "bold" }}>📢 List your property</Link>
          
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>🔐 Login</Link>
          <Link to="/signup" style={{ background: "#22c55e", padding: "8px 16px", borderRadius: "20px", color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Sign up</Link>
        </div>
      </div>
    </header>
  );
}