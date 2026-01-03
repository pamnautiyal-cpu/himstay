import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ background: "#f8fafc" }}>

      {/* ===== HERO ===== */}
      <section className="hero">
        <img
          src="/images/destinations/mussoorie.jpg"
          alt="Himalayas"
          className="hero-img"
        />

        <div className="hero-overlay">
          <h1>Find your perfect stay 🏔️</h1>
          <p>Hotels, homestays & retreats across Uttarakhand</p>

          <div className="hero-search">
            <input placeholder="Enter destination (Mussoorie)" />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="section">
        <h2 className="section-title">Top destinations</h2>

        <div className="cards">
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, img]) => (
            <Link
              key={name}
              to={`/destination/${name.toLowerCase()}`}
              className="card"
            >
              <img src={img} alt={name} />
              <div className="card-overlay">
                <span>{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
