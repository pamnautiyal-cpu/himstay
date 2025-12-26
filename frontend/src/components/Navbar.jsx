import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname.startsWith(path);

  const linkBase = {
    position: "relative",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.25s ease",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled
          ? "linear-gradient(135deg,#020617,#0f172a)"
          : "#020617",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 18px",
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
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(135deg,#ef4444,#b91c1c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 6px 20px rgba(239,68,68,0.6)",
            }}
          >
            🏔️
          </div>
          <strong style={{ fontSize: 18 }}>The Himalayans</strong>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 8 }}>
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
                ...linkBase,
                color: isActive(l.to) ? "#fff" : "#e5e7eb",
                background: isActive(l.to) ? "#2563eb" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* ✅ SIGN UP → ONLY /signup */}
          <Link
            to="/signup"
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(34,197,94,0.6)",
            }}
          >
            Sign up
          </Link>
        </nav>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 26,
            cursor: "pointer",
          }}
          className="hamburger"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        style={{
          maxHeight: open ? 360 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          background: "#020617",
        }}
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {[
            { to: "/hotels", label: "Hotels" },
            { to: "/mytrips", label: "My Trips" },
            { to: "/contact", label: "Contact" },
            { to: "/login", label: "Login" },
            { to: "/signup", label: "Sign up" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                padding: "12px",
                borderRadius: 12,
                background: "#020617",
                border: "1px solid #1e293b",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
