import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hotels");
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

  const majorCities = ["All", "Rishikesh", "Uttarkashi", "Kedarnath", "Badrinath", "Haridwar", "Dehradun", "Delhi", "Mumbai"];
  const dbCities = [...new Set(listings.map((h) => h.location).filter(Boolean))];
  const cityOptions = [...new Set([...majorCities, ...dbCities])];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}&tab=${activeTab}`);
  };

  // Default Stays (Hotel page style data)
  const defaultStays = [
    {
      id: "1",
      title: "Himalayan Eco Lodge & Retreat",
      location: "Uttarkashi",
      price: "₹2,499",
      rating: "4.8",
      img: "/images/hero/himalayas.jpg"
    },
    {
      id: "2",
      title: "Ganges Riverside Ashram & Yoga Stay",
      location: "Rishikesh",
      price: "₹1,899",
      rating: "4.9",
      img: "/images/yoga/himalayan-yoga-retreat.jpg"
    },
    {
      id: "3",
      title: "Kedarkantha Base Camp Wooden Cottage",
      location: "Sankri, Kedarkantha",
      price: "₹3,199",
      rating: "4.7",
      img: "/images/treks/kedarkantha.jpg"
    },
    {
      id: "4",
      title: "Badrinath Pilgrim Valley Hotel",
      location: "Badrinath",
      price: "₹2,200",
      rating: "4.6",
      img: "/images/chardham/badrinath.jpg"
    }
  ];

  // Combine Firebase listings so home page dynamically shows exact hotel page listings
  const allDisplayListings = listings.length > 0 ? listings : defaultStays;

  const categoryBanners = [
    {
      title: "Uttarakhand Tourism",
      subtitle: "✨ Divine Shrines & Sacred Char Dham Trails",
      color: "#0284c7",
      img: "/images/chardham/kedarnath.jpg",
      query: "Kedarnath"
    },
    {
      title: "Yoga & Wellness",
      subtitle: "🌿 Rejuvenate Body & Soul in Mountain Silence",
      color: "#059669",
      img: "/images/yoga/himalayan-yoga-retreat.jpg",
      query: "Yoga"
    },
    {
      title: "Popular Treks",
      subtitle: "⚡ Thrilling Alpine Routes & Snowy Expeditions",
      color: "#d97706",
      img: "/images/treks/kedarkantha.jpg",
      query: "Kedarkantha"
    }
  ];

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: "50px" }}>
      
      {/* MakeMyTrip Style Search Widget Banner */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(11, 19, 43, 0.6), rgba(11, 19, 43, 0.8)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "70px 20px 90px 20px",
        textAlign: "center",
        color: "white",
        transition: "background-image 1s ease-in-out"
      }}>
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "38px", fontWeight: "800", marginBottom: "8px" }}>
            Book Your Himalayan Experience
          </h1>
          <p style={{ fontSize: "16px", color: "#cbd5e1", marginBottom: "30px" }}>
            Handpicked Hotels, Sacred Char Dham Stays, Yoga Retreats & Trekking Camps
          </p>

          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
            textAlign: "left",
            color: "#0f172a"
          }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
              {[
                { id: "Hotels", label: "🏨 Hotels & Stays" },
                { id: "Yoga", label: "🌿 Yoga Retreats" },
                { id: "Treks", label: "⚡ Trekking Camps" }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? "#e0f2fe" : "transparent",
                    color: activeTab === tab.id ? "#0284c7" : "#64748b",
                    border: activeTab === tab.id ? "1px solid #bae6fd" : "1px solid transparent",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "0.2s"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 2, minWidth: "220px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>City / Destination</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#f8fafc", fontWeight: "600" }}
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 3, minWidth: "240px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>Search Property / Keyword</label>
                <input 
                  type="text" 
                  placeholder="e.g. Riverside Cottage, Kedarnath Hotel..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: "140px", alignSelf: "flex-end" }}>
                <button type="submit" style={{
                  width: "100%", background: "#0284c7", color: "white", border: "none", padding: "13px", 
                  borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.4)"
                }}>
                  SEARCH
                </button>
              </div>
            </form>
          </div>

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

      <div style={{ maxWidth: "1200px", margin: "30px auto 0", padding: "0 20px" }}>
        
        {/* Trust Badges Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "15px", marginBottom: "35px" }}>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "26px" }}>🛡️</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>100% Verified Properties</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Direct verified stays with best prices.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "26px" }}>⚡</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>Instant Confirmation</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Get booking details instantly on SMS & Email.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "26px" }}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#0f172a", fontSize: "14px" }}>24/7 Pahadi Support</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Dedicated local assistance during Yatra.</p>
            </div>
          </div>
        </div>

        {/* Live Hotels & Stay Ads Section - Linked to Hotel Page Data */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              🔥 Handpicked Stays & Retreat Ads
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "3px 0 0 0" }}>Explore exact properties listed on the stays page</p>
          </div>
          <button 
            onClick={() => navigate("/stays")}
            style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
          >
            View All Stays →
          </button>
        </div>

        {/* Property Grid using Stays Page / Hotel Data */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          {allDisplayListings.map((item, index) => (
            <div 
              key={item.id || index}
              onClick={() => navigate(`/stays`)}
              style={{
                background: "#fff",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
              }}
            >
              <div style={{ position: "relative" }}>
                <img 
                  src={item.image || item.img || "/images/hero/himalayas.jpg"} 
                  alt={item.title || item.name} 
                  style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hero/himalayas.jpg"; }}
                />
                <span style={{
                  position: "absolute", top: "10px", right: "10px", background: "rgba(15, 23, 42, 0.8)",
                  color: "white", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700"
                }}>
                  ⭐ {item.rating || "4.8"}
                </span>
              </div>

              <div style={{ padding: "15px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>
                    📍 {item.location || "Uttarakhand"}
                  </span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "6px 0 10px 0", lineHeight: "1.3" }}>
                    {item.title || item.name}
                  </h3>
                  {item.description && (
                    <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.description}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "10px", marginTop: "10px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Starting from</span>
                    <span style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>{item.price ? `₹${item.price}` : "₹2,499"}</span>
                    <span style={{ fontSize: "11px", color: "#64748b" }}> / night</span>
                  </div>
                  <button style={{
                    background: "#0284c7", color: "white", border: "none", padding: "8px 14px",
                    borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer"
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Category Banner Cards */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "15px" }}>
            🌟 Explore Himalayan Categories
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {categoryBanners.map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/search?query=${encodeURIComponent(cat.query)}`)}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "180px",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s ease",
                  border: "1px solid #e2e8f0"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <img src={cat.img} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                  background: "linear-gradient(to top, rgba(11,19,43,0.9), rgba(11,19,43,0.3))",
                  padding: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "white"
                }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#38bdf8", marginBottom: "4px" }}>
                    {cat.subtitle}
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: "800", margin: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {cat.title}
                    <span style={{ fontSize: "16px", background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "8px" }}>Explore →</span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section style={{ marginTop: "40px", background: "#0f172a", color: "#fff", padding: "40px 20px", borderRadius: "18px", textAlign: "center" }}>
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

const badgeCardStyle = {
  background: "white",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
};