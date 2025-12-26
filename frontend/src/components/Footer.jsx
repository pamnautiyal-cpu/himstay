import React from "react";

export default function Footer() {
  const linkStyle = {
    display: "block",
    color: "#1f2937",
    textDecoration: "none",
    marginBottom: 6,
    cursor: "pointer",
  };

  return (
    <footer style={{ background: "#f8fafc", borderTop: "1px solid #e5e7eb" }}>
      
      {/* NEWSLETTER */}
      <div
        style={{
          background: "#003580",
          color: "#fff",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 700 }}>
          Save time, save money!
        </h3>
        <p style={{ opacity: 0.9 }}>
          Sign up and we'll send the best deals to you
        </p>

        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <input
            placeholder="Your email address"
            style={{
              padding: "12px 14px",
              width: 260,
              borderRadius: 6,
              border: "none",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "12px 18px",
              borderRadius: 6,
              border: "none",
              background: "#1d4ed8",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* LINKS GRID */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 24,
          fontSize: 14,
        }}
      >
        <div>
          <h4>Support</h4>
          <a href="/support" style={linkStyle}>Manage your trips</a>
          <a href="/support" style={linkStyle}>Customer Service</a>
          <a href="/support" style={linkStyle}>Safety resource centre</a>
        </div>

        <div>
          <h4>Discover</h4>
          <a href="/discover" style={linkStyle}>Seasonal deals</a>
          <a href="/discover" style={linkStyle}>Travel articles</a>
          <a href="/discover" style={linkStyle}>Trekking & Adventure</a>
          <a href="/discover" style={linkStyle}>Yoga retreats</a>
        </div>

        <div>
          <h4>Terms & Settings</h4>
          <a href="/terms" style={linkStyle}>Privacy notice</a>
          <a href="/terms" style={linkStyle}>Terms of service</a>
          <a href="/terms" style={linkStyle}>Accessibility</a>
          <a href="/terms" style={linkStyle}>Human rights</a>
        </div>

        <div>
          <h4>Partners</h4>
          <a href="/partners" style={linkStyle}>List your property</a>
          <a href="/partners" style={linkStyle}>Partner help</a>
          <a href="/partners" style={linkStyle}>Affiliate program</a>
        </div>

        <div>
          <h4>About</h4>
          <a href="/about" style={linkStyle}>About The Himalayans</a>
          <a href="/about" style={linkStyle}>How we work</a>
          <a href="/about" style={linkStyle}>Sustainability</a>
          <a href="/about" style={linkStyle}>Careers</a>
        </div>
      </div>

      {/* CURRENCY */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 14,
        }}
      >
        🇮🇳 <strong>INR</strong>
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "20px",
          textAlign: "center",
          fontSize: 13,
          color: "#475569",
        }}
      >
        <p>
          The Himalayans is part of Himalayan Travel Network.  
          © 2025 The Himalayans. All rights reserved.
        </p>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            fontWeight: 700,
          }}
        >
          <span>Booking</span>
          <span>Priceline</span>
          <span>KAYAK</span>
          <span>Agoda</span>
          <span>OpenTable</span>
        </div>
      </div>
    </footer>
  );
}
