import React from "react";

function Home() {
  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section className="hs-hero">
        <div>
          <span className="hs-badge">Hills · Stays · Memories</span>

          <h1 className="hs-hero-title">
            Discover stays in the <span>Himalayas</span>
          </h1>

          <p className="hs-hero-text">
            Handpicked hotels, homestays & trekking experiences across
Uttarakhand.

          </p>

          <div className="hs-hero-cta">
            <a href="/hotels" className="hs-btn-primary">Book Stay</a>
            <a href="/contact" className="hs-btn-outline">Enquire</a>
          </div>
        </div>

        <div className="hs-hero-right">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="Himalayas"
          />
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <h2 className="hs-section-title">Top Hill Destinations</h2>

      <section className="hs-destination-grid">

        {/* MUSSOORIE */}
        <div className="hs-destination-card">
          <img src="https://images.unsplash.com/photo-1586372215481-3c1c6c1f63c5" />
          <div className="hs-destination-overlay">
            <h3>Mussoorie</h3>
            <p>Explore stays & experiences</p>
          </div>
        </div>

        {/* SHIMLA */}
        <div className="hs-destination-card">
          <img src="https://images.unsplash.com/photo-1548013146-72479768bada" />
          <div className="hs-destination-overlay">
            <h3>Shimla</h3>
            <p>Explore stays & experiences</p>
          </div>
        </div>

        {/* NAINITAL */}
        <div className="hs-destination-card">
          <img src="https://images.unsplash.com/photo-1605640840605-14ac1855827b" />
          <div className="hs-destination-overlay">
            <h3>Nainital</h3>
            <p>Explore stays & experiences</p>
          </div>
        </div>

        {/* UTTARKASHI */}
        <div className="hs-destination-card">
          <img src="https://images.unsplash.com/photo-1600962815726-457c46a12681" />
          <div className="hs-destination-overlay">
            <h3>Uttarkashi</h3>
            <p>Explore stays & experiences</p>
          </div>
        </div>

        {/* DEHRADUN */}
        <div className="hs-destination-card">
          <img src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2" />
          <div className="hs-destination-overlay">
            <h3>Dehradun</h3>
            <p>Explore stays & experiences</p>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Home;
