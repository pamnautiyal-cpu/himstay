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
    { name: "Kedarnath", img: "/images/chardham/kedarnath.jpg" },
    { name: "Badrinath", img: "/images/chardham/badrinath.jpg" },
    { name: "Gangotri", img: "/images/chardham/gangotri.jpg" },
    { name: "Yamunotri", img: "/images/chardham/yamunotri.jpg" }
  ];

  const yogaExperiences = [
    { name: "Ayurvedic Therapy", img: "/images/yoga/ayurvedic-therapy.jpg" },
    { name: "Himalayan Yoga", img: "/images/yoga/himalayan-yoga-retreat.jpg" },
    { name: "Meditation", img: "/images/yoga/meditation-pranayama.jpg" },
    { name: "Panchakarma", img: "/images/yoga/panchakarma.jpg" }
  ];

  const trekExperiences = [
    { name: "Kedarkantha", img: "/images/treks/kedarkantha.jpg" },
    { name: "Valley of Flowers", img: "/images/treks/valley-of-flowers.jpg" },
    { name: "Roopkund", img: "/images/treks/roopkund.jpg" },
    { name: "Har Ki Dun", img: "/images/treks/har-ki-dun.jpg" },
    { name: "Nag Tibba", img: "/images/treks/nag-tibba.jpg" }
  ];

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

  const renderCardSection = (title, data) => (
    <section className="section-wrapper" style={{ margin: "40px 0" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", marginBottom: "20px", borderLeft: "4px solid #0ea5e9", paddingLeft: "10px" }}>
        {title}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
        {data.map((item, i) => (
          <div 
            key={i} 
            onClick={() => window.open(`https://www.google.com/search?q=${item.name}`, "_blank")}
            style={{
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
            }}
          >
            <img 
              src={item.img} 
              alt={item.name} 
              style={{ width: "100%", height: "160px", objectFit: "cover" }} 
              onError={(e) => {
                e.target.src = "/images/hero/himalayas.jpg";
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="home-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      
      {/* Clean Separated Hero Section (Text outside the image for crystal clear visibility) */}
      <div style={{ textAlign: "center", margin: "40px 0 20px 0" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#1e293b", letterSpacing: "-1px", marginBottom: "10px" }}>
          Find your next escape
        </h1>
        <p style={{ fontSize: "1.15rem", color: "#64748b", fontWeight: "500" }}>
          Discover breathtaking stays, holy shrines, and peaceful mountain retreats.
        </p>
      </div>

      {/* Hero Banner Image with Floating Search Bar */}
      <section style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/hero/himalayas.jpg')", 
        height: "400px", backgroundSize: "cover", backgroundPosition: "center", display: "flex", 
        flexDirection: "column", justifyContent: "flex-end", alignItems: "center", 
        borderRadius: "24px", marginBottom: "70px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", paddingBottom: "30px" 
      }}>
        {/* Dynamic Floating Search Bar */}
        <div className="hero-search-refined" style={{
          background: "#ffffff", padding: "12px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          display: "flex", gap: "10px", width: "90%", maxWidth: "750px", border: "1px solid #e2e8f0"
        }}>
          <input 
            type="text" 
            placeholder="Where to explore?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            style={{ flex: 2, padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
          />
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
            style={{ flex: 1, padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px", background: "#fff", outline: "none" }}>
            {cityOptions.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button type="button" onClick={handleSearch} style={{
            background: "#0ea5e9", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "15px"
          }}>Search</button>
        </div>
      </section>

      <div className="home-content">
        {renderCardSection("Uttarakhand Tourism", uttarakhandExperiences)}
        {renderCardSection("Yoga & Wellness", yogaExperiences)}
        {renderCardSection("Popular Treks", trekExperiences)}

        {/* Featured Properties */}
        <section className="section-wrapper" style={{ margin: "50px 0" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", marginBottom: "20px", borderLeft: "4px solid #0ea5e9", paddingLeft: "10px" }}>
            Featured Properties
          </h2>
          {filteredListings.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
              {filteredListings.map((h) => (
                <div key={h.id} onClick={() => navigate(`/details/${h.type}/${h.id}`)} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "0.3s" }}>
                  <img src={h.image} alt={h.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ padding: "18px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "5px" }}>{h.name}</h3>
                    <p style={{ fontSize: "14px", color: "#64748b" }}>📍 {h.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h2>Sorry, we couldn't find "{displaySearch}."</h2>
              <button onClick={() => {setSearchTerm(""); setDisplaySearch(""); setSelectedCity("All");}} style={{ marginTop: "15px", padding: "10px 20px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Clear Search</button>
            </div>
          )}
        </section>

        {/* Blog / Travel Stories Section */}
        <section className="section-wrapper" style={{ margin: "50px 0" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", marginBottom: "20px", borderLeft: "4px solid #0ea5e9", paddingLeft: "10px" }}>
            Travel Stories & Blogs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
            {blogPosts.map((blog, index) => (
              <div key={index} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }} onClick={() => window.open(`https://www.google.com/search?q=${blog.title}`, "_blank")}>
                <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <div style={{ padding: "18px" }}>
                  <span style={{ fontSize: "12px", color: "#0ea5e9", fontWeight: "700", textTransform: "uppercase" }}>{blog.date}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "8px 0" }}>{blog.title}</h3>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>{blog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "70px", background: "#0f172a", color: "#fff", padding: "50px 20px", borderRadius: "24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "35px", fontWeight: "800" }}>Why choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", color: "#38bdf8", fontWeight: "800" }}>100+</h2>
              <h3 style={{ fontSize: "16px", color: "#cbd5e1", marginTop: "5px" }}>Verified Stays</h3>
            </div>
            <div>
              <h2 style={{ fontSize: "2.5rem", color: "#38bdf8", fontWeight: "800" }}>10k+</h2>
              <h3 style={{ fontSize: "16px", color: "#cbd5e1", marginTop: "5px" }}>Happy Travelers</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}