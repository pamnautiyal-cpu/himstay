import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* HERO */}
      <section className="hero-booking">
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>🏔️ Find your perfect stay</h1>
          <p>Hotels, homestays & retreats across Uttarakhand</p>

          <div className="hero-search">
            <input placeholder="📍 Enter destination (Mussoorie, Nainital…)" />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section">
        <h2>✨ Top destinations</h2>

        <div className="grid">
          {[
            ["Mussoorie", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "/images/destinations/nainital.jpg"],
            ["Dehradun", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "/images/destinations/haldwani.jpg"],
          ].map(([name, img]) => (
            <Link key={name} to={`/destination/${name.toLowerCase()}`} className="card">
              <img src={img} alt={name} />
              <div className="card-label">{name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TREKS */}
      <section className="section soft">
        <h2>🥾 Trekking & Adventure</h2>

        <div className="grid">
          {[
            ["Kedarkantha Trek", "/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "/images/treks/valley-of-flowers.jpg"],
          ].map(([name, img]) => (
            <Link key={name} to="/treks" className="card">
              <img src={img} alt={name} />
              <div className="card-label">{name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h3>💌 Save time, save money</h3>
        <p>Sign up and get the best Himalayan deals</p>

        <div className="cta-box">
          <input placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </section>

    </div>
  );
}
