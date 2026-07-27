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

  const featuredStays = [
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

  const allDisplayListings = listings.length > 0 ? [...listings, ...featuredStays] : featuredStays;

  // Original Data Preserved
  const tourismDestinations = [
    { name: "Kedarnath", desc: "Sacred Jyotirlinga in Garhwal Himalayas.", img: "/images/chardham/kedarnath.jpg" },
    { name: "Badrinath", desc: "Holy abode of Lord Vishnu on Alaknanda.", img: "/images/chardham/badrinath.jpg" },
    { name: "Gangotri", desc: "Origin of the holy river Ganga.", img: "/images/chardham/gangotri.jpg" },
    { name: "Yamunotri", desc: "Sacred source of the Yamuna River.", img: "/images/chardham/yamunotri.jpg" }
  ];

  const yogaRetreats = [
    { name: "Himalayan Yoga Retreat", desc: "Deep meditation in mountain silence.", img: "/images/yoga/himalayan-yoga-retreat.jpg" },
    { name: "Ayurvedic Therapy", desc: "Holistic healing through ancient herbs.", img: "/images/yoga/ayurvedic-therapy.jpg" },
    { name: "Meditation & Pranayama", desc: "Master your breath by the Ganges.", img: "/images/yoga/meditation-pranayama.jpg" },
    { name: "Panchakarma Detox", desc: "Complete body purification.", img: "/images/yoga/panchakarma.jpg" }
  ];

  const popularTreks = [
    { name: "Kedarkantha Trek", desc: "Classic winter snow summit trek.", img: "/images/treks/kedarkantha.jpg" },
    { name: "Valley of Flowers", desc: "UNESCO World Heritage site alpine flora.", img: "/images/treks/valley-of-flowers.jpg" },
    { name: "Roopkund Trek", desc: "Mystical skeleton lake expedition.", img: "/images/treks/roopkund.jpg" },
    { name: "Har Ki Dun", desc: "Cradle of Swargarohini in Garhwal.", img: "/images/treks/har-ki-dun.jpg" }
  ];

  const travelBlogs = [
    { title: "Complete Guide to Char Dham Yatra 2026", date: "April 12, 2026", img: "/images/chardham/kedarnath.jpg" },
    { title: "Top 5 Meditation Spots in Rishikesh", date: "March 28, 2026", img: "/images/yoga/himalayan-yoga-retreat.jpg" },
    { title: "Packing Essentials for Kedarkantha Trek", date: "March 15, 2026", img: "/images/treks/kedarkantha.jpg" }
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
        
        {/* Trust Badges */}
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

        {/* Handpicked Stays */}
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

        {/* Horizontal Scrolling Sections for Clean MakeMyTrip Feel */}
        
        {/* 1. Uttarakhand Tourism Horizontal Scroll */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>✨ Divine Shrines & Sacred Char Dham Trails</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "2px 0 0 0" }}>Uttarakhand Tourism</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {tourismDestinations.map((item, idx) => (
              <div key={idx} style={horizontalCardStyle} onClick={() => navigate(`/search?query=${encodeURIComponent(item.name)}`)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Yoga & Wellness Horizontal Scroll */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#059669", textTransform: "uppercase" }}>🌿 Rejuvenate Body & Soul in Mountain Silence</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "2px 0 0 0" }}>Yoga & Wellness</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {yogaRetreats.map((item, idx) => (
              <div key={idx} style={horizontalCardStyle} onClick={() => navigate(`/search?query=Yoga`)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Popular Treks Horizontal Scroll */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ marginBottom: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#d97706", textTransform: "uppercase" }}>⚡ Thrilling Alpine Routes & Snowy Expeditions</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "2px 0 0 0" }}>Popular Treks</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {popularTreks.map((item, idx) => (
              <div key={idx} style={horizontalCardStyle} onClick={() => navigate(`/search?query=Kedarkantha`)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Blog / Stories Section */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ marginBottom: "12px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0 }}>📖 Pahadi Travel Stories & Guides</h2>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>Read travel tips from local experts</p>
          </div>
          <div style={horizontalScrollContainer}>
            {travelBlogs.map((blog, idx) => (
              <div key={idx} style={{ ...horizontalCardStyle, minWidth: "280px" }}>
                <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <span style={{ fontSize: "11px", color: "#0284c7", fontWeight: "700" }}>{blog.date}</span>
                  <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: "4px 0 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{blog.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section style={{ marginTop: "40px", background: "#0f172a", color: "#fff", padding: "35px 20px", borderRadius: "18px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "20px", fontWeight: "800" }}>Why choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "50px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "2rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>100+</h2>
              <h3 style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>Verified Stays</h3>
            </div>
            <div>
              <h2 style={{ fontSize: "2rem", color: "#38bdf8", fontWeight: "800", margin: 0 }}>10k+</h2>
              <h3 style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>Happy Travelers</h3>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const badgeCardStyle = {
  background: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
};

const horizontalScrollContainer = {
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  paddingBottom: "10px",
  scrollBehavior: "smooth",
  scrollbarWidth: "none" // Hides scrollbar for clean UI
};

const horizontalCardStyle = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
  cursor: "pointer",
  minWidth: "220px",
  flex: "0 0 auto",
  boxShadow: "0 3px 10px rgba(0,0,0,0.03)",
  transition: "transform 0.2s ease"
};