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
    { n: "Badrinath", img: "/images/badrinath.jpg" },
    { n: "Gangotri", img: "/images/gangotri.jpg" },
    { n: "Yamunotri", img: "/images/yamunotri.jpg" },
    { n: "Haridwar", img: "/images/haridwar.jpg" },
    { n: "Rishikesh", img: "/images/rishikesh.jpg" }
  ];
  const yogaExperiences = [{ n: "Ayurvedic Therapy", img: "/images/yoga/ayurvedic-therapy.jpg" }, { n: "Himalayan Yoga", img: "/images/yoga/himalayan-yoga-retreat.jpg" }, { n: "Meditation", img: "/images/yoga/meditation-pranayama.jpg" }];
  const trekExperiences = [{ n: "Kedarkantha", img: "/images/treks/kedarkantha.jpg" }, { n: "Valley of Flowers", img: "/images/treks/valley-of-flowers.jpg" }, { n: "Roopkund", img: "/images/treks/roopkund.jpg" }];

  const renderScrollSection = (title, data, category) => (
    <section className="section-wrapper" style={{ marginBottom: "50px" }}>
      <h2 className="section-title" style={{ fontSize: "22px", fontWeight: "600", color: "#1b4d3e", marginBottom: "20px", borderLeft: "4px solid #00b074", paddingLeft: "12px" }}>{title}</h2>
      <div className="horizontal-scroll-container" style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "10px" }}>
        {data.map((item, i) => (
          <div key={i} className="scroll-item card" style={{ minWidth: "220px", background: "white", borderRadius: "12px", overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", transition: "transform 0.3s" }} onClick={() => {
              if (["tourism", "yoga", "trek"].includes(category)) {
                window.open(`https://www.google.com/search?q=${item.n || item.name}`, "_blank");
              } else {
                navigate(`/details/${category}/${item.n || item.name}`);
              }
            }}>
            <img src={item.img} alt={item.n || item.name} className="consistent-card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} />
            <div style={{ padding: "15px", textAlign: "center", fontWeight: "600", color: "#444", fontSize: "15px" }}>{item.n || item.name}</div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="home-container" style={{ backgroundColor: "#f9fbfd", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* Modern Header / Navbar simulation if needed or keeping layout clean */}
      <header style={{ background: "#ffffff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 1000, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 50px", marginBottom: "30px" }}>
        <div className="logo" style={{ fontSize: "24px", fontWeight: "700", color: "#1b4d3e" }}>The Himalayans</div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000')", 
        height: "420px", backgroundSize: "cover", backgroundPosition: "center", display: "flex", 
        flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", 
        textAlign: "center", position: "relative", padding: "0 20px"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700", textShadow: "0 2px 4px rgba(0,0,0,0.3)", marginBottom: "25px" }}>
          Find your next escape
        </h1>

        {/* Dynamic Floating Search Bar inside Hero */}
        <div className="hero-search-refined" style={{ background: "white", padding: "10px 20px", borderRadius: "50px", display: "flex", alignItems: "center", gap: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", width: "100%", maxWidth: "600px" }}>
          <input 
            type="text" 
            placeholder="Where to?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            style={{ border: "none", outline: "none", padding: "10px", fontSize: "14px", flex: 1, background: "transparent", color: "#333" }}
          />
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ border: "none", outline: "none", padding: "10px", fontSize: "14px", background: "transparent", color: "#555", cursor: "pointer" }}>
            {cityOptions.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button type="button" onClick={handleSearch} className="search-main-btn" style={{ backgroundColor: "#00b074", color: "white", border: "none", padding: "12px 25px", borderRadius: "30px", fontWeight: "600", cursor: "pointer" }}>Search</button>
        </div>
      </section>

      <div className="home-content" style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
        {renderScrollSection("Uttarakhand Tourism", uttarakhandExperiences, "tourism")}
        {renderScrollSection("Yoga & Wellness", yogaExperiences, "yoga")}
        {renderScrollSection("Popular Treks", trekExperiences, "trek")}

        <section className="section-wrapper" style={{ marginBottom: "50px" }}>
          <h2 className="section-title" style={{ fontSize: "22px", fontWeight: "600", color: "#1b4d3e", marginBottom: "20px", borderLeft: "4px solid #00b074", paddingLeft: "12px" }}>Featured Properties</h2>
          {filteredListings.length > 0 ? (
            <div className="home-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {filteredListings.map((h) => (
                <div key={h.id} className="home-card card" style={{ background: "white", borderRadius: "12px", overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", transition: "transform 0.3s" }} onClick={() => navigate(`/details/${h.type}/${h.id}`)}>
                  <img src={h.image} alt={h.name} className="consistent-card-img" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  <div className="card-info" style={{ padding: "15px" }}>
                    <h3 style={{ fontSize: "18px", color: "#333", marginBottom: "5px" }}>{h.name}</h3>
                    <p style={{ fontSize: "14px", color: "#777" }}>{h.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results-container" style={{ textAlign: "center", padding: "50px", background: "white", borderRadius: "12px" }}>
              <h2>Sorry, we couldn't find "{displaySearch}."</h2>
              <button className="add-place-btn" onClick={() => {setSearchTerm(""); setDisplaySearch(""); setSelectedCity("All");}} style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#00b074", color: "white", border: "none", borderRadius: "20px", cursor: "pointer" }}>Clear Search</button>
            </div>
          )}
        </section>

        {/* Why Choose Us Section */}
        <section className="trust-section" style={{ backgroundColor: "#0b2522", color: "white", padding: "60px 20px", textAlign: "center", borderRadius: "16px", marginTop: "60px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "40px", fontWeight: "600" }}>Why choose The Himalayans?</h2>
          <div className="trust-grid" style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
            <div className="trust-card" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "30px 50px", borderRadius: "12px", minWidth: "250px" }}>
              <h3 style={{ fontSize: "36px", color: "#00e5bc", marginBottom: "10px" }}>100+</h3>
              <p style={{ fontSize: "16px", color: "#ccc" }}>Verified Stays</p>
            </div>
            <div className="trust-card" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 2, 0.1)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "30px 50px", borderRadius: "12px", minWidth: "250px" }}>
              <h3 style={{ fontSize: "36px", color: "#00e5bc", marginBottom: "10px" }}>10k+</h3>
              <p style={{ fontSize: "16px", color: "#ccc" }}>Happy Travelers</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}