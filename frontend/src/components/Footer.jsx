import React from "react";

export default function Footer() {
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
          <p>Manage your trips</p>
          <p>Customer Service</p>
          <p>Safety resource centre</p>
        </div>

        <div>
          <h4>Discover</h4>
          <p>Seasonal deals</p>
          <p>Travel articles</p>
          <p>Trekking & Adventure</p>
          <p>Yoga retreats</p>
        </div>

        <div>
          <h4>Terms & Settings</h4>
          <p>Privacy notice</p>
          <p>Terms of service</p>
          <p>Accessibility</p>
          <p>Human rights</p>
        </div>

        <div>
          <h4>Partners</h4>
          <p>List your property</p>
          <p>Partner help</p>
          <p>Affiliate program</p>
        </div>

        <div>
          <h4>About</h4>
          <p>About The Himalayans</p>
          <p>How we work</p>
          <p>Sustainability</p>
          <p>Careers</p>
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
