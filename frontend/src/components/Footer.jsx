import React from "react";

function Footer() {
  return (
    <footer className="hs-footer">
      <div className="hs-footer-inner">

        <div className="hs-footer-col">
          <h3>The Himalayans</h3>
          <p>
            Handpicked home stays, destination weddings, Trekking Adventures,
            cultural experiences & slow travel escapes.
          </p>
        </div>

        <div className="hs-footer-col">
          <h4>Address</h4>
          <p>📍 Dehradun, Uttarakhand</p>
          <p>India – 248001</p>
          <p>📞 +91 9410106470
          <p>✉️ infothehimalayans@gmail.com</p>
        </div>
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
