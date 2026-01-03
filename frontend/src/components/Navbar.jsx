import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* LOGO */}
        <Link to="/" className="logo">
          <span className="logo-icon">▲</span>
          <span className="logo-text">The Himalayans</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="nav-links">
          {[
            { to: "/hotels", label: "Hotels" },
            { to: "/mytrips", label: "My Trips" },
            { to: "/contact", label: "Contact" },
            { to: "/login", label: "Login" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${isActive(l.to) ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}

          <Link to="/signup" className="nav-cta">
            Sign up
          </Link>
        </nav>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
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
            className="mobile-link"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
