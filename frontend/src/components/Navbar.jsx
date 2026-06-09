import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === "/";

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background:
            "linear-gradient(180deg,#020617 0%, #020617 70%, rgba(2,6,23,0.92) 100%)",
          boxShadow: "0 12px 30px rgba(0,0,0,.45)",
        }}
      >
        {/* ─── TOP ROW: LOGO + UTILITIES (INR / FLAG / HELP) ─── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "linear-gradient(135deg,#ef4444,#b91c1c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 18px rgba(239,68,68,.6)",
              }}
            >
              🏔️
            </div>
            The Himalayans
          </Link>

          {/* RIGHT SIDE UTILITIES (Perfectly Inline Aligned) */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            
            {/* INR Text */}
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>INR</span>
            
            {/* Indian Flag */}
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
              <img src="https://flagcdn.com/w20/in.png" alt="India Flag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Help Question Circle */}
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>
              ?
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="hamburger"
              style={{
                display: "none",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 26,
                cursor: "pointer",
                padding: 0
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* ─── BOTTOM ROW: CLEAN INTERACTIVE LINKS ROW (Perfectly Boxed Alignment) ─── */}
        <div style={{ background: "rgba(2,6,23,0.4)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "10px 0" }}>
          <div 
            style={{ 
              maxWidth: 1200, 
              margin: "0 auto", 
              padding: "0 20px", 
              display: "flex", 
              alignItems: "center",
              gap: "8px", 
              overflowX: "auto", 
              whiteSpace: "nowrap" 
            }} 
            className="category-scroll desktop-nav"
          >
            {/* तुम्हारे माँगे हुए लिंक्स का नया अरेंजमेंट */}
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
                  background: isActive(l.to) ? "rgba(255, 255, 255, 0.1)" : "transparent",
                }}
              >
                {l.label}
              </Link>
            ))}

            {/* List your property Link */}
            <Link 
              to="/contact" 
              style={{ 
                ...linkItemStyle, 
                border: isActive("/contact") ? "1px solid #fff" : "1px solid transparent",
                color: "#38bdf8", // थोड़ा अलग स्काई ब्लू शेड ताकि ध्यान आकर्षित हो
                fontWeight: "600"
              }}
            >
              📢 List your property
            </Link>

            {/* Sign up Button (End Alignment Row) */}
            <Link
              to="/signup"
              style={{
                padding: "6px 16px",
                borderRadius: 100,
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(34,197,94,.3)",
                marginLeft: "auto" // इसे रो के एकदम आखिर में धकेलता है
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* 🔥 FADE GAP — ONLY ON HOME */}
      {isHome && (
        <div
          style={{
            height: 34,
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.35), rgba(248,250,252,1))",
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: flex; flex-wrap: nowrap; }
          .hamburger { display: block !important; }
        }
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
        .category-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

// लिंक्स के लिए क्लीन कॉमन स्टाइल स्ट्रक्चर
const linkItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 16px",
  borderRadius: "100px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#e5e7eb",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.15s ease"
};