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
      </div>

      {/* DESTINATION CARDS */}
      <h2 className="hs-section-title">Top Hill Destinations</h2>

      <div className="hs-destination-grid">
        <div className="hs-destination-card">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada"
            alt="Mussoorie"
          />
          <div className="hs-destination-overlay">
            <h3>Mussoorie</h3>
            <p>Queen of Hills</p>
          </div>
        </div>

        <div className="hs-destination-card">
          <img
            src="https://images.unsplash.com/photo-1588416499018-d8c6211b1bda"
            alt="Shimla"
          />
          <div className="hs-destination-overlay">
            <h3>Shimla</h3>
            <p>Colonial charm</p>
          </div>
        </div>

        <div className="hs-destination-card">
          <img
            src="https://images.unsplash.com/photo-1603695690376-73b1f09d5b16"
            alt="Nainital"
          />
          <div className="hs-destination-overlay">
            <h3>Nainital</h3>
            <p>Lake paradise</p>
          </div>
        </div>

        <div className="hs-destination-card">
          <img
            src="https://images.unsplash.com/photo-1616776005756-4dca36124bf2"
            alt="Uttarkashi"
          />
          <div className="hs-destination-overlay">
            <h3>Uttarkashi</h3>
            <p>Spiritual mountains</p>
          </div>
        </div>

        <div className="hs-destination-card">
          <img
            src="https://images.unsplash.com/photo-1589308078059-f3d6b63c8a9c"
            alt="Dehradun"
          />
          <div className="hs-destination-overlay">
            <h3>Dehradun</h3>
            <p>Gateway to hills</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
