import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>

        {/* LOGO */}
        <Link to="/" style={styles.logoWrap}>
          <div style={styles.logoIcon}>🏔️</div>
          <div>
            <div style={styles.logoText}>The Himalayans</div>
            <div style={styles.tagline}>Hills • Stays • Memories</div>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav style={styles.nav}>
          <Link to="/hotels" style={styles.navLink}>Hotels</Link>
          <Link to="/trips" style={styles.navLink}>My Trips</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
          <Link to="/login" style={styles.loginLink}>Login</Link>
          <Link to="/signup" style={styles.signupBtn}>Sign up</Link>
        </nav>

      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "#0f172a",
  },

  logoIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    color: "#fff",
    boxShadow: "0 10px 25px rgba(37,99,235,0.45)",
  },

  logoText: {
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 0.3,
  },

  tagline: {
    fontSize: 12,
    color: "#64748b",
    marginTop: -2,
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: 22,
  },

  navLink: {
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    color: "#0f172a",
    opacity: 0.85,
  },

  loginLink: {
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    color: "#2563eb",
  },

  signupBtn: {
    marginLeft: 6,
    textDecoration: "none",
    padding: "10px 18px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 14,
    color: "#fff",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    boxShadow: "0 12px 30px rgba(37,99,235,0.45)",
  },
};
