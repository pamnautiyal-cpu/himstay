import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hotels");
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for smooth sliding
  const staysScrollRef = useRef(null);

  const scrollStays = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Hero Banner Slider Images
  const heroImages = [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  // Fetching data from Backend with fallback dummy items so UI never looks empty/broken
  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const rawData = Array.isArray(res.data) ? res.data : [];
        if (rawData.length > 0) {
          const backendData = rawData.map(item => ({
            ...item,
            price: item.price || "2,499",
            rating: item.rating || "4.8",
            category: item.category || "Hotels",
            image: item.image || item.img || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
          }));
          setHotels(backendData);
        } else {
          // Fallback demo items so the slider always looks alive and beautiful
          setHotels([
            { _id: "1", name: "Hotel Nagaraja Palace", location: "Uttarkashi", price: "2,499", rating: "4.9", category: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" },
            { _id: "2", name: "Grandparents Homestay", location: "Uttarkashi", price: "1,999", rating: "4.8", category: "Hotels", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" },
            { _id: "3", name: "Ganges Valley Retreat", location: "Rishikesh", price: "3,199", rating: "4.9", category: "Hotels", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80" },
            { _id: "4", name: "Himalayan Peak View", location: "Kedarnath", price: "2,899", rating: "4.7", category: "Hotels", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" }
          ]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        // Fallback data on error to maintain rich UI experience
        setHotels([
          { _id: "1", name: "Hotel Nagaraja Palace", location: "Uttarkashi", price: "2,499", rating: "4.9", category: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" },
          { _id: "2", name: "Grandparents Homestay", location: "Uttarkashi", price: "1,999", rating: "4.8", category: "Hotels", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" },
          { _id: "3", name: "Ganges Valley Retreat", location: "Rishikesh", price: "3,199", rating: "4.9", category: "Hotels", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80" }
        ]);
        setLoading(false);
      });
  }, []);

  const majorCities = ["All", "Rishikesh", "Uttarkashi", "Kedarnath", "Badrinath", "Haridwar", "Dehradun"];
  const dbCities = [...new Set(hotels.map((h) => h.location || h.city).filter(Boolean))];
  const cityOptions = [...new Set([...majorCities, ...dbCities])];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}&tab=${encodeURIComponent(activeTab)}`);
  };

  const filteredListings = hotels.filter((item) => {
    const itemName = (item.name || "").trim().toLowerCase();
    if (itemName === "ravi govindam") return false;
    if (!item.category) return true;
    return String(item.category).trim().toLowerCase() === String(activeTab).trim().toLowerCase();
  });

  const sacredPlaces = [
    { name: "Kedarnath", desc: "Sacred shrine nestled in Garhwal Himalayas.", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80", searchUrl: "https://www.google.com/search?q=Kedarnath+Dham+guide" },
    { name: "Badrinath", desc: "Holy divine abode of Lord Vishnu.", img: "https://images.unsplash.com/photo-1595655608293-98782a174f83?auto=format&fit=crop&w=600&q=80", searchUrl: "https://www.google.com/search?q=Badrinath+Dham+guide" },
    { name: "Gangotri", desc: "Pristine origin point of holy river Ganga.", img: "https://images.unsplash.com/photo-1589182337358-2fabedd73e9d?auto=format&fit=crop&w=600&q=80", searchUrl: "https://www.google.com/search?q=Gangotri+temple+guide" },
    { name: "Yamunotri", desc: "Sacred source of the Yamuna River.", img: "https://images.unsplash.com/photo-1590447158019-883281ab4bc1?auto=format&fit=crop&w=600&q=80", searchUrl: "https://www.google.com/search?q=Yamunotri+temple+guide" }
  ];

  const yogaRetreats = [
    { name: "Himalayan Sanctuary", desc: "Deep meditation in mountain silence.", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600", path: "/details/himalayan-yoga" },
    { name: "Ayurvedic Wellness", desc: "Holistic healing through herbs.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", path: "/details/ayurvedic-therapy" },
    { name: "Meditation & Pranayama", desc: "Master breath by the sacred Ganges.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600", path: "/details/meditation" }
  ];

  const popularTreks = [
    { name: "Kedarkantha Trek", desc: "Classic snow trail expedition with views.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", path: "/details/kedarkantha" },
    { name: "Valley of Flowers", desc: "UNESCO World Heritage floral valley.", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600", path: "/details/valley-of-flowers" },
    { name: "Roopkund Glacial", desc: "Mystical high-altitude glacial lake.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", path: "/details/roopkund" }
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh", color: "#0f172a", paddingBottom: "80px" }}>
      
      {/* 1. Hero Banner Section with Sliding Background */}
      <div style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.85)), url('${heroImages[currentSlide]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px 100px 20px",
        textAlign: "center",
        color: "white",
        transition: "background-image 1s ease-in-out"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{ background: "rgba(56, 189, 248, 0.2)", color: "#38bdf8", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
            The Himalayas Premium Collection
          </span>
          <h1 style={{ fontSize: "40px", fontWeight: "900", margin: "16px 0 10px 0", letterSpacing: "-1px", lineHeight: "1.2" }}>
            Experience the True Spirit of the Himalayas
          </h1>
          <p style={{ fontSize: "15px", color: "#cbd5e1", marginBottom: "30px", fontWeight: "400" }}>
            Book Verified Mountain Stays, Sacred Char Dham Packages & Guided Treks Seamlessly
          </p>

          {/* Category Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "22px" }}>
            {[
              { id: "Hotels", label: "🏨 Stays & Hotels" },
              { id: "Yoga", label: "🌿 Yoga Retreats" },
              { id: "Treks", label: "⚡ Trekking Camps" }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "#0284c7" : "rgba(255, 255, 255, 0.15)",
                  color: "white",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "30px",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Clean Modern Search Bar */}
          <div style={{
            background: "white",
            borderRadius: "18px",
            padding: "18px 22px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            textAlign: "left",
            color: "#0f172a"
          }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 2, minWidth: "180px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>DESTINATION</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ width: "100%", padding: "11px 12px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#f8fafc", fontWeight: "600" }}
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 3, minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>KEYWORD</label>
                <input 
                  type="text" 
                  placeholder="Hotel name, location, or trek..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "11px 12px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: "120px", alignSelf: "flex-end" }}>
                <button type="submit" style={{
                  width: "100%", background: "#0284c7", color: "white", border: "none", padding: "12px", 
                  borderRadius: "10px", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)"
                }}>
                  SEARCH
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ maxWidth: "1200px", margin: "45px auto 0", padding: "0 20px" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "50px" }}>
          <div style={badgeCardStyle}><span style={{ fontSize: "26px" }}>🛡️</span><div><h4 style={{ margin: "0 0 2px 0", fontSize: "15px", fontWeight: "800" }}>100% Verified Properties</h4><p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Direct transparent pricing.</p></div></div>
          <div style={badgeCardStyle}><span style={{ fontSize: "26px" }}>⚡</span><div><h4 style={{ margin: "0 0 2px 0", fontSize: "15px", fontWeight: "800" }}>Instant Confirmation</h4><p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Vouchers on SMS & Email.</p></div></div>
          <div style={badgeCardStyle}><span style={{ fontSize: "26px" }}>📞</span><div><h4 style={{ margin: "0 0 2px 0", fontSize: "15px", fontWeight: "800" }}>24/7 Mountain Support</h4><p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Dedicated local assistance.</p></div></div>
        </div>

        {/* 2. Handpicked Stays & Retreats (Sliding Cards Layout Restored) */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>FEATURED ACCOMMODATIONS</span>
              <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", margin: "3px 0 0 0" }}>Handpicked Stays & Retreats</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button onClick={() => scrollStays("left", staysScrollRef)} style={navButtonStyle}>‹</button>
              <button onClick={() => scrollStays("right", staysScrollRef)} style={navButtonStyle}>›</button>
              <button onClick={() => navigate("/hotels")} style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: "800", cursor: "pointer", fontSize: "13px", marginLeft: "8px" }}>View All →</button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>🏔️ Loading Stays...</div>
          ) : (
            <div ref={staysScrollRef} style={horizontalScrollContainer}>
              {filteredListings.length > 0 ? (
                filteredListings.map((hotel) => (
                  <div key={hotel._id || hotel.name} style={largeCardStyle}>
                    <div style={{ position: "relative" }}>
                      <img src={hotel.image} alt={hotel.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"; }} />
                      <span style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(15, 23, 42, 0.85)", color: "white", padding: "3px 9px", borderRadius: "20px", fontSize: "11px", fontWeight: "800" }}>⭐ {hotel.rating || "4.8"}</span>
                    </div>
                    <div style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "130px" }}>
                      <div>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>📍 {hotel.location || hotel.city || "Himalayas"}</span>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "4px 0 6px 0", lineHeight: "1.2" }}>{hotel.name}</h3>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                        <div>
                          <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Starting from</span>
                          <span style={{ fontSize: "17px", fontWeight: "900", color: "#0f172a" }}>₹{hotel.price || "2,499"}</span>
                        </div>
                        <button onClick={() => navigate(`/hotels/${hotel._id || 'details'}`)} style={{ background: "#0284c7", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>View Details</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b", padding: "20px" }}>No stays available in this category.</p>
              )}
            </div>
          )}
        </div>

        {/* Big Graphic Banner replacing Food Section */}
        <div style={{
          margin: "50px 0",
          position: "relative",
          borderRadius: "22px",
          overflow: "hidden",
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "55px 40px",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}>
          <div style={{ maxWidth: "550px" }}>
            <span style={{ background: "#0284c7", color: "white", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              Himalayan Expedition 2026
            </span>
            <h2 style={{ fontSize: "32px", fontWeight: "900", margin: "14px 0 10px 0", lineHeight: "1.2" }}>
              Conquer the Highest Peaks with Expert Guides
            </h2>
            <p style={{ fontSize: "14px", color: "#e2e8f0", marginBottom: "24px", lineHeight: "1.5" }}>
              From Kedarkantha snow trails to Valley of Flowers, book certified mountaineering experts for a safe and breathtaking adventure.
            </p>
            <button 
              onClick={() => navigate("/search?tab=Treks")}
              style={{
                background: "white", color: "#0f172a", border: "none", padding: "12px 24px",
                borderRadius: "12px", fontWeight: "900", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
              }}
            >
              Explore Treks Now →
            </button>
          </div>
        </div>

        {/* Special Offer Banner */}
        <div style={{
          margin: "50px 0",
          background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
          borderRadius: "20px",
          padding: "35px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.3)"
        }}>
          <div>
            <span style={{ background: "rgba(255, 255, 255, 0.2)", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              ⚡ Special Limited Offer
            </span>
            <h2 style={{ fontSize: "26px", fontWeight: "900", margin: "12px 0 6px 0" }}>
              Get 20% OFF on Your First Char Dham Booking!
            </h2>
            <p style={{ fontSize: "14px", color: "#e0f2fe", margin: 0 }}>
              Use coupon code <strong style={{ background: "white", color: "#0369a1", padding: "2px 8px", borderRadius: "6px" }}>HIMALAYA20</strong> during checkout.
            </p>
          </div>
          <button 
            onClick={() => navigate("/search?tab=Hotels")}
            style={{
              background: "white", color: "#0369a1", border: "none", padding: "12px 24px",
              borderRadius: "12px", fontWeight: "900", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            Claim Offer Now
          </button>
        </div>

        {/* Yoga & Wellness Retreats */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#059669", textTransform: "uppercase", letterSpacing: "1px" }}>REJUVENATE BODY & SOUL</span>
            <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", margin: "3px 0 0 0" }}>Yoga & Wellness Retreats</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {yogaRetreats.map((item, idx) => (
              <div key={idx} style={largeCardStyle} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                <div style={{ padding: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.3" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Alpine Treks */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#d97706", textTransform: "uppercase", letterSpacing: "1px" }}>THRILLING EXPEDITIONS</span>
            <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", margin: "3px 0 0 0" }}>Popular Alpine Treks</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {popularTreks.map((item, idx) => (
              <div key={idx} style={largeCardStyle} onClick={() => navigate(item.path)}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                <div style={{ padding: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.3" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sacred Pilgrimage Section */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>SACRED DESTINATIONS</span>
            <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", margin: "3px 0 0 0" }}>Explore Pilgrimage & Char Dham</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {sacredPlaces.map((item, idx) => (
              <a key={idx} href={item.searchUrl} target="_blank" rel="noopener noreferrer" style={{ ...largeCardStyle, textDecoration: "none" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                <div style={{ padding: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>{item.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.3" }}>{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section style={{ marginTop: "50px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "45px 30px", borderRadius: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "24px", fontWeight: "900" }}>Why Choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "70px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "36px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>100+</h2>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>Verified Mountain Stays</p>
            </div>
            <div>
              <h2 style={{ fontSize: "36px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>10k+</h2>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>Happy Travelers</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const badgeCardStyle = {
  background: "white",
  padding: "20px 22px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
};

const navButtonStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "1px solid #cbd5e1",
  background: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0f172a",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
};

const horizontalScrollContainer = {
  display: "flex",
  gap: "20px",
  overflowX: "auto",
  paddingBottom: "12px",
  scrollBehavior: "smooth",
  scrollbarWidth: "none"
};

const largeCardStyle = {
  background: "#fff",
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
  cursor: "pointer",
  minWidth: "280px",
  width: "290px",
  flex: "0 0 auto",
  boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
  transition: "transform 0.2s ease"
};