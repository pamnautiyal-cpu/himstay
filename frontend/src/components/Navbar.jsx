import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);
  const isHome = location.pathname === "/";
  const isStaysActive = location.pathname === "/" || location.pathname === "/hotels";

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
          {/* LOGO (तुम्हारा अपना ओरिजिनल लोगो) */}
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

          {/* DESKTOP NAV (इसमें Booking.com के यूटिलिटी फीचर्स नए ऐड किए गए हैं) */}
          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            
            {/* 🆕 BOOKING STYLE UTILITIES (INR, FLAG, HELP) */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#fff", fontSize: "14px", fontWeight: "600", marginRight: "10px" }}>
              <span>INR</span>
              
              {/* Indian Flag */}
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                <img src="https://flagcdn.com/w20/in.png" alt="India Flag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Help Icon */}
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>
                ?
              </div>
            </div>

            {/* तुम्हारे ओरिजिनल लिंक्स */}
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { to: "/hotels", label: "Hotels" },
                { to: "/mytrips", label: "My Trips" },
                { to: "/contact", label: "Contact" },
                { to: "/login", label: "Login" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    color: isActive(l.to) ? "#fff" : "#e5e7eb",
                    background: isActive(l.to) ? "#2563eb" : "transparent",
                  }}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                to="/signup"
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  color: "#fff",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(34,197,94,.6)",
                }}
              >
                Sign up
              </Link>
            </div>
          </nav>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            className="hamburger"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 26,
            }}
          >
            ☰
          </button>
        </div>

        {/* 🆕 SUB-ROW: BOOKING STYLE CATEGORY LINKS */}
        <div style={{ background: "rgba(2,6,23,0.4)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "8px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", gap: "8px", overflowX: "auto", whiteSpace: "nowrap" }} className="category-scroll">
            
            <Link 
              to="/hotels"
              style={{ 
                ...categoryItemStyle, 
                border: isStaysActive ? "1px solid #fff" : "1px solid transparent",
                background: isStaysActive ? "rgba(255, 255, 255, 0.1)" : "transparent"
              }}
            >
              <span>🛏️</span> Stays
            </Link>

            <div style={categoryItemStyle}><span>✈️</span> Flights</div>
            <div style={categoryItemStyle}><span>👜</span> Flight + Hotel</div>
            <div style={categoryItemStyle}><span>🚗</span> Car rentals</div>
            <div style={categoryItemStyle}><span>🎡</span> Attractions</div>
            <div style={categoryItemStyle}><span>🚕</span> Airport taxis</div>
          </div>
        </div>
      </header>

      {/* 🔥 FADE GAP — ONLY ON HOME (तुम्हारा ओरिजिनल कोड) */}
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
          .desktop-nav { display: none; }
          .hamburger { display: block; }
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

// नया ऐड किया गया कैटेगरी स्टाइल
const categoryItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 14px",
  borderRadius: "100px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#fff",
  textDecoration: "none",
  cursor: "pointer",
  border: "1px solid transparent"
};