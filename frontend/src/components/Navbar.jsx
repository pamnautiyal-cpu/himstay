import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
      query + " Uttarakhand"
    )}`;
    window.open(url, "_blank");
  };

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

        {/* 🔍 SEARCH */}
        <div style={styles.searchBox}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search stays, treks, yoga…"
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchBtn}>
            Search
          </button>
        </div>

        {/* NAV */}
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

/* ---------- STYLES ---------- */

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
    gap: 24,
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "#0f172a",
    minWidth: 220,
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
  },

  logoText: { fontSize: 18, fontWeight: 800 },
  tagline: { fontSize: 12, color: "#64748b" },

  searchBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    background: "#f8fafc",
    borderRadius: 14,
    padding: 4,
    border: "1px solid #e5e7eb",
    maxWidth: 420,
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "10px 12px",
    fontSize: 14,
  },

  searchBtn: {
    border: "none",
    borderRadius: 10,
    padding: "10px 16px",
    fontWeight: 700,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    cursor: "pointer",
  },

  nav: { display: "flex", alignItems: "center", gap: 22 },
  navLink: { textDecoration: "none", fontWeight: 600, color: "#0f172a" },
  loginLink: { textDecoration: "none", fontWeight: 600, color: "#2563eb" },
  signupBtn: {
    textDecoration: "none",
    padding: "10px 18px",
    borderRadius: 12,
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  },
};
