import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  const initialCity = queryParams.get("city") || "All";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedFilters, setSelectedFilters] = useState({
    freeCancellation: false,
    breakfastIncluded: false,
    homestay: false,
    hotel: false,
    cottage: false
  });

  // आपके सभी 16 ओरिजिनल उत्तराखंड/उत्तरकाशी होटल्स
  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", location: "Gangotri Hwy, Uttarkashi", price: 2499, rating: "4.8", category: "Hotel" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600", location: "NH 34, Uttarkashi", price: 1899, rating: "4.9", category: "Homestay" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", location: "Barahat Range, Uttarkashi", price: 2199, rating: "4.7", category: "Hotel" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600", location: "Near Medicose, Uttarkashi", price: 2200, rating: "4.6", category: "Hotel" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600", location: "ITBP Rd, Uttarkashi", price: 1599, rating: "4.8", category: "Homestay" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600", location: "Main Market, Uttarkashi", price: 2799, rating: "4.9", category: "Hotel" },
    { _id: "local_07", name: "Riverside Retreat", city: "Maneri", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank, Uttarkashi", price: 1899, rating: "4.9", category: "Cottage" },
    { _id: "local_08", name: "Gangotri View Inn", city: "Gangori", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", location: "Gangori Bridge, Uttarkashi", price: 3199, rating: "4.7", category: "Hotel" },
    { _id: "local_09", name: "Green Valley Homestay", city: "Matli", image: "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600", location: "Village Road, Uttarkashi", price: 1799, rating: "4.8", category: "Homestay" },
    { _id: "local_10", name: "Uttarkashi Guest House", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600", location: "Old Town, Uttarkashi", price: 2099, rating: "4.5", category: "Hotel" },
    { _id: "local_11", name: "Mountain Peak Hotel", city: "Dunda", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", location: "Dunda Main Rd, Uttarkashi", price: 2599, rating: "4.7", category: "Hotel" },
    { _id: "local_12", name: "Peaceful Stay", city: "Matli", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600", location: "Valley View, Uttarkashi", price: 1699, rating: "4.8", category: "Homestay" },
    { _id: "local_13", name: "Char Dham Camp", city: "Gangotri Rd", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Near Highway, Uttarkashi", price: 2999, rating: "4.9", category: "Cottage" },
    { _id: "local_14", name: "Sunrise Residency", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=600", location: "Tiloth Road, Uttarkashi", price: 2199, rating: "4.6", category: "Hotel" },
    { _id: "local_15", name: "Nature's Nest", city: "Athali", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600", location: "Orchard Side, Uttarkashi", price: 1999, rating: "4.8", category: "Homestay" },
    { _id: "local_16", name: "Skyline Hotel", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600", location: "City Center, Uttarkashi", price: 2899, rating: "4.7", category: "Hotel" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = (res.data || []).map(item => ({
          ...item,
          price: Number(item.price) || 2499,
          rating: item.rating || "4.8",
          location: item.location || item.city || "Uttarkashi",
          category: item.category || "Hotel",
          image: item.image || item.img || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
        }));
        const merged = [...localUttarkashiHotels, ...backendData.filter(bh => !bh._id.startsWith("local_"))];
        setHotels(merged);
        setLoading(false);
      })
      .catch(() => {
        setHotels(localUttarkashiHotels);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (filterName) => {
    setSelectedFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  // Check if searched city/query is outside Uttarkashi region
  const uttarkashiKeywords = ["uttarkashi", "matli", "athali", "maneri", "gangori", "dunda", "gangotri", "tiloth", "all"];
  const isUttarkashiQuery = () => {
    const q = searchTerm.toLowerCase();
    const c = selectedCity.toLowerCase();
    if (c === "all") return true;
    return uttarkashiKeywords.some(kw => q.includes(kw) || c.includes(kw));
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (hotel.location && hotel.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (hotel.city && hotel.city.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = selectedCity === "All" || (hotel.city && hotel.city.toLowerCase() === selectedCity.toLowerCase()) || (hotel.location && hotel.location.toLowerCase().includes(selectedCity.toLowerCase()));
    
    if (selectedFilters.homestay && hotel.category !== "Homestay") return false;
    if (selectedFilters.hotel && hotel.category !== "Hotel") return false;
    if (selectedFilters.cottage && hotel.category !== "Cottage") return false;

    return matchesSearch && matchesCity;
  });

  const showComingSoon = !isUttarkashiQuery() || (filteredHotels.length === 0 && searchTerm.trim() !== "");

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: "50px" }}>
      
      {/* Top Search Bar Header */}
      <div style={{ background: "#0b132b", padding: "20px", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <input 
            type="text" 
            placeholder="Search hotel or location (e.g. Uttarkashi)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 2, padding: "10px 14px", borderRadius: "8px", border: "none", outline: "none", fontSize: "14px" }}
          />
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", outline: "none", fontSize: "14px", fontWeight: "600" }}
          >
            <option value="All">All Regions</option>
            <option value="Uttarkashi">Uttarkashi</option>
            <option value="Matli">Matli</option>
            <option value="Athali">Athali</option>
            <option value="Maneri">Maneri</option>
            <option value="Dunda">Dunda</option>
          </select>
          <button 
            onClick={() => {}} 
            style={{ background: "#0284c7", color: "white", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: "1200px", margin: "30px auto", padding: "0 20px" }}>
        
        {/* अगर उत्तरकाशी के अलावा किसी अन्य शहर का सर्च हो या रिजल्ट न मिले */}
        {showComingSoon ? (
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "60px 20px",
            textAlign: "center",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            maxWidth: "700px",
            margin: "40px auto"
          }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "15px" }}>🚧</span>
            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>
              Expanding Soon to New Himalayan Regions!
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.6", maxWidth: "550px", margin: "0 auto 25px auto" }}>
              Currently, we feature handpicked verified stays exclusively across <strong>Uttarkashi & Surrounding Valleys</strong>. We are actively onboarding verified properties for your searched destination. Stay tuned!
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button 
                onClick={() => { setSearchTerm("Uttarkashi"); setSelectedCity("Uttarkashi"); }}
                style={{ background: "#0284c7", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
              >
                Explore Uttarkashi Stays
              </button>
              <button 
                onClick={() => navigate("/")}
                style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "24px", alignItems: "flex-start" }}>
            
            {/* Left Sidebar Filters */}
            <div style={{ background: "white", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "800", marginBottom: "15px", color: "#0f172a" }}>Select Filters</h3>
              
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#64748b", marginBottom: "10px", textTransform: "uppercase" }}>Property Type</h4>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", marginBottom: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={selectedFilters.hotel} onChange={() => handleCheckboxChange("hotel")} /> Hotels
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", marginBottom: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={selectedFilters.homestay} onChange={() => handleCheckboxChange("homestay")} /> Homestays
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                  <input type="checkbox" checked={selectedFilters.cottage} onChange={() => handleCheckboxChange("cottage")} /> Cottages
                </label>
              </div>

              <div>
                <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#64748b", marginBottom: "10px", textTransform: "uppercase" }}>Popular Filters</h4>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", marginBottom: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={selectedFilters.freeCancellation} onChange={() => handleCheckboxChange("freeCancellation")} /> Free Cancellation
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                  <input type="checkbox" checked={selectedFilters.breakfastIncluded} onChange={() => handleCheckboxChange("breakfastIncluded")} /> Breakfast Included
                </label>
              </div>
            </div>

            {/* Right Results Section */}
            <div>
              <div style={{ marginBottom: "16px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                  {filteredHotels.length} Properties Found in Uttarakhand
                </h2>
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "50px", fontSize: "16px", color: "#64748b" }}>Searching properties...</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {filteredHotels.map((hotel) => (
                    <div 
                      key={hotel._id}
                      style={{
                        background: "white",
                        borderRadius: "14px",
                        border: "1px solid #e2e8f0",
                        display: "grid",
                        gridTemplateColumns: "260px 1fr auto",
                        overflow: "hidden",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                        cursor: "pointer",
                        transition: "box-shadow 0.2s"
                      }}
                      onClick={() => navigate(`/hotels/${hotel._id}`)}
                    >
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        style={{ width: "100%", height: "180px", objectFit: "cover" }} 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"; }}
                      />
                      
                      <div style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>📍 {hotel.location}</span>
                          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "6px 0" }}>{hotel.name}</h3>
                          <p style={{ fontSize: "12px", color: "#16a34a", fontWeight: "600", margin: 0 }}>✓ Couple Friendly & Verified Property</p>
                        </div>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Free cancellation available</span>
                      </div>

                      <div style={{ padding: "18px", borderLeft: "1px solid #f1f5f9", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", minWidth: "160px" }}>
                        <div style={{ background: "#0f172a", color: "white", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}>
                          ⭐ {hotel.rating}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Per Night</span>
                          <span style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>₹{hotel.price}</span>
                          <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>+ ₹340 taxes & fees</span>
                        </div>
                        <button style={{ background: "#0284c7", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}