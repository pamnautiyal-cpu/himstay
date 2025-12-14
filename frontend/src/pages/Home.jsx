import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="hs-dashboard">
      {/* HERO */}
      <section className="hs-hero">
        <div className="hs-hero-left">
          <span className="hs-badge">Trusted Mountain Stays</span>

          <h1 className="hs-hero-title">
            Discover <span>Premium Stays</span><br />
            in the Himalayas
          </h1>

          <p className="hs-hero-text">
            Handpicked hotels, homestays & destination experiences across
            Himachal and Uttarakhand.
          </p>

          <div className="hs-hero-cta">
            <a href="/hotels" className="hs-btn-primary">
              Book Stay
            </a>
            <a href="/contact" className="hs-btn-outline">
              Enquire
            </a>
          </div>
        </div>

        <div className="hs-hero-right">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="Himalayas"
          />
        </div>
      </section>

      {/* DESTINATIONS */}
      <h2 className="hs-section-title">Top Hill Destinations</h2>

      <div className="hs-destination-grid">
        {[
          "Mussoorie",
          "Shimla",
          "Nainital",
          "Uttarkashi",
          "Dehradun",
        ].map((city) => (
          <div className="hs-destination-card" key={city}>
            <img
              src={`https://source.unsplash.com/600x600/?${city},mountains`}
              alt={city}
            />
            <div className="hs-destination-overlay">
              <h3>{city}</h3>
              <p>Explore stays & experiences</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
