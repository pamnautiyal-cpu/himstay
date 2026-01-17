import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      {/* HEADING */}
      <div className="home-header">
        <h1>Find your perfect stay 🏔️</h1>
        <p>Hotels, homestays & retreats across Uttarakhand</p>
      </div>

      {/* TOP DESTINATIONS */}
      <section className="home-section">
        <h2>Top destinations</h2>
        <div className="home-grid">
          {[
            ["Mussoorie", "Queen of Hills with cable car views", "/images/destinations/mussoorie.jpg"],
            ["Nainital", "Famous lake town in Kumaon", "/images/destinations/nainital.jpg"],
            ["Dehradun", "Gateway to Mussoorie & Himalayas", "/images/destinations/dehradun.jpg"],
            ["Haldwani", "Commercial hub of Kumaon region", "/images/destinations/haldwani.jpg"],
          ].map(([name, text, image]) => (
            <Link key={name} to={`/destination/${name.toLowerCase()}`} className="home-card">
              <img src={image} alt={name} />
              <div className="home-card-body">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CHAR DHAM */}
      <section className="home-section">
        <h2>Char Dham Yatra</h2>
        <div className="home-grid">
          {[
            ["Kedarnath", "Sacred Jyotirlinga of Lord Shiva", "/images/chardham/kedarnath.jpg"],
            ["Badrinath", "Temple of Lord Vishnu", "/images/chardham/badrinath.jpg"],
            ["Gangotri", "Origin of River Ganga", "/images/chardham/gangotri.jpg"],
            ["Yamunotri", "Source of River Yamuna", "/images/chardham/yamunotri.jpg"],
            ["Hemkund Sahib", "Holy Sikh pilgrimage site", "/images/chardham/hemkund.jpg"],
          ].map(([name, text, image]) => (
            <Link key={name} to={`/chardham/${name.toLowerCase()}`} className="home-card">
              <img src={image} alt={name} />
              <div className="home-card-body">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TREKS */}
      <section className="home-section">
        <h2>Popular treks</h2>
        <div className="home-grid">
          {[
            ["Kedarkantha Trek", "Most popular winter trek", "/treks/kedarkantha", "/images/treks/kedarkantha.jpg"],
            ["Har Ki Dun Trek", "Valley of Gods trek", "/treks/har-ki-dun", "/images/treks/har-ki-dun.jpg"],
            ["Nag Tibba Trek", "Best weekend trek", "/treks/nag-tibba", "/images/treks/nag-tibba.jpg"],
            ["Valley of Flowers", "UNESCO heritage alpine valley", "/treks/valley-of-flowers", "/images/treks/valley-of-flowers.jpg"],
          ].map(([name, text, link, image]) => (
            <Link key={name} to={link} className="home-card">
              <img src={image} alt={name} />
              <div className="home-card-body">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
