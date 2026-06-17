import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(data);
      } catch (error) {
        console.error("Firebase Fetch Error:", error);
      }
    };
    fetchListings();
  }, []);

  const uttarakhandExperiences = [
    { n: "Kedarnath", img: "/images/chardham/kedarnath.jpg" },
    { n: "Badrinath", img: "/images/badrinath.jpg" },
    { n: "Gangotri", img: "/images/gangotri.jpg" },
    { n: "Yamunotri", img: "/images/yamunotri.jpg" },
    { n: "Haridwar", img: "/images/haridwar.jpg" },
    { n: "Rishikesh", img: "/images/rishikesh.jpg" }
  ];
  const yogaExperiences = [{ n: "Ayurvedic Therapy", img: "/images/yoga/ayurvedic-therapy.jpg" }, { n: "Himalayan Yoga", img: "/images/yoga/himalayan-yoga-retreat.jpg" }, { n: "Meditation", img: "/images/yoga/meditation-pranayama.jpg" }];
  const trekExperiences = [{ n: "Kedarkantha", img: "/images/treks/kedarkantha.jpg" }, { n: "Valley of Flowers", img: "/images/treks/valley-of-flowers.jpg" }, { n: "Roopkund", img: "/images/treks/roopkund.jpg" }];

  const renderScrollSection = (title, data, category) => (
    <section className="section-wrapper">
      <h2 className="section-title">{title}</h2>
      <div className="horizontal-scroll-container">
        {data.map((item, i) => (
          <div key={i} className="scroll-item" onClick={() => {
              if (["tourism", "yoga", "trek"].includes(category)) {
                window.open(`https://www.google.com/search?q=${item.n || item.name}`, "_blank");
              } else {
                navigate(`/details/${category}/${item.n || item.name}`);
              }
            }}>
            <img src={item.img} alt={item.n || item.name} className="consistent-card-img" />
            <h3 style={{ marginTop: "10px", fontSize: "14px" }}>{item.n || item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="home-container">
      {/* 1. Tripadvisor स्टाइल सर्च बार */}
      <section className="hero-search" style={{ margin: "40px 0", textAlign: "center" }}>
        <h1>Where to?</h1>
        <div style={{ background: "rgba(255, 255, 255, 0.95)", padding: "10px", borderRadius: "50px", display: "inline-flex", gap: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid #ddd" }}>
          <input type="text" placeholder="Search hotels, stays, or treks..." style={{ padding: "15px 25px", border: "none", borderRadius: "50px", outline: "none" }} />
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ padding: "15px", border: "none", borderRadius: "50px", outline: "none" }}>
            <option value="All">All Cities</option>
            <option value="Rishikesh">Rishikesh</option>
            <option value="Uttarkashi">Uttarkashi</option>
          </select>
          <button onClick={() => navigate("/hotels")} style={{ padding: "15px 30px", background: "#006ce4", color: "white", border: "none", borderRadius: "50px", cursor: "pointer" }}>Search</button>
        </div>
      </section>

      {/* 2. Featured Properties (Tripadvisor स्टाइल Grid) */}
      <section className="section-wrapper">
        <h2 className="section-title">Featured Properties</h2>
        <div className="stays-grid">
          {listings.map((h) => (
            <div key={h.id} className="tripadvisor-card" onClick={() => navigate(`/details/${h.type}/${h.id}`)}>
              <img src={h.image} alt={h.name} className="card-img" />
              <div className="card-body">
                <h3>{h.name}</h3>
                <p style={{ color: "#64748b", fontSize: "14px" }}>{h.location}</p>
                <p className="price-tag">From ₹{h.price || "---"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. पुराने स्क्रॉल सेक्शन्स */}
      {renderScrollSection("Uttarakhand Tourism", uttarakhandExperiences, "tourism")}
      {renderScrollSection("Yoga & Wellness", yogaExperiences, "yoga")}
      {renderScrollSection("Popular Treks", trekExperiences, "trek")}

      {/* 4. ट्रस्ट और ब्लॉग सेक्शन */}
      <section className="trust-section">
        <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>Why choose The Himalayans?</h2>
        <div className="trust-grid">
          <div className="trust-card"><h2>100+</h2><h3>Verified Stays</h3></div>
          <div className="trust-card"><h2>10k+</h2><h3>Happy Travelers</h3></div>
        </div>
      </section>

      {/* ब्लॉग फीड */}
      <section style={{ padding: "60px 20px" }}>
        <h2 className="section-title">Stories for your inspiration</h2>
        <div className="home-grid">
          {[
            { title: "12 Jyotirlinga Name with Photos", category: "EVENTS", img: "https://images.unsplash.com/photo-1583937107767-f31f9b3ec763?w=500", path: "/blog/jyotirlinga" },
            { title: "51 Shakti Peeth List with Name, Location", category: "EVENTS", img: "https://images.unsplash.com/photo-1599666433231-0570077c5c16?w=500", path: "/blog/shakti-peeth" },
            { title: "YatraDham.Org से बुकिंग के फायदे", category: "EVENTS", img: "https://images.unsplash.com/photo-1544644181-1484b3fdf362?w=500", path: "/blog/yatradham-benefits" }
          ].map((blog, index) => (
            <div key={index} onClick={() => navigate(blog.path)} className="home-card">
              <img src={blog.img} alt="blog" className="consistent-card-img" />
              <div className="card-info">
                <p style={{ color: "#f97316", fontSize: "12px", fontWeight: "bold" }}>{blog.category}</p>
                <h4>{blog.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}