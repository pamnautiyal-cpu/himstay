import { Link, useLocation } from "react-router-dom";

const navLinkStyle = (active) => ({
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 500,
  color: active ? "#0f172a" : "#e5e7eb",
  background: active ? "rgba(248, 250, 252, 0.92)" : "transparent",
});

function Navbar() {
  const location = useLocation();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(14px)",
        background: "linear-gradient(to right, #0f172aee, #020617ee)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "white",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 10,
              background:
                "radial-gradient(circle at 20% 20%, #38bdf8, #2563eb 55%, #0f172a 100%)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: 18,
            }}
          >
            The Himalayans
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: 6 }}>
          <Link
            to="/hotels"
            style={navLinkStyle(location.pathname === "/hotels")}
          >
            Hotels
          </Link>

          <Link
            to="/mytrips"
            style={navLinkStyle(location.pathname === "/mytrips")}
          >
            My Trips
          </Link>

          <Link
            to="/admin/add-hotel"
            style={navLinkStyle(location.pathname === "/admin/add-hotel")}
          >
            Admin
          </Link>

          <Link
            to="/login"
            style={navLinkStyle(location.pathname === "/login")}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={navLinkStyle(location.pathname === "/register")}
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
