import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // नया स्टेट

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

  // सर्च फिल्टर लॉजिक
  const filteredListings = listings.filter((h) => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
      {/* अपडेटेड सर्च बार */}
      <section className="hero-search-refined">
        <h2>Where to?</h2>
        <div className="search-box-himalayan">
          <input 
            type="text" 
            placeholder="Search for hotels, treks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
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
          
          {/* सर्च लॉजिक के साथ रेंडरिंग */}
          {filteredListings.length > 0 ? (
            <div className="home-grid">
              {filteredListings.map((h) => (
                <div key={h.id} className="home-card" onClick={() => navigate(`/details/${h.type}/${h.id}`)}>
                  <img src={h.image} alt={h.name} className="consistent-card-img" />
                  <div className="card-info">
                    <h3 style={{ fontSize: "18px" }}>{h.name}</h3>
                    <p style={{ fontSize: "14px", color: "#64748b" }}>{h.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results-container" style={{ textAlign: "center", padding: "50px" }}>
              <h2>Sorry, we couldn't find "{searchTerm}."</h2>
              <p>Is your search missing a place? Tell us about it.</p>
              <button className="add-place-btn">Add a place</button>
            </div>
          )}
        </section>

        {/* ... बाकी का पुराना कोड सुरक्षित है ... */}
      </div>
    </div>
  );
}