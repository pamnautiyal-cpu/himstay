import React from "react";

function Home() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hs-hero">
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

        {/* ✅ IMAGE MUST STAY INSIDE HERO */}
        <div className="hs-hero-right">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="Himalayas"
          />
        </div>
      </section>
    </>
  );
}

export default Home;
