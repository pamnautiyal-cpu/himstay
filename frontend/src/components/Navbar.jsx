import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        ...styles.navbar,
        background: scrolled
          ? "linear-gradient(90deg,#0f172a,#020617)"
          : "linear-gradient(90deg,#2563eb,#1d4ed8,#0f172a)",
        padding: scrolled ? "8px 0" : "0",
      }}
    >
      <div style={styles.inner}>

        {/* LOGO */}
        <Link to="/" style={styles.logoBox}>
          <div
            style={{
              ...styles.logoIcon,
              transform: scrolled ? "scale(0.9)" : "scale(1)",
            }}
          >
            🏔️
          </div>
          <div>
            <div style={styles.logoText}>The Himalayans</div>
            {!scrolled && (
              <div style={styles.logoSub}>
                Hills • Stays • Memories
              </div>
            )}
          </div>
        </Link>

        {/* MENU */}
        <nav style={styles.menu}>
          <Link to="/hotels" style={styles.link}>Hotels</Link>
          <Link to="/trips" style={styles.link}>My Trips</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/login" style={styles.login}>Login</Link>
          <Link to="/signup" style={styles.signup}>Sign up</Link>
        </nav>

      </div>
    </header>
  );
}

/* ================= STYLES ================= */

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 999,
    transition: "all 0.3s ease",
    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
  },

  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "14px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "#fff",
  },

  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    boxShadow: "0 6px 20px rgba(34,197,94,0.5)",
    transition: "transform 0.3s ease",
  },

  logoText: {
    fontSize: 20,
    fontWeight: 800,
  },

  logoSub: {
    fontSize: 12,
    color: "#c7d2fe",
  },

  menu: {
    display: "flex",
    alignItems: "center",
    gap: 26,
  },

  link: {
    textDecoration: "none",
    color: "#e5e7eb",
    fontWeight: 600,
    fontSize: 15,
  },

  login: {
    textDecoration: "none",
    color: "#fde68a",
    fontWeight: 600,
  },

  signup: {
    textDecoration: "none",
    padding: "10px 18px",
    borderRadius: 14,
    background: "linear-gradient(135deg,#f97316,#ef4444)",
    color: "#fff",
    fontWeight: 700,
    boxShadow: "0 8px 22px rgba(239,68,68,0.5)",
  },
};
