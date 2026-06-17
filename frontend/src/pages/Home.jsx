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
      
      {/* नया सर्च बार सेक्शन (जैसा आपने कहा था) */}
      <section className="hero-search-refined">
        <h2>Where to?</h2>
        <div className="search-box-himalayan">
          <input type="text" placeholder="Search for hotels, treks..." />
          <div className="category-tabs">
            <button>Stays</button>
            <button>Treks</button>
            <button>Yoga</button>
          </div>
          <button className="search-main-btn">Find my Escape</button>
        </div>
      </section>

      <div className="home-content">
        {renderScrollSection("Uttarakhand Tourism", uttarakhandExperiences, "tourism")}
        {renderScrollSection("Yoga & Wellness", yogaExperiences, "yoga")}
        {renderScrollSection("Popular Treks", trekExperiences, "trek")}

        <section className="section-wrapper">
          <h2 className="section-title">Featured Properties</h2>
          <div className="home-grid">
            {listings.map((h) => (
              <div key={h.id} className="home-card" onClick={() => navigate(`/details/${h.type}/${h.id}`)}>
                <img src={h.image} alt={h.name} className="consistent-card-img" />
                <div className="card-info">
                  <h3 style={{ fontSize: "18px" }}>{h.name}</h3>
                  <p style={{ fontSize: "14px", color: "#64748b" }}>{h.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="trust-section">
          <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>Why choose The Himalayans?</h2>
          <div className="trust-grid">
            <div className="trust-card"><h2>100+</h2><h3>Verified Stays</h3></div>
            <div className="trust-card"><h2>10k+</h2><h3>Happy Travelers</h3></div>
          </div>
        </section>

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
    </div>
  );
}