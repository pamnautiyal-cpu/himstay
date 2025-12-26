import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={styles.navbar}>
      <div style={styles.inner}>

        {/* LOGO */}
        <Link to="/" style={styles.logoBox}>
          <div style={styles.logoIcon}>🏔️</div>
          <div>
            <div style={styles.logoText}>The Himalayans</div>
            <div style={styles.logoSub}>Hills • Stays • Memories</div>
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
    background: "linear-gradient(90deg,#2563eb,#1d4ed8,#0f172a)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
    position: "sticky",
    top: 0,
    zIndex: 999,
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
    width: 46,
    height: 46,
    borderRadius: 14,
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    boxShadow: "0 6px 20px rgba(34,197,94,0.5)",
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
