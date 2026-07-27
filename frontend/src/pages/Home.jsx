import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  // 🌟 Hero Banner Slideshow Images (लोकल फोल्डर वाली इमेजेस जो ऑटो-रोटेट होंगी)
  const heroImages = [
    "/images/hero/himalayas.jpg",
    "/images/chardham/kedarnath.jpg",
    "/images/chardham/badrinath.jpg",
    "/images/treks/kedarkantha.jpg"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // हर 4 सेकंड में बैनर इमेज बदलने का इफ़ेक्ट
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

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

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm && selectedCity === "All") return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}`);
  };

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
    <section className="section-wrapper" style={{ margin: "45px 0" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", marginBottom: "20px", borderLeft: "4px solid #0ea5e9", paddingLeft: "10px" }}>
        {title}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {data.map((item, i) => (
          <div 
            key={i} 
            onClick={() => window.open(`https://www.google.com/search?q=${item.name}`, "_blank")}
            style={{
              background: "#fff",
              borderRadius: "14px",
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
              onError={(e) => { e.target.src = "/images/hero/himalayas.jpg"; }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: 0 }}>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* 🌟 Live Auto-Sliding Hero Banner */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(11, 19, 43, 0.55), rgba(11, 19, 43, 0.75)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "110px 20px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transition: "background-image 1s ease-in-out"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px", letterSpacing: "-0.5px" }}>
            Find Your Next Escape
          </h1>
          <p style={{ fontSize: "18px", color: "#e2e8f0", marginBottom: "35px", fontWeight: "400" }}>
            Discover breathtaking stays, holy shrines, and peaceful mountain retreats across Uttarakhand.
          </p>

          <form onSubmit={handleSearch} style={{
            background: "white",
            padding: "10px",
            borderRadius: "14px",
            display: "flex",
            gap: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            maxWidth: "750px",
            margin: "0 auto",
            border: "1px solid #e2e8f0"
          }}>
            <input 
              type="text" 
              placeholder="Where to explore?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              style={{ flex: 2, padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "15px", outline: "none" }}
            />
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{ flex: 1, padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "15px", outline: "none", background: "#fff" }}
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button type="button" onClick={handleSearch} style={{
              background: "#0ea5e9", color: "white", border: "none", padding: "12px 28px", 
              borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer", transition: "0.2s"
            }}>
              Search
            </button>
          </form>

          {/* Slide Indicator Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "25px" }}>
            {heroImages.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: currentSlide === idx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: currentSlide === idx ? "#38bdf8" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "40px auto 0", padding: "0 20px" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
          <div style={badgeStyle}>
            <span style={{ fontSize: "28px" }}>🏔️</span>
            <div>
              <h4 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>100+ Verified Stays</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Handpicked mountain properties and cozy homestays.</p>
            </div>
          </div>
          <div style={badgeStyle}>
            <span style={{ fontSize: "28px" }}>🛡️</span>
            <div>
              <h4 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>Secure Booking</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Safe transactions with instant confirmations.</p>
            </div>
          </div>
          <div style={badgeStyle}>
            <span style={{ fontSize: "28px" }}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>24/7 Local Support</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Assistance throughout your Himalayan journey.</p>
            </div>
          </div>
        </div>

        {renderCardSection("Uttarakhand Tourism", uttarakhandExperiences)}
        {renderCardSection("Yoga & Wellness", yogaExperiences)}
        {renderCardSection("Popular Treks", trekExperiences)}

        {/* Travel Stories & Blogs */}
        <section className="section-wrapper" style={{ margin: "50px 0" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", marginBottom: "20px", borderLeft: "4px solid #0ea5e9", paddingLeft: "10px" }}>
            Travel Stories & Blogs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
            {blogPosts.map((blog, index) => (
              <div 
                key={index} 
                style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }} 
                onClick={() => window.open(`https://www.google.com/search?q=${blog.title}`, "_blank")}
              >
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

        {/* Stats Section */}
        <section style={{ marginTop: "70px", background: "#0f172a", color: "#fff", padding: "50px 20px", borderRadius: "24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "35px", fontWeight: "800" }}>Why choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>100+</h2>
              <h3 style={{ fontSize: "16px", color: "#cbd5e1", marginTop: "5px" }}>Verified Stays</h3>
            </div>
            <div>
              <h2 style={{ fontSize: "2.5rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>10k+</h2>
              <h3 style={{ fontSize: "16px", color: "#cbd5e1", marginTop: "5px" }}>Happy Travelers</h3>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const badgeStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
};