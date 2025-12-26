import React, { useState } from "react";

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };

  const isMobile = window.innerWidth < 768;

  const linkStyle = {
    display: "block",
    color: "#1f2937",
    textDecoration: "none",
    margin: "6px 0",
    fontSize: 14,
  };

  const Section = ({ title, id, children }) => (
    <div>
      <h4
        onClick={() => isMobile && toggle(id)}
        style={{
          cursor: isMobile ? "pointer" : "default",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        {isMobile && <span>{open === id ? "−" : "+"}</span>}
      </h4>

      {(!isMobile || open === id) && <div>{children}</div>}
    </div>
  );

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

        {/* ✅ WORKING EMAIL FORM */}
        <form
          action="https://formsubmit.co/infothetimalayans@gmail.com"
          method="POST"
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="infothehimalayans@gmail.com"
            style={{
              padding: "12px 14px",
              width: 260,
              borderRadius: 6,
              border: "none",
              outline: "none",
            }}
          />

          <input type="hidden" name="_subject" value="New Newsletter Signup" />
          <input type="hidden" name="_captcha" value="false" />

          <button
            type="submit"
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
        </form>
      </div>

      {/* FOOTER LINKS */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 24,
        }}
      >
        <Section title="Support" id="support">
          <a href="/support" style={linkStyle}>Manage your trips</a>
          <a href="/support" style={linkStyle}>Customer Service</a>
          <a href="/support" style={linkStyle}>Safety resource centre</a>
        </Section>

        <Section title="Discover" id="discover">
          <a href="/discover" style={linkStyle}>Seasonal deals</a>
          <a href="/discover" style={linkStyle}>Travel articles</a>
          <a href="/treks" style={linkStyle}>Trekking & Adventure</a>
          <a href="/yoga" style={linkStyle}>Yoga retreats</a>
        </Section>

        <Section title="Terms & Settings" id="terms">
          <a href="/terms" style={linkStyle}>Privacy notice</a>
          <a href="/terms" style={linkStyle}>Terms of service</a>
          <a href="/terms" style={linkStyle}>Accessibility</a>
          <a href="/terms" style={linkStyle}>Human rights</a>
        </Section>

        <Section title="About" id="about">
          <a href="/about" style={linkStyle}>About The Himalayans</a>
          <a href="/about" style={linkStyle}>How we work</a>
          <a href="/about" style={linkStyle}>Sustainability</a>
          <a href="/about" style={linkStyle}>Careers</a>
        </Section>
      </div>

      {/* CURRENCY */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 20px" }}>
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
        © 2025 The Himalayans. All rights reserved.
      </div>
    </footer>
  );
}
