import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="hs-dashboard">
      {/* HERO */}
      <div className="hs-dashboard-header">
        <div>
          <div className="hs-dashboard-subtitle">
            Hills · Stays · Memories
          </div>

          <h1 className="hs-dashboard-title">
            Book cozy stays in the Himalayas
          </h1>

          <p className="hs-dashboard-text">
            Discover handpicked hotels & homestays across Himachal and
            Uttarakhand.
          </p>
        </div>

        <div className="hs-hero-card">
          <div className="hs-hero-mountains">
            <div className="sun"></div>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="peak peak-left"></div>
            <div className="peak peak-center"></div>
            <div className="peak peak-right"></div>
          </div>

          <div className="hs-hero-content">
            <div className="hs-hero-title">Weekend in the clouds</div>
            <div className="hs-hero-text">
              Peaceful mountain stays curated for you
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="hs-dashboard-grid">
        <div className="hs-card">
          <div className="hs-card-header">
            <h2>Your Trips</h2>
            <span className="hs-pill">Upcoming</span>
          </div>

          <p>No trips booked yet.</p>

          <button className="hs-btn-primary">
            Explore Destinations
          </button>
        </div>

        <div className="hs-card">
          <h2>Popular Destinations</h2>

          <div className="hs-tag-row">
            <span className="hs-tag">Mussoorie</span>
            <span className="hs-tag">Shimla</span>
            <span className="hs-tag">Nainital</span>
            <span className="hs-tag">Uttarkashi</span>
            <span className="hs-tag">Dehradun</span>
          </div>

          <p>✅ Verified stays · ✅ Best prices · ✅ Easy booking</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
