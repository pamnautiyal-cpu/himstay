import React from "react";

function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: "50px 6vw",
        background:
          "linear-gradient(135deg, #0f172a, #020617)",
        color: "#e5e7eb",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr",
          gap: 30,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* LOGO + ABOUT */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, #2563eb, #22c55e)",
              }}
            />
            <h3 style={{ margin: 0 }}>The Himalayans</h3>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#cbd5f5" }}>
            Handpicked Himalayan stays, destination weddings, cultural
            experiences & slow travel escapes.
          </p>
        </div>

        {/* ADDRESS */}
        <div>
          <h4>Address</h4>
          <p style={{ fontSize: 14, lineHeight: 1.6 }}>
            📍 Dehradun, Uttarakhand<br />
            India – 248001
          </p>
          <p style={{ fontSize: 14 }}>
            📞 +91 9XXXXXXXXX<br />
            ✉️ hello@thehimalayans.in
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: 14 }}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/hotels" style={linkStyle}>Hotels</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
            <li><a href="/login" style={linkStyle}>Login</a></li>
          </ul>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          fontSize: 13,
          color: "#94a3b8",
        }}
      >
        © {new Date().getFullYear()} The Himalayans. All rights reserved.
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#cbd5f5",
  textDecoration: "none",
  display: "block",
  marginBottom: 6,
};

export default Footer;
