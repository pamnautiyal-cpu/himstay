import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const heroImages = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
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

  // Helper function to render sections with custom colorful subtitles and reduced gap
  const renderCardSection = (title, subtitle, subtitleColor, data) => (
    <section style={{ margin: "28px 0" }}>
      <div style={{ marginBottom: "12px", borderLeft: "4px solid " + subtitleColor, paddingLeft: "10px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
          {title}
        </h2>
        <p style={{ fontSize: "13px", fontWeight: "600", color: subtitleColor, margin: "2px 0 0 0" }}>
          {subtitle}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
        {data.map((item, i) => (
          <div 
            key={i} 
            onClick={() => window.open(`https://www.google.com/search?q=${item.name}`, "_blank")}
            style={{
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
            }}
          >
            <img 
              src={item.img} 
              alt={item.name} 
              style={{ width: "100%", height: "150px", objectFit: "cover" }} 
              onError={(e) => { e.target.src = "/images/hero/himalayas.jpg"; }}
            />
            <div style={{ padding: "12px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: 0 }}>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh", paddingBottom: "40px" }}>
      
      {/* Hero Banner */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(11, 19, 43, 0.5), rgba(11, 19, 43, 0.7)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "85px 20px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transition: "background-image 1s ease-in-out"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "800", marginBottom: "10px", letterSpacing: "-0.5px" }}>
            Find Your Next Escape
          </h1>
          <p style={{ fontSize: "16px", color: "#e2e8f0", marginBottom: "30px", fontWeight: "400" }}>
            Discover breathtaking stays, holy shrines, and peaceful mountain retreats across Uttarakhand.
          </p>

          <form onSubmit={handleSearch} style={{
            background: "white",
            padding: "8px",
            borderRadius: "12px",
            display: "flex",
            gap: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            maxWidth: "720px",
            margin: "0 auto",
            border: "1px solid #e2e8f0"
          }}>
            <input 
              type="text" 
              placeholder="Where to explore?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              style={{ flex: 2, padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", outline: "none" }}
            />
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{ flex: 1, padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", outline: "none", background: "#fff" }}
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button type="button" onClick={handleSearch} style={{
              background: "#0ea5e9", color: "white", border: "none", padding: "10px 24px", 
              borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "0.2s"
            }}>
              Search
            </button>
          </form>

          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
            {heroImages.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: currentSlide === idx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: currentSlide === idx ? "#38bdf8" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "25px auto 0", padding: "0 20px" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "15px", marginBottom: "20px" }}>
          <div style={badgeStyle}>
            <span style={{ fontSize: "24px" }}>🏔️</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>100+ Verified Stays</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Handpicked mountain properties.</p>
            </div>
          </div>
          <div style={badgeStyle}>
            <span style={{ fontSize: "24px" }}>🛡️</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>Secure Booking</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Safe instant confirmations.</p>
            </div>
          </div>
          <div style={badgeStyle}>
            <span style={{ fontSize: "24px" }}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>24/7 Local Support</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Assistance on your journey.</p>
            </div>
          </div>
        </div>

        {/* Card Sections with Distinct Subtitle Colors */}
        {renderCardSection("Uttarakhand Tourism", "✨ Divine Shrines & Sacred Char Dham Trails", "#0284c7", uttarakhandExperiences)}
        {renderCardSection("Yoga & Wellness", "🌿 Rejuvenate Body & Soul in Mountain Silence", "#059669", yogaExperiences)}
        {renderCardSection("Popular Treks", "⚡ Thrilling Alpine Routes & Snowy Expeditions", "#d97706", trekExperiences)}

        {/* Travel Stories & Blogs */}
        <section style={{ margin: "35px 0" }}>
          <div style={{ marginBottom: "12px", borderLeft: "4px solid #7c3aed", paddingLeft: "10px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
              Travel Stories & Blogs
            </h2>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#7c3aed", margin: "2px 0 0 0" }}>
              📖 Insider Guides, Tips & Himalayan Experiences
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {blogPosts.map((blog, index) => (
              <div 
                key={index} 
                style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }} 
                onClick={() => window.open(`https://www.google.com/search?q=${blog.title}`, "_blank")}
              >
                <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                <div style={{ padding: "15px" }}>
                  <span style={{ fontSize: "11px", color: "#7c3aed", fontWeight: "700", textTransform: "uppercase" }}>{blog.date}</span>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "6px 0" }}>{blog.title}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>{blog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ marginTop: "40px", background: "#0f172a", color: "#fff", padding: "35px 20px", borderRadius: "18px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "25px", fontWeight: "800" }}>Why choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "50px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "2.2rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>100+</h2>
              <h3 style={{ fontSize: "14px", color: "#cbd5e1", marginTop: "4px" }}>Verified Stays</h3>
            </div>
            <div>
              <h2 style={{ fontSize: "2.2rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>10k+</h2>
              <h3 style={{ fontSize: "14px", color: "#cbd5e1", marginTop: "4px" }}>Happy Travelers</h3>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const badgeStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
};