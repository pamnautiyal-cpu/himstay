import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: "50px 6vw 30px",
        background:
          "linear-gradient(180deg, #0f172a, #020617)",
        color: "#e5e7eb",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: 40,
        }}
      >
        {/* LOGO + ABOUT */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg,#2563eb,#22c55e,#facc15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              ⛰️
            </div>
            <div
              style={{
                fontWeight: 900,
                fontSize: 18,
                color: "#fff",
              }}
            >
              The Himalayans
            </div>
          </div>

          <p
            style={{
              fontSize: 14,
              color: "#cbd5f5",
              maxWidth: 360,
              lineHeight: 1.6,
            }}
          >
            Discover handpicked hotels, homestays and
            travel experiences across the Himalayas.
            Trusted stays. Best prices. Easy booking.
          </p>
        </div>

        {/* ADDRESS */}
        <div>
          <h4
            style={{
              fontSize: 15,
              marginBottom: 12,
              color: "#fff",
            }}
          >
            Address
          </h4>
          <p style={{ fontSize: 14, lineHeight: 1.7 }}>
            The Himalayans <br />
            Mall Road, Manali <br />
            Himachal Pradesh – 175131 <br />
            India
          </p>
          <p style={{ fontSize: 14, marginTop: 10 }}>
            📞 +91 9XXXXXXXXX <br />
            ✉️ support@thehimalayans.in
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4
            style={{
              fontSize: 15,
              marginBottom: 12,
              color: "#fff",
            }}
          >
            Quick Links
          </h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 14,
            }}
          >
            <Link to="/hotels" style={{ color: "#cbd5f5" }}>
              Hotels
            </Link>
            <Link to="/contact" style={{ color: "#cbd5f5" }}>
              Contact
            </Link>
            <Link to="/login" style={{ color: "#cbd5f5" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#cbd5f5" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          fontSize: 13,
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} The Himalayans.
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
