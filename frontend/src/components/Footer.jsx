import React from "react";

function Footer() {
  return (
    <footer className="hs-footer">
      <div className="hs-footer-inner">

        {/* Brand */}
        <div className="hs-footer-col">
          <h3>The Himalayans</h3>
          <p>
            Handpicked Himalayan stays, Trekking , Adventure, cultural
            experiences & slow travel escapes.
          </p>
        </div>

        {/* Address */}
        <div className="hs-footer-col">
          <h4>Address</h4>
          <p>📍 Dehradun, Uttarakhand</p>
          <p>India – 248001</p>
          <p>📞 +91 9410106470</p>
          <p>✉️ infothetimalayans@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div className="hs-footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/hotels">Hotels</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
        </div>

      </div>

      <div className="hs-footer-bottom">
        © 2025 The Himalayans. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
