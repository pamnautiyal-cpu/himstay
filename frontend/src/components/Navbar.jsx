import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? { background: "#2563eb", color: "#fff" }
      : {};

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "linear-gradient(135deg,#020617,#0f172a)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
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
              borderRadius: 10,
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            🏔️
          </div>
          <strong style={{ fontSize: 18 }}>The Himalayans</strong>
        </Link>

        {/* DESKTOP LINKS */}
        <nav
          style={{
            display: "flex",
            gap: 10,
          }}
          className="desktop-nav"
        >
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
                color: "#e5e7eb",
                textDecoration: "none",
                ...isActive(l.to),
              }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            to="/register"
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
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
      {open && (
        <div
          style={{
            background: "#020617",
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
            { to: "/register", label: "Sign up" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                padding: "12px",
                borderRadius: 12,
                color: "#fff",
                background: "#020617",
                textDecoration: "none",
                fontWeight: 600,
                border: "1px solid #1e293b",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* RESPONSIVE CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
