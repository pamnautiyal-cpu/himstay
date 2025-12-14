import { Link, useLocation } from "react-router-dom";

const linkStyle = (active) => ({
  padding: "8px 16px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 500,
  color: active ? "#0f172a" : "#334155",
  background: active ? "rgba(255,255,255,0.85)" : "transparent",
  textDecoration: "none",
  transition: "all 0.25s ease",
});

function Navbar() {
  const location = useLocation();

  return (
    <header
      style={{
        position: "sticky",
        top: 16,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 1100,
          margin: "0 16px",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 999,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.6))",
          backdropFilter: "blur(16px)",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
          border: "1px solid rgba(148,163,184,0.35)",
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
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #2563eb, #22c55e)",
              boxShadow: "0 10px 20px rgba(37,99,235,0.35)",
            }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: 0.4,
              color: "#0f172a",
            }}
          >
            The Himalayans
          </span>
        </Link>

        {/* LINKS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
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
              marginLeft: 6,
              padding: "9px 18px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              background:
                "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow:
                "0 10px 25px rgba(37,99,235,0.45)",
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
