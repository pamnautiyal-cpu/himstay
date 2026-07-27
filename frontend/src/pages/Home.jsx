import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  // 🌟 Firebase Listings Fetch (पुराने कोड से सुरक्षित)
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

  // 🌟 Dynamic Search Handler (पुराने लॉजिक के साथ)
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm && selectedCity === "All") return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}`);
  };

  const uttarakhandExperiences = [
    { name: "Kedarnath", img: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a566?w=600" },
    { name: "Badrinath", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600" },
    { name: "Gangotri", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600" },
    { name: "Yamunotri", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600" }
  ];

  const yogaExperiences = [
    { name: "Ayurvedic Therapy", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600" },
    { name: "Himalayan Yoga", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600" },
    { name: "Meditation", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600" },
    { name: "Panchakarma", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600" }
  ];

  const trekExperiences = [
    { name: "Kedarkantha", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600" },
    { name: "Valley of Flowers", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600" },
    { name: "Nag Tibba", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600" }
  ];

  const blogPosts = [
    {
      title: "10 Essential Tips for Your First Kedarkantha Trek",
      date: "May 12, 2026",
      desc: "Everything you need to know about weather, packing, and fitness before embarking on the winter wonderland trek.",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600"
    },
    {
      title: "Finding Peace: A Guide to Rishikesh Yoga Retreats",
      date: "April 28, 2026",
      desc: "Discover the best ashrams and holistic healing centers nestled along the banks of the holy Ganges.",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
    },
    {
      title: "Exploring the Mystical Trails of Valley of Flowers",
      date: "April 15, 2026",
      desc: "A breathtaking journey through UNESCO's World Heritage site filled with endemic alpine flowers.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
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
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600"; }}
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
      
      {/* 🌟 1. Full-Width Premium Hero Banner with Advanced Search */}
      <div style={{
        position: "relative",
        background: "linear-gradient(rgba(11, 19, 43, 0.5), rgba(11, 19, 43, 0.7)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600') center/cover no-repeat",
        padding: "90px 20px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px", letterSpacing: "-0.5px" }}>
            Find Your Next Escape
          </h1>
          <p style={{ fontSize: "18px", color: "#e2e8f0", marginBottom: "35px", fontWeight: "400" }}>
            Discover breathtaking stays, holy shrines, and peaceful mountain retreats across Uttarakhand.
          </p>

          {/* Floating Search Bar (Connected to Firebase City options & Search route) */}
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
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "40px auto 0", padding: "0 20px" }}>
        
        {/* 🌟 2. Trust Badges Section */}
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

        {/* 🌟 3. Card Sections */}
        {renderCardSection("Uttarakhand Tourism", uttarakhandExperiences)}
        {renderCardSection("Yoga & Wellness", yogaExperiences)}
        {renderCardSection("Popular Treks", trekExperiences)}

        {/* 🌟 4. Travel Stories & Blogs Section */}
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

        {/* 🌟 5. Stats / Why Choose Us Section */}
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