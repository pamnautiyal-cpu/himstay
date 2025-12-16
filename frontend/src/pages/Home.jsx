import React from "react";
import "../App.css";   // ✅ IMPORTANT: CSS LOAD HOGI

function Home() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hs-hero">
        {/* LEFT CONTENT */}
        <div>
          <span className="hs-badge">Hills · Stays · Memories</span>

          <h1 className="hs-hero-title">
            Discover stays in the <span>Himalayas</span>
          </h1>

          <p className="hs-hero-text">
            Handpicked hotels, homestays & trekking experiences across Uttarakhand.
          </p>

          <div className="hs-hero-cta">
            <a href="/hotels" className="hs-btn-primary">Book Stay</a>
            <a href="/contact" className="hs-btn-outline">Enquire</a>
          </div>
        </div>

        {/* RIGHT IMAGE (SAFE + CONTROLLED) */}
        <div className="hs-hero-image"></div>
      </section>
    </>
  );
}

export default Home;
