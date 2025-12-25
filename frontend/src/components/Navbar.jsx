import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: scrolled
          ? "0 6px 20px rgba(0,0,0,0.08)"
          : "none",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 16px",
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
            color: "#0f172a",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#2563eb",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            ⛰️
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              The Himalayans
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              Hills • Stays • Memories
            </div>
          </div>
        </Link>

        {/* LINKS */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
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
                fontSize: 14,
                fontWeight: 600,
                color: isActive(l.to) ? "#2563eb" : "#334155",
                textDecoration: "none",
                paddingBottom: 4,
                borderBottom: isActive(l.to)
                  ? "2px solid #2563eb"
                  : "2px solid transparent",
              }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            to="/register"
            style={{
              marginLeft: 8,
              padding: "8px 16px",
              borderRadius: 8,
              background: "#2563eb",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
<div className="nav-links">
  <Link to="/hotels" className="nav-pill">Hotels</Link>
  <Link to="/mytrips" className="nav-pill">My Trips</Link>
  <Link to="/contact" className="nav-pill">Contact</Link>
  <Link to="/login" className="nav-pill ghost">Login</Link>
  <Link to="/register" className="nav-pill primary">Sign up</Link>
</div>
