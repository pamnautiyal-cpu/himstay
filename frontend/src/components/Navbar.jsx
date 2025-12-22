import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const linkStyle = (active) => ({
  padding: "8px 16px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 600,
  color: active ? "#0f172a" : "#334155",
  background: active ? "rgba(255,255,255,0.9)" : "transparent",
  textDecoration: "none",
  transition: "all 0.25s ease",
});

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // 🔥 SCROLL EFFECT
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
        position: "sticky",
        top: scrolled ? 6 : 16,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        transition: "all 0.3s ease",
      }}
    >
      <nav
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 1200,
          margin: "0 16px",
          padding: scrolled ? "8px 18px" : "12px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 999,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75))",
          backdropFilter: "blur(18px)",
          boxShadow: scrolled
            ? "0 18px 40px rgba(15,23,42,0.25)"
            : "0 25px 60px rgba(15,23,42,0.18)",
          border: "1px solid rgba(148,163,184,0.35)",
          transition: "all 0.3s ease",
        }}
      >
        {/* ===== LOGO ===== */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: scrolled ? 40 : 46,
              height: scrolled ? 40 : 46,
              borderRadius: 14,
              background:
                "linear-gradient(135deg,#2563eb,#22c55e,#facc15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "white",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              transition: "all 0.3s ease",
            }}
          >
            ⛰️
          </div>

          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: scrolled ? 16 : 18,
                color: "#0f172a",
                lineHeight: 1.1,
                transition: "all 0.3s ease",
              }}
            >
              The Himalayans
            </div>
            {!scrolled && (
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 1,
                  color: "#64748b",
                }}
              >
                Hills • Stays • Memories • Adventures

              </div>
            )}
          </div>
        </Link>

        {/* ===== LINKS ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            to="/hotels"
            style={linkStyle(location.pathname === "/hotels")}
          >
            Hotels
          </Link>

          <Link
            to="/mytrips"
            style={linkStyle(location.pathname === "/mytrips")}
          >
            My Trips
          </Link>

          <Link
            to="/contact"
            style={linkStyle(location.pathname === "/contact")}
          >
            Contact
          </Link>

          <Link
            to="/login"
            style={linkStyle(location.pathname === "/login")}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              marginLeft: 8,
              padding: "10px 20px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              textDecoration: "none",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              boxShadow: "0 12px 30px rgba(37,99,235,0.45)",
            }}
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
