import React, { useState } from "react";

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
  const [activeImage, setActiveImage] = useState(null);

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
            Handpicked hotels, homestays & trekking experiences across Uttarakhand.
          </p>

          <div className="hs-hero-cta">
            <a href="/hotels" className="hs-btn-primary">Book Stay</a>
            <a href="/contact" className="hs-btn-outline">Enquire</a>
          </div>
        </div>

        <div className="hs-hero-image" />
      </section>

      {/* ===== DESTINATIONS ===== */}
      <h2 className="hs-section-title">Top Hill Destinations</h2>

      <section className="hs-destination-grid">
        {destinations.map((d) => (
          <div
            key={d.name}
            className="hs-destination-card"
            onClick={() => setActiveImage(d)}
          >
            <img src={d.img} alt={d.name} />
            <div className="hs-destination-overlay">
              <h3>{d.name}</h3>
              <p>Click to explore</p>
            </div>
          </div>
        ))}
      </section>

      {/* ===== IMAGE MODAL ===== */}
      {activeImage && (
        <div className="hs-lightbox" onClick={() => setActiveImage(null)}>
          <span className="hs-lightbox-close">✕</span>
          <img src={activeImage.img} alt={activeImage.name} />
          <h3>{activeImage.name}</h3>
        </div>
      )}
    </div>
  );
}

export default Home;
