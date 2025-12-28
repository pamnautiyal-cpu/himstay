import React from "react";
import { Link } from "react-router-dom";

/* DESTINATIONS */
import mussoorie from "../assets/images/destinations/mussoorie.jpg";
import nainital from "../assets/images/destinations/nainital.jpg";
import dehradun from "../assets/images/destinations/dehradun.jpg";
import haldwani from "../assets/images/destinations/haldwani.jpg";

/* CHAR DHAM */
import kedarnath from "../assets/images/chardham/kedarnath.jpg";
import badrinath from "../assets/images/chardham/badrinath.jpg";
import gangotri from "../assets/images/chardham/gangotri.jpg";
import yamunotri from "../assets/images/chardham/yamunotri.jpg";
import hemkund from "../assets/images/chardham/hemkund.jpg";

/* TREKS */
import kedarkantha from "../assets/images/treks/kedarkantha.jpg";
import harKiDun from "../assets/images/treks/har-ki-dun.jpg";
import nagTibba from "../assets/images/treks/nag-tibba.jpg";
import valley from "../assets/images/treks/valley-of-flowers.jpg";
import roopkund from "../assets/images/treks/roopkund.jpg";

export default function Home() {
  const section = {
    maxWidth: 1200,
    margin: "70px auto",
    padding: "0 20px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginTop: 24,
  };

  const card = {
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 20px 45px rgba(15,23,42,.15)",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: 700,
    textAlign: "center",
  };

  const img = {
    width: "100%",
    height: 160,
    objectFit: "cover",
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: 20 }}>
        <h1 style={{ fontSize: 44, fontWeight: 900 }}>Find your next stay</h1>
        <p style={{ color: "#475569" }}>
          Hotels, treks & wellness across Uttarakhand
        </p>
      </div>

      {/* TOP DESTINATIONS */}
      <section style={section}>
        <h2>Top destinations in Uttarakhand</h2>
        <div style={grid}>
          {[["Mussoorie", mussoorie], ["Nainital", nainital], ["Dehradun", dehradun], ["Haldwani", haldwani]].map(
            ([name, image]) => (
              <div key={name} style={card}>
                <img src={image} alt={name} style={img} />
                <div style={{ padding: 16 }}>{name}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* CHAR DHAM */}
      <section style={section}>
        <h2>Char Dham Yatra Destinations</h2>
        <div style={grid}>
          {[["Kedarnath", kedarnath], ["Badrinath", badrinath], ["Gangotri", gangotri], ["Yamunotri", yamunotri], ["Hemkund Sahib", hemkund]].map(
            ([name, image]) => (
              <div key={name} style={card}>
                <img src={image} alt={name} style={img} />
                <div style={{ padding: 16 }}>{name}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* TREKKING */}
      <section style={section}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={grid}>
          <Link to="/treks/kedarkantha" style={card}>
            <img src={kedarkantha} alt="Kedarkantha" style={img} />
            <div style={{ padding: 16 }}>Kedarkantha Trek</div>
          </Link>

          <Link to="/treks/har-ki-dun" style={card}>
            <img src={harKiDun} alt="Har Ki Dun" style={img} />
            <div style={{ padding: 16 }}>Har Ki Dun Trek</div>
          </Link>

          <Link to="/treks/nag-tibba" style={card}>
            <img src={nagTibba} alt="Nag Tibba" style={img} />
            <div style={{ padding: 16 }}>Nag Tibba Trek</div>
          </Link>

          <Link to="/treks/valley-of-flowers" style={card}>
            <img src={valley} alt="Valley of Flowers" style={img} />
            <div style={{ padding: 16 }}>Valley of Flowers</div>
          </Link>

          <Link to="/treks/roopkund" style={card}>
            <img src={roopkund} alt="Roopkund" style={img} />
            <div style={{ padding: 16 }}>Roopkund Trek</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
