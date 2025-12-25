import React from "react";

function Footer() {
  return (
    <footer className="hs-footer">
      {/* TOP SEARCH BAR */}
      <div className="hs-footer-search">
        <h3>Save time, save money!</h3>
        <p>Sign up and we'll send the best deals to you</p>

        <div className="hs-footer-search-box">
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="hs-footer-inner">
        {/* BRAND */}
        <div className="hs-footer-col">
          <h3>The Himalayans</h3>
          <p>
            Handpicked Himalayan stays, trekking, adventure & slow travel
            experiences across Uttarakhand.
          </p>

          {/* SOCIAL ICONS */}
          <div className="hs-footer-social">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>

        {/* LINKS */}
        <div className="hs-footer-col">
          <h4>Explore</h4>
          <a href="/">Home</a>
          <a href="/hotels">Hotels</a>
          <a href="/mytrips">My Trips</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="hs-footer-col">
          <h4>Account</h4>
          <a href="/login">Login</a>
          <a href="/register">Sign up</a>
          <a href="#">Help Center</a>
        </div>

        <div className="hs-footer-col">
          <h4>Contact</h4>
          <p>📍 Dehradun, Uttarakhand</p>
          <p>📞 +91 9410106470</p>
          <p>✉️ infothetimalayans@gmail.com</p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="hs-footer-bottom">
        © 2025 The Himalayans. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
