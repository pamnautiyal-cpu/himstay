import React from "react";
import { Link } from "react-router-dom";

const destinations = [
  {
    name: "Mussoorie",
    img: "https://images.unsplash.com/photo-1586372215481-3c1c6c1f63c5",
  },
  {
    name: "Shimla",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
  {
    name: "Nainital",
    img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
  },
  {
    name: "Uttarkashi",
    img: "https://images.unsplash.com/photo-1600962815726-457c46a12681",
  },
  {
    name: "Dehradun",
    img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
  },
];

function Home() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hs-hero">
        <div>
          <span className="hs-badge">Hills · Stays · Memories</span>

          <h1 className="hs-hero-title">
            Discover stays in the <span>Himalayas</span>
          </h1>

          <p className="hs-hero-text">
            Handpicked hotels & homestays across Uttarakhand.
          </p>

          <div className="hs-hero-cta">
            <Link to="/hotels" className="hs-btn-primary">
              Book Stay
            </Link>
            <Link to="/contact" className="hs-btn-outline">
              Enquire
            </Link>
          </div>
        </div>

        <div className="hs-hero-image" />
      </section>

      {/* ===== DESTINATIONS ===== */}
      <h2 className="hs-section-title">Top Hill Destinations</h2>

      <div className="hs-destination-row">
        {destinations.map((d) => (
          <Link
            key={d.name}
            to={`/hotels?city=${encodeURIComponent(d.name)}`}
            className="hs-destination-box"
          >
            <img src={d.img} alt={d.name} loading="lazy" />
            <div className="hs-destination-label">
              <h3>{d.name}</h3>
              <span>View stays →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
