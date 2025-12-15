import React from "react";

function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: "40px 6vw",
        background: "linear-gradient(135deg,#0f172a,#020617)",
        color: "#e5e7eb",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr",
          gap: 30,
        }}
      >
        {/* LOGO + ABOUT */}
        <div>
          <h2 style={{ color: "#fff", marginBottom: 8 }}>
            The Himalayans
          </h2>
          <p style={{ fontSize: 14, color: "#cbd5f5" }}>
            Book handpicked stays, destination weddings, cultural
            experiences & mountain escapes across the Himalayas.
          </p>
        </div>

        {/* ADDRESS */}
        <div>
          <h4 style={{ color: "#fff", marginBottom: 8 }}>Address</h4>
          <p style={{ fontSize: 14 }}>
            The Himalayans Pvt Ltd <br />
            Uttarakhand, Himachal Pradesh <br />
            India – 175131
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h4 style={{ color: "#fff", marginBottom: 8 }}>Contact</h4>
          <p style={{ fontSize: 14 }}>📧 infothehimalayans@gmail.com</p>
          <p style={{ fontSize: 14 }}>📞 +91 9410106470</p>
        </div>
      </div>

      <div
        style={{
          marginTop: 30,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 16,
          fontSize: 13,
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        © {new Date().getFullYear()} The Himalayans. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
