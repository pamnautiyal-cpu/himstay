import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "linear-gradient(180deg,#020617 0%, #020617 70%, rgba(2,6,23,0.92) 100%)",
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

          {/* DESKTOP NAV */}
          <nav className="desktop-nav" style={{ display: "flex", gap: 6 }}>
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
      </header>

      {/* WHITE FADE GAP (IMAGE MATCH) */}
      <div
        style={{
          height: 34,
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.35), rgba(248,250,252,1))",
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .hamburger { display: block; }
        }
      `}</style>
    </>
  );
}
