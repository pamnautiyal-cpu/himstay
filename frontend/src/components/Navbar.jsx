import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", 
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* ─── TOP ROW: UTILITIES (बिना लोगो के) ─── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "20px" }}>
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>INR</span>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="https://flagcdn.com/w20/in.png" alt="India Flag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>
              ?
            </div>
        </div>

        {/* ─── BOTTOM ROW: CLEAN MENU LINKS ─── */}
        <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 0" }}>
          <div 
            style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", whiteSpace: "nowrap" }} 
            className="category-scroll desktop-nav"
          >
            {[
              { to: "/hotels", label: "🏨 Hotels" },
              { to: "/mytrips", label: "🧳 My Trips" },
              { to: "/contact", label: "✉️ Contact" },
              { to: "/login", label: "🔐 Login" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  ...linkItemStyle,
                  border: isActive(l.to) ? "1px solid #fff" : "1px solid transparent",
                  background: isActive(l.to) ? "rgba(255, 255, 255, 0.12)" : "transparent",
                }}
              >
                {l.label}
              </Link>
            ))}

            <Link to="/contact" style={{ ...linkItemStyle, border: isActive("/contact") ? "1px solid #fff" : "1px solid transparent", color: "#38bdf8", fontWeight: "600" }}>
              📢 List your property
            </Link>

            <Link to="/signup" style={{ padding: "7px 18px", borderRadius: 100, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontWeight: 700, fontSize: "13px", textDecoration: "none", boxShadow: "0 4px 12px rgba(34,197,94,.2)", marginLeft: "auto" }}>
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <style>{`
        .category-scroll::-webkit-scrollbar { display: none; }
        .category-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}

const linkItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 16px",
  borderRadius: "100px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#f1f5f9",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.1s ease"
};