import React from "react";

function Home() {
  return (
    <div className="hs-dashboard">
      {/* ===== Header ===== */}
      <div className="hs-dashboard-header">
        <div>
          <div className="hs-dashboard-subtitle">
            Hills · Stays · Memories
          </div>
          <h1 className="hs-dashboard-title">
            Book cozy stays in the Himalayas
          </h1>
          <p className="hs-dashboard-text">
            Discover handpicked hotels & homestays across Himachal,
            Uttarakhand and beyond.
          </p>
        </div>

        {/* ===== Hero Card ===== */}
        <div className="hs-hero-card">
          <div className="hs-hero-mountains">
            <div className="sun"></div>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>

            <div className="peak peak-left"></div>
            <div className="peak peak-center"></div>
            <div className="peak peak-right"></div>

            <div className="people">🧑‍🤝‍🧑</div>
          </div>

          <div className="hs-hero-content">
            <div className="hs-hero-title">Weekend in the clouds</div>
            <div className="hs-hero-text">
              Peaceful mountain stays curated for you
            </div>
          </div>
        </div>
      </div>

      {/* ===== Grid ===== */}
      <div className="hs-dashboard-grid">
        <div className="hs-card">
          <div className="hs-card-header">
            <h2>Your Trips</h2>
            <span className="hs-pill">Upcoming</span>
          </div>

          <div className="hs-empty">
            <div className="hs-empty-title">No trips booked yet</div>
            <div className="hs-empty-text">
              Start planning your Himalayan escape.
            </div>

            <button className="hs-btn-primary">
              Explore Destinations
            </button>
          </div>
        </div>

        <div className="hs-card hs-suggestions">
          <h2>Popular Destinations</h2>

          <div className="hs-tag-row">
            <span className="hs-tag">Mussoorie</span>
            <span className="hs-tag">Shimla</span>
            <span className="hs-tag">Nainital</span>
            <span className="hs-tag">Uttarkashi</span>
            <span className="hs-tag">Dehradun</span>
          </div>

          <div className="hs-checklist">
            ✅ Verified stays  
            ✅ Best prices  
            ✅ Easy booking
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
