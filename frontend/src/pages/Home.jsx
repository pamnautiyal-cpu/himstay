import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hotels"); // Hotels, Treks, Yoga
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

  // Featured Hotel & Stay Ads / Listings for Home Page to give true Travel Portal feel
  const featuredStays = [
    {
      id: "1",
      title: "Himalayan Eco Lodge & Retreat",
      location: "Uttarkashi",
      price: "₹2,499",
      rating: "4.8",
      type: "Hotel",
      img: "/images/hero/himalayas.jpg"
    },
    {
      id: "2",
      title: "Ganges Riverside Ashram & Yoga Stay",
      location: "Rishikesh",
      price: "₹1,899",
      rating: "4.9",
      type: "Yoga",
      img: "/images/yoga/himalayan-yoga-retreat.jpg"
    },
    {
      id: "3",
      title: "Kedarkantha Base Camp Wooden Cottage",
      location: "Sankri, Kedarkantha",
      price: "₹3,199",
      rating: "4.7",
      type: "Trek",
      img: "/images/treks/kedarkantha.jpg"
    },
    {
      id: "4",
      title: "Badrinath Pilgrim Valley Hotel",
      location: "Badrinath",
      price: "₹2,200",
      rating: "4.6",
      type: "Hotel",
      img: "/images/chardham/badrinath.jpg"
    }
  ];

  // Combine Firebase listings with hardcoded featured stays
  const allDisplayListings = listings.length > 0 ? [...listings, ...featuredStays] : featuredStays;

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: "50px" }}>
      
      {/* MakeMyTrip Style Floating Search Widget Banner */}
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

          {/* MMT Style Search Box Container */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
            textAlign: "left",
            color: "#0f172a"
          }}>
            {/* Tabs inside Search Widget */}
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

            {/* Inputs Form */}
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

          {/* Slide Dots */}
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

        {/* Live Hotels & Stay Ads Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              🔥 Handpicked Stays & Retreat Ads
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "3px 0 0 0" }}>Explore top-rated hotels, yoga centers, and mountain camps</p>
          </div>
          <button 
            onClick={() => navigate("/stays")}
            style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
          >
            View All Stays →
          </button>
        </div>

        {/* Property Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "20px" }}>
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
                  src={item.img || item.image || "/images/hero/himalayas.jpg"} 
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
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "10px", marginTop: "10px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Starting from</span>
                    <span style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>{item.price || "₹2,499"}</span>
                    <span style={{ fontSize: "11px", color: "#64748b" }}> / night</span>
                  </div>
                  <button style={{
                    background: "#0284c7", color: "white", border: "none", padding: "8px 14px",
                    borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer"
                  }}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Strip for Char Dham / Special Packages */}
        <div style={{
          marginTop: "50px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          borderRadius: "18px",
          padding: "35px 30px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 10px 25px rgba(15, 23, 42, 0.2)"
        }}>
          <div>
            <span style={{ background: "#0ea5e9", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
              Special Yatra Season Offer
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: "800", margin: "10px 0 5px 0" }}>
              Char Dham Yatra Stays & Cabs Package
            </h2>
            <p style={{ fontSize: "14px", color: "#cbd5e1", margin: 0 }}>
              Get flat 15% off on booking Kedarnath & Badrinath premium stays together.
            </p>
          </div>
          <button 
            onClick={() => navigate("/stays")}
            style={{
              background: "#38bdf8", color: "#0f172a", border: "none", padding: "12px 24px",
              borderRadius: "10px", fontWeight: "800", fontSize: "14px", cursor: "pointer", transition: "0.2s"
            }}
          >
            Explore Packages
          </button>
        </div>

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