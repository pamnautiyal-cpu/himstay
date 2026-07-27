import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [displaySearch, setDisplaySearch] = useState(""); 

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

  // Fixed list + Dynamic list combining
  const majorCities = ["All", "Rishikesh", "Uttarkashi", "Haridwar", "Dehradun", "Delhi", "Mumbai", "Other"];
  const dbCities = [...new Set(listings.map((h) => h.location).filter(Boolean))];
  const cityOptions = [...new Set([...majorCities, ...dbCities])];

  const handleSearch = () => {
    setDisplaySearch(searchTerm);
  };

  const filteredListings = listings.filter((h) => 
    h.name.toLowerCase().includes(displaySearch.toLowerCase()) &&
    (selectedCity === "All" || h.location === selectedCity)
  );

  const uttarakhandExperiences = [
    { n: "Kedarnath", img: "/images/chardham/kedarnath.jpg" },
    { n: "Badrinath", img: "/images/chardham/badrinath.jpg" },
    { n: "Gangotri", img: "/images/chardham/gangotri.jpg" },
    { n: "Yamunotri", img: "/images/chardham/yamunotri.jpg" }
  ];

  const yogaExperiences = [
    { n: "Ayurvedic Therapy", img: "/images/yoga/ayurvedic-therapy.jpg" },
    { n: "Himalayan Yoga", img: "/images/yoga/himalayan-yoga-retreat.jpg" },
    { n: "Meditation", img: "/images/yoga/meditation-pranayama.jpg" },
    { n: "Panchakarma", img: "/images/yoga/panchakarma.jpg" }
  ];

  const trekExperiences = [
    { n: "Kedarkantha", img: "/images/treks/kedarkantha.jpg" },
    { n: "Valley of Flowers", img: "/images/treks/valley-of-flowers.jpg" },
    { n: "Roopkund", img: "/images/treks/roopkund.jpg" },
    { n: "Har Ki Dun", img: "/images/treks/har-ki-dun.jpg" },
    { n: "Nag Tibba", img: "/images/treks/nag-tibba.jpg" }
  ];

  // Blog / Travel Stories Data
  const blogPosts = [
    {
      title: "10 Essential Tips for Your First Kedarkantha Trek",
      date: "May 12, 2026",
      desc: "Everything you need to know about weather, packing, and fitness before embarking on the winter wonderland trek.",
      img: "/images/treks/kedarkantha.jpg"
    },
    {
      title: "Finding Peace: A Guide to Rishikesh Yoga Retreats",
      date: "April 28, 2026",
      desc: "Discover the best ashrams and holistic healing centers nestled along the banks of the holy Ganges.",
      img: "/images/yoga/himalayan-yoga-retreat.jpg"
    },
    {
      title: "Exploring the Mystical Trails of Valley of Flowers",
      date: "April 15, 2026",
      desc: "A breathtaking journey through UNESCO's World Heritage site filled with endemic alpine flowers.",
      img: "/images/treks/valley-of-flowers.jpg"
    }
  ];

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
      {/* Hero Section */}
      <section style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000')", 
        height: "450px", backgroundSize: "cover", backgroundPosition: "center", display: "flex", 
        flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", 
        textAlign: "center", borderRadius: "20px", marginBottom: "80px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" 
      }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "800", textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}>
          Find your next escape
        </h1>
      </section>

      {/* Dynamic Floating Search Bar */}
      <div className="hero-search-refined">
        <input 
          type="text" 
          placeholder="Where to?" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
        />
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          {cityOptions.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <button type="button" onClick={handleSearch} className="search-main-btn">Search</button>
      </div>

      <div className="home-content">
        {renderScrollSection("Uttarakhand Tourism", uttarakhandExperiences, "tourism")}
        {renderScrollSection("Yoga & Wellness", yogaExperiences, "yoga")}
        {renderScrollSection("Popular Treks", trekExperiences, "trek")}

        <section className="section-wrapper">
          <h2 className="section-title">Featured Properties</h2>
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
              <h2>Sorry, we couldn't find "{displaySearch}."</h2>
              <button className="add-place-btn" onClick={() => {setSearchTerm(""); setDisplaySearch(""); setSelectedCity("All");}}>Clear Search</button>
            </div>
          )}
        </section>

        {/* Blog / Travel Stories Section */}
        <section className="section-wrapper" style={{ marginTop: "60px" }}>
          <h2 className="section-title">Travel Stories & Blogs</h2>
          <div className="home-grid">
            {blogPosts.map((blog, index) => (
              <div key={index} className="home-card" style={{ cursor: "pointer" }} onClick={() => window.open(`https://www.google.com/search?q=${blog.title}`, "_blank")}>
                <img src={blog.img} alt={blog.title} className="consistent-card-img" />
                <div className="card-info" style={{ padding: "15px" }}>
                  <span style={{ fontSize: "12px", color: "#0071c2", fontWeight: "600" }}>{blog.date}</span>
                  <h3 style={{ fontSize: "16px", margin: "8px 0" }}>{blog.title}</h3>
                  <p style={{ fontSize: "13px", color: "#64748b" }}>{blog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="trust-section" style={{ marginTop: "60px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>Why choose The Himalayans?</h2>
          <div className="trust-grid">
            <div className="trust-card"><h2>100+</h2><h3>Verified Stays</h3></div>
            <div className="trust-card"><h2>10k+</h2><h3>Happy Travelers</h3></div>
          </div>
        </section>
      </div>
    </div>
  );
}