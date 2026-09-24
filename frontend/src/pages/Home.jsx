import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

const HERO_IMAGES = [
  "/images/hotals/Hotel Nagraja Palace1.jpg",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200"
];

const LOCAL_UTTARKASHI_HOTELS = [
  { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "/images/hotals/Hotel Nagraja Palace1.jpg", location: "Gangotri Hwy", price: "2,499", rating: "4.8", category: "Hotels" },
  { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay1.jpg", location: "NH 34", price: "1,899", rating: "4.9", category: "Hotels" },
  { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Barahat Range", price: "2,199", rating: "4.7", category: "Hotels" },
  { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "Near Medicose", price: "2,200", rating: "4.6", category: "Hotels" },
  { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", location: "ITBP Rd", price: "1,599", rating: "4.8", category: "Hotels" },
  { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", location: "Main Market", price: "2,799", rating: "4.9", category: "Hotels" },
  { _id: "dummy_01", name: "Snow Peak Luxury Villa", city: "Harsil", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600", location: "Apple Orchards", price: "4,500", rating: "5.0", category: "Hotels" },
  { _id: "dummy_02", name: "Ganga Riverside Glamping", city: "Rishikesh", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600", location: "Brahmapuri", price: "3,200", rating: "4.9", category: "Hotels" },
  { _id: "local_07", name: "Ganges Riverside Ashram", city: "Rishikesh", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank", price: "1,899", rating: "4.9", category: "Yoga" },
  { _id: "local_08", name: "Kedarkantha Base Cottage", city: "Sankri", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Sankri", price: "3,199", rating: "4.7", category: "Treks" }
];

const UTTARAKHAND_DISTRICTS = [
  { id: "uttarkashi", name: "Uttarkashi", tagline: "Mountain Rajma & Trekking", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", food: "Pahari Rajma, Red Rice" },
  { id: "tehri", name: "Tehri Garhwal", tagline: "Lake View Delicacies", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", food: "Chainsoo, Gahat Dal" },
  { id: "dehradun", name: "Dehradun & Mussoorie", tagline: "Cafes & Mountain Flavors", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", food: "Kafuli, Bal Mithai" },
  { id: "nainital", name: "Nainital", tagline: "Kumaoni Flavors & Lakes", image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=600&q=80", food: "Bhatt ki Churkani, Aloo Gutke" }
];

const SACRED_PLACES = [
  { name: "Kedarnath", desc: "Sacred shrine nestled in Garhwal Himalayas.", img: "/images/chardham/kedarnath.jpg", searchUrl: "https://www.google.com/search?q=Kedarnath+Dham+guide" },
  { name: "Badrinath", desc: "Holy divine abode of Lord Vishnu.", img: "/images/chardham/badrinath.jpg", searchUrl: "https://www.google.com/search?q=Badrinath+Dham+guide" },
  { name: "Gangotri", desc: "Pristine origin point of holy river Ganga.", img: "/images/chardham/gangotri.jpg", searchUrl: "https://www.google.com/search?q=Gangotri+temple+guide" },
  { name: "Yamunotri", desc: "Sacred source of the Yamuna River.", img: "/images/chardham/yamunotri.jpg", searchUrl: "https://www.google.com/search?q=Yamunotri+temple+guide" }
];

const YOGA_RETREATS = [
  { name: "Himalayan Sanctuary", desc: "Deep meditation in mountain silence.", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600", path: "/details/himalayan-yoga" },
  { name: "Ayurvedic Wellness", desc: "Holistic healing through herbs.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", path: "/details/ayurvedic-therapy" },
  { name: "Meditation & Pranayama", desc: "Master breath by the sacred Ganges.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600", path: "/details/meditation" },
  { name: "Panchakarma Detox", desc: "Complete body purification stay.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", path: "/details/panchakarma" }
];

const POPULAR_TREKS = [
  { name: "Kedarkantha Trek", desc: "Classic snow trail expedition with views.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", path: "/details/kedarkantha" },
  { name: "Valley of Flowers", desc: "UNESCO World Heritage floral valley.", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600", path: "/details/valley-of-flowers" },
  { name: "Roopkund Glacial", desc: "Mystical high-altitude glacial lake.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", path: "/details/roopkund" },
  { name: "Har Ki Dun", desc: "Ancient cradle of Swargarohini.", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", path: "/details/harkidun" }
];

const MAJOR_CITIES = ["All", "Rishikesh", "Uttarkashi", "Kedarnath", "Badrinath", "Haridwar", "Dehradun"];

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hotels");
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Advanced Form States for Serious Agents & Drivers
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    agencyName: "",
    gstin: "",
    travelDate: "",
    groupSize: "1-5 Persons",
    roomCount: "2-4 Rooms",
    vehicleType: "Tempo Traveller (12-26 Seater)",
    yatraRegistration: "Yes - Completed",
    route: "Yamunotri & Gangotri Route"
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAgentFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.travelDate) {
      alert("Please fill in all required fields (Name, Phone, Travel Date).");
      return;
    }
    setIsFormSubmitted(true);
  };

  // WhatsApp pre-filled message
  const whatsappMessage = encodeURIComponent(
    `Hello, I am a serious travel agent/driver. Here are my booking inquiry details:\n\n*Name:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Agency:* ${formData.agencyName || "N/A"}\n*GSTIN/ID:* ${formData.gstin || "N/A"}\n*Travel Date:* ${formData.travelDate}\n*Group Size:* ${formData.groupSize}\n*Rooms Required:* ${formData.roomCount}\n*Vehicle Type:* ${formData.vehicleType}\n*Yatra Status:* ${formData.yatraRegistration}\n*Route:* ${formData.route}`
  );

  const staysScrollRef = useRef(null);

  const scrollStays = useCallback((direction) => {
    if (staysScrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      staysScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  const shuffleArray = useCallback((array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios.get(`${BACKEND_URL}/api/hotels`, { signal: controller.signal })
      .then((res) => {
        const rawData = Array.isArray(res.data) ? res.data : [];
        const backendData = rawData.map(item => ({
          ...item,
          price: item.price || "2,499",
          rating: item.rating || "4.8",
          category: item.category || "Hotels",
          image: item.image || item.img || "/images/hotals/Hotel Nagraja Palace1.jpg"
        }));
        
        const merged = [
          ...LOCAL_UTTARKASHI_HOTELS, 
          ...backendData.filter(bh => bh._id && !String(bh._id).startsWith("local_") && !String(bh._id).startsWith("dummy_"))
        ];
        
        setHotels(shuffleArray(merged));
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error("Backend fetch error:", err);
        setHotels(shuffleArray(LOCAL_UTTARKASHI_HOTELS));
        setLoading(false);
      });

    return () => controller.abort();
  }, [shuffleArray]);

  const dbCities = useMemo(() => [...new Set(hotels.map((h) => h.location || h.city).filter(Boolean))], [hotels]);
  const cityOptions = useMemo(() => [...new Set([...MAJOR_CITIES, ...dbCities])], [dbCities]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(selectedCity)}&tab=${encodeURIComponent(activeTab)}`);
  };

  const filteredListings = useMemo(() => {
    return hotels.filter((item) => {
      const itemName = (item.name || "").trim().toLowerCase();
      if (itemName === "ravi govindam") return false;
      
      const matchesCategory = item.category 
        ? String(item.category).trim().toLowerCase() === String(activeTab).trim().toLowerCase()
        : true;

      const matchesCity = selectedCity === "All" 
        ? true 
        : String(item.location || item.city || "").trim().toLowerCase() === String(selectedCity).trim().toLowerCase();

      return matchesCategory && matchesCity;
    });
  }, [hotels, activeTab, selectedCity]);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0f172a", color: "#f8fafc", minHeight: "100vh", paddingBottom: "70px", overflowX: "hidden", width: "100%", boxSizing: "border-box" }}>
      
      {/* Compact & Sleek Hero / Partner Verification Section (Designed to take less vertical space) */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "1.2fr 1fr", 
        minHeight: "460px", 
        background: "#0f172a", 
        color: "#ffffff",
        borderBottom: "1px solid #334155"
      }} className="orn-hero-grid">
        
        {/* Left Dark Content Box */}
        <div style={{ 
          padding: "35px 40px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          background: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('${HERO_IMAGES[currentSlide]}') center/cover`,
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          boxSizing: "border-box"
        }}>
          <span style={{ 
            color: "#38bdf8", 
            fontWeight: "800", 
            fontSize: "11px", 
            letterSpacing: "1.5px", 
            textTransform: "uppercase", 
            marginBottom: "8px",
            display: "inline-block"
          }}>
            ✨ Char Dham Special Partner Program
          </span>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: "900", lineHeight: "1.2", margin: "0 0 12px 0", letterSpacing: "-0.5px" }}>
            Hotel Bookings for Verified Travel Agents & Drivers.
          </h1>
          <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: "0 0 18px 0", lineHeight: "1.5" }}>
            Connect with us directly for group stays, driver accommodation, and confirmed room allocations on Gangotri and Yamunotri Dham routes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "✔️ Confirmed inventory across Barkot, Yamunotri, and Gangotri",
              "✔️ Special B2B rates and dedicated arrangements for transport operators",
              "✔️ Fill verification details on the right to instantly unlock WhatsApp & rates"
            ].map((text, idx) => (
              <div key={idx} style={{ fontSize: "13px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "8px" }}>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Light Form Box (Compact & Sleek Serious Agent Verification Form) */}
        <div style={{ 
          background: "#ffffff", 
          padding: "25px 35px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          color: "#1f2937",
          boxSizing: "border-box"
        }}>
          <div style={{ maxWidth: "420px", width: "100%", margin: "0 auto" }}>
            
            {!isFormSubmitted ? (
              <>
                <h3 style={{ fontSize: "18px", fontWeight: "750", margin: "0 0 2px 0", color: "#0f172a" }}>
                  Partner Agent Verification Form
                </h3>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 12px 0" }}>
                  Fill travel details to filter spam and get instant direct access.
                </p>

                <form onSubmit={handleAgentFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="Your Name" 
                        value={formData.fullName}
                        onChange={handleFormChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="10-digit mobile" 
                        value={formData.phone}
                        onChange={handleFormChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={labelStyle}>Agency / Company</label>
                      <input 
                        type="text" 
                        name="agencyName"
                        placeholder="Agency Name" 
                        value={formData.agencyName}
                        onChange={handleFormChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>GSTIN / ID Proof (Opt)</label>
                      <input 
                        type="text" 
                        name="gstin"
                        placeholder="GSTIN or ID" 
                        value={formData.gstin}
                        onChange={handleFormChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={labelStyle}>Travel Date *</label>
                      <input 
                        type="date" 
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleFormChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Group Size</label>
                      <select name="groupSize" value={formData.groupSize} onChange={handleFormChange} style={inputStyle}>
                        <option value="1-5 Persons">1 - 5 Persons</option>
                        <option value="6-15 Persons">6 - 15 Persons</option>
                        <option value="16+ Persons">16+ Large Group</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={labelStyle}>Rooms Required</label>
                      <select name="roomCount" value={formData.roomCount} onChange={handleFormChange} style={inputStyle}>
                        <option value="1 Room">1 Room</option>
                        <option value="2-4 Rooms">2 - 4 Rooms</option>
                        <option value="5-10 Rooms">5 - 10 Rooms</option>
                        <option value="10+ Rooms">10+ Group Rooms</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Vehicle Type</label>
                      <select name="vehicleType" value={formData.vehicleType} onChange={handleFormChange} style={inputStyle}>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                        <option value="Mini Bus">Mini Bus</option>
                        <option value="Personal Car/Cab">Personal Cab</option>
                        <option value="Standard Bus">Standard Bus</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={labelStyle}>Yatra Registration</label>
                      <select name="yatraRegistration" value={formData.yatraRegistration} onChange={handleFormChange} style={inputStyle}>
                        <option value="Yes - Completed">Yes - Completed</option>
                        <option value="Pending / In Process">Pending / Process</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Preferred Route</label>
                      <select name="route" value={formData.route} onChange={handleFormChange} style={inputStyle}>
                        <option value="Yamunotri & Gangotri Route">Both Routes</option>
                        <option value="Yamunotri Route Only">Yamunotri Only</option>
                        <option value="Gangotri Route Only">Gangotri Only</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" style={{ 
                    background: "#ef4444", 
                    color: "#ffffff", 
                    border: "none", 
                    padding: "10px", 
                    borderRadius: "6px", 
                    fontWeight: "700", 
                    fontSize: "13.5px", 
                    cursor: "pointer",
                    marginTop: "2px",
                    transition: "background 0.2s"
                  }}>
                    Verify Details & Unlock WhatsApp
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "15px 0" }}>
                <div style={{ fontSize: "38px", marginBottom: "6px" }}>✅</div>
                <h3 style={{ fontSize: "18px", fontWeight: "750", color: "#0f172a", margin: "0 0 6px 0" }}>
                  Verification Successful!
                </h3>
                <p style={{ fontSize: "13px", color: "#4b5563", margin: "0 0 16px 0", lineHeight: "1.4" }}>
                  Thank you, <b>{formData.fullName}</b>. Click below to chat instantly on WhatsApp.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a 
                    href={`https://wa.me/91YOUR_PHONE_NUMBER?text=${whatsappMessage}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      background: "#22c55e", 
                      color: "#ffffff", 
                      padding: "10px", 
                      borderRadius: "6px", 
                      textDecoration: "none", 
                      fontWeight: "700", 
                      fontSize: "13.5px",
                      display: "block"
                    }}
                  >
                    🟢 Open WhatsApp Chat Now
                  </a>
                  <button 
                    onClick={() => setIsFormSubmitted(false)}
                    style={{ background: "transparent", border: "1px solid #cbd5e1", padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", color: "#64748b" }}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            )}

            <p style={{ fontSize: "10.5px", color: "#9ca3af", textAlign: "center", marginTop: "10px", lineHeight: "1.3" }}>
              🔒 Spam protection enabled. Only genuine agent requests are entertained.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div style={{ maxWidth: "1240px", margin: "40px auto 0", padding: "0 20px", boxSizing: "border-box" }}>
        
        {/* Trust Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "50px" }}>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "28px" }}>🛡️</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#fff", fontSize: "15px", fontWeight: "800" }}>100% Verified Properties</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Direct verified stays with best prices.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "28px" }}>⚡</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#fff", fontSize: "15px", fontWeight: "800" }}>Instant Confirmation</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Get booking details instantly on SMS.</p>
            </div>
          </div>
          <div style={badgeCardStyle}>
            <span style={{ fontSize: "28px" }}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 2px 0", color: "#fff", fontSize: "15px", fontWeight: "800" }}>24/7 Mountain Support</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Dedicated local assistance during travel.</p>
            </div>
          </div>
        </div>

        {/* Handpicked Stays */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1.5px" }}>FEATURED ACCOMMODATIONS</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>
                Handpicked Stays & Retreats
              </h2>
            </div>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() => scrollStays("left")} style={navButtonStyle}>‹</button>
              <button onClick={() => scrollStays("right")} style={navButtonStyle}>›</button>
              <button 
                onClick={() => navigate("/hotels")}
                style={{ background: "transparent", border: "none", color: "#38bdf8", fontWeight: "800", cursor: "pointer", fontSize: "14px", marginLeft: "8px" }}
              >
                View All →
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", fontSize: "15px", color: "#94a3b8" }}>🏔️ Loading Verified Stays...</div>
          ) : (
            <div 
              ref={staysScrollRef}
              style={horizontalScrollContainer}
            >
              {filteredListings.length > 0 ? (
                filteredListings.map((hotel) => (
                  <div 
                    key={hotel._id}
                    onClick={() => navigate(`/hotels/${hotel._id}`)}
                    className="hover-card"
                    style={largeCardStyle}
                  >
                    <div style={{ position: "relative" }}>
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        loading="lazy"
                        style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                        onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
                      />
                      <span style={{
                        position: "absolute", top: "12px", right: "12px", background: "rgba(15, 23, 42, 0.85)",
                        color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "800"
                      }}>
                        ⭐ {hotel.rating || "4.8"}
                      </span>
                    </div>

                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1, boxSizing: "border-box" }}>
                      <div>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          📍 {hotel.location || hotel.city}
                        </span>
                        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "6px 0 8px 0", lineHeight: "1.3" }}>
                          {hotel.name}
                        </h3>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #334155", paddingTop: "12px", marginTop: "8px" }}>
                        <div>
                          <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>Starting from</span>
                          <span style={{ fontSize: "16px", fontWeight: "900", color: "#fff" }}>₹{hotel.price || "2,499"}</span>
                        </div>
                        <span 
                          style={{
                            background: "#0284c7", color: "white", padding: "6px 12px",
                            borderRadius: "8px", fontWeight: "700", fontSize: "12px"
                          }}
                        >
                          Details
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#94a3b8", padding: "20px" }}>No stays available in this category/location.</p>
              )}
            </div>
          )}
        </div>

        {/* Special Offer Banner */}
        <div style={{
          margin: "50px 0",
          background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
          borderRadius: "20px",
          padding: "30px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 20px 25px -5px rgba(2, 132, 199, 0.3)",
          boxSizing: "border-box"
        }}>
          <div>
            <span style={{ background: "rgba(255, 255, 255, 0.2)", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              ⚡ Limited Period Offer (विशेष ऑफर)
            </span>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: "900", margin: "12px 0 8px 0" }}>
              Get 20% OFF on Your First Char Dham Booking!
            </h2>
            <p style={{ fontSize: "14px", color: "#e0f2fe", margin: 0, maxWidth: "600px", lineHeight: "1.5" }}>
              Use code <strong style={{ background: "white", color: "#0369a1", padding: "2px 8px", borderRadius: "4px" }}>HIMALAYA20</strong> during checkout to avail instant discount on verified stays and packages.
            </p>
          </div>
          <button 
            onClick={() => navigate("/search?tab=Hotels")}
            style={{
              background: "#0f172a", color: "white", border: "none", padding: "14px 26px",
              borderRadius: "12px", fontWeight: "900", fontSize: "14px", cursor: "pointer",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)", width: "100%", maxWidth: "210px"
            }}
          >
            Claim Offer Now
          </button>
        </div>

        {/* Yoga & Wellness */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#34d399", textTransform: "uppercase", letterSpacing: "1.5px" }}>REJUVENATE BODY & SOUL</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>Yoga & Wellness Retreats</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {YOGA_RETREATS.map((item, idx) => (
              <div key={idx} onClick={() => navigate(item.path)} className="hover-card" style={largeCardStyle}>
                <img 
                  src={item.img} 
                  alt={item.name}
                  loading="lazy"
                  style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} 
                />
                <div style={{ padding: "16px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yoga Section Special Banner */}
        <div style={{
          maxWidth: "1200px",
          margin: "40px auto",
          background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
          borderRadius: "20px",
          padding: "25px 30px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 25px -5px rgba(6, 95, 70, 0.3)",
          flexWrap: "wrap",
          gap: "20px",
          boxSizing: "border-box"
        }}>
          <div>
            <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              🧘 Wellness Special
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: "900", margin: "10px 0 5px 0" }}>
              Flat 25% OFF on 7-Day Himalayan Yoga & Meditation Retreats!
            </h3>
            <p style={{ fontSize: "13px", color: "#a7f3d0", margin: 0 }}>
              Use code <strong style={{ color: "#fff" }}>YOGA25</strong> to get free Ayurvedic consultation and organic herbal meals included.
            </p>
          </div>
          <button 
            onClick={() => navigate("/search?tab=Yoga")}
            style={{
              background: "#ffffff",
              color: "#065f46",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
          >
            Claim Wellness Offer ✨
          </button>
        </div>

        {/* Popular Treks */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "1.5px" }}>THRILLING EXPEDITIONS</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>Popular Alpine Treks</h2>
          </div>
          <div style={horizontalScrollContainer}>
            {POPULAR_TREKS.map((item, idx) => (
              <div key={idx} onClick={() => navigate(item.path)} className="hover-card" style={largeCardStyle}>
                <img 
                  src={item.img} 
                  alt={item.name}
                  loading="lazy"
                  style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} 
                />
                <div style={{ padding: "16px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treks Section Special Banner */}
        <div style={{
          maxWidth: "1200px",
          margin: "40px auto",
          background: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
          borderRadius: "20px",
          padding: "25px 30px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 25px -5px rgba(194, 65, 12, 0.3)",
          flexWrap: "wrap",
          gap: "20px",
          boxSizing: "border-box"
        }}>
          <div>
            <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              ⛺ Trekker's Club Offer
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: "900", margin: "10px 0 5px 0" }}>
              Book Kedarkantha or Roopkund Trek & Get Free Camping Gear!
            </h3>
            <p style={{ fontSize: "13px", color: "#fed7aa", margin: 0 }}>
              Use code <strong style={{ color: "#fff" }}>TREKFREE</strong> at checkout. Includes professional guide & certified safety kits.
            </p>
          </div>
          <button 
            onClick={() => navigate("/search?tab=Treks")}
            style={{
              background: "#ffffff",
              color: "#c2410c",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
          >
            Unlock Trek Deal 🎒
          </button>
        </div>

        {/* Pilgrimage Section */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              SACRED DESTINATIONS
            </span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>
              Explore Pilgrimage & Char Dham
            </h2>
          </div>

          <div style={horizontalScrollContainer}>
            {SACRED_PLACES.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => window.open(item.searchUrl, "_blank")}
                className="hover-card"
                style={largeCardStyle}
              >
                <img 
                  src={item.img} 
                  alt={item.name}
                  loading="lazy"
                  style={{ width: "100%", height: "170px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }} 
                />
                <div style={{ padding: "16px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#fff", margin: "0 0 6px 0" }}>{item.name}</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Districts & Local Food Section */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1.5px" }}>HIMALAYAN CULTURE & CUISINE</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "900", color: "#fff", margin: "4px 0 0 0" }}>
                Explore Districts & Local Food
              </h2>
            </div>
            <button 
              onClick={() => navigate("/districts")}
              style={{ background: "transparent", border: "none", color: "#38bdf8", fontWeight: "800", cursor: "pointer", fontSize: "14px" }}
            >
              View All Culture →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {UTTARAKHAND_DISTRICTS.map((dist) => (
              <div 
                key={dist.id}
                onClick={() => navigate("/districts")}
                className="hover-card"
                style={{
                  background: "#1e293b", borderRadius: "16px", overflow: "hidden",
                  border: "1px solid #334155", cursor: "pointer",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)", transition: "all 0.2s ease"
                }}
              >
                <img 
                  src={dist.image} 
                  alt={dist.name}
                  loading="lazy"
                  style={{ width: "100%", height: "160px", objectFit: "cover" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
                />
                <div style={{ padding: "16px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>{dist.name}</h3>
                  <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 12px 0" }}>{dist.tagline}</p>
                  <span style={{ background: "rgba(52, 211, 153, 0.1)", color: "#34d399", fontSize: "11px", fontWeight: "700", padding: "5px 10px", borderRadius: "6px", display: "inline-block", border: "1px solid rgba(52, 211, 153, 0.2)" }}>
                    🍽️ {dist.food}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section style={{ marginTop: "50px", background: "#1e293b", color: "#fff", padding: "40px 20px", borderRadius: "16px", textAlign: "center", border: "1px solid #334155", boxSizing: "border-box" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginBottom: "25px", fontWeight: "900" }}>Why Choose The Himalayans?</h2>
          <div style={{ display: "flex", justifyContent: "space-around", gap: "30px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "40px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>100+</h2>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px", fontWeight: "600" }}>Verified Mountain Stays</p>
            </div>
            <div>
              <h2 style={{ fontSize: "40px", color: "#38bdf8", fontWeight: "900", margin: 0 }}>10k+</h2>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px", fontWeight: "600" }}>Happy Travelers</p>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          border-color: #38bdf8 !important;
          box-shadow: 0 15px 30px -5px rgba(56, 189, 248, 0.2) !important;
        }
        @media (max-width: 968px) {
          .orn-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: "block", 
  fontSize: "10.5px", 
  fontWeight: "600", 
  marginBottom: "2px", 
  color: "#374151"
};

const inputStyle = {
  width: "100%", 
  padding: "6px 8px", 
  borderRadius: "5px", 
  border: "1px solid #cbd5e1", 
  fontSize: "12.5px",
  outline: "none",
  boxSizing: "border-box",
  background: "#ffffff",
  color: "#1f2937"
};

const horizontalScrollContainer = {
  display: "flex",
  gap: "20px",
  overflowX: "auto",
  paddingBottom: "10px",
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  msOverflowStyle: "none"
};

const largeCardStyle = {
  minWidth: "280px",
  maxWidth: "280px",
  background: "#1e293b",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #334155",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
  scrollSnapAlign: "start",
  flexShrink: 0,
  transition: "all 0.2s ease",
  boxSizing: "border-box"
};

const badgeCardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #334155",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
  boxSizing: "border-box"
};

const navButtonStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "1px solid #475569",
  background: "#1e293b",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff"
};