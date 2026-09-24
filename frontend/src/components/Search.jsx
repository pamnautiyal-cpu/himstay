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
  const initialTab = queryParams.get("tab") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States - Agar URL mein tab=Hotels hai toh hotel filter ko by default true kar sakte hain ya off rakh sakte hain
  const [selectedFilters, setSelectedFilters] = useState({
    freeCancellation: false,
    breakfastIncluded: false,
    homestay: false,
    hotel: initialTab === "Hotels" ? false : false, // Sabhi hotels dikhane ke liye ise false rakha hai taaki filter block na kare
    cottage: false
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = res.data || [];
        const formattedBackendData = backendData.map(item => ({
          ...item,
          price: Number(item.price) || 2499,
          rating: item.rating || "4.8",
          location: item.location || item.city || "Uttarkashi",
          category: item.category || "Hotel",
          image: item.image || item.img || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
        }));
        setHotels(formattedBackendData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotels from backend:", err);
        setHotels([]);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (filterName) => {
    setSelectedFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const filteredHotels = hotels.filter(hotel => {
    // Agar search term khali hai, toh sabhi hotels dikhao
    const matchesSearch = searchTerm.trim() === "" || 
                          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (hotel.location && hotel.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (hotel.city && hotel.city.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCity = selectedCity === "All" || 
                        (hotel.city && hotel.city.toLowerCase() === selectedCity.toLowerCase()) || 
                        (hotel.location && hotel.location.toLowerCase().includes(selectedCity.toLowerCase()));
    
    // Property type filters - Tabhi apply honge jab checkbox tick hoga
    if (selectedFilters.homestay && hotel.category?.toLowerCase() !== "homestay") return false;
    if (selectedFilters.hotel && hotel.category?.toLowerCase() !== "hotel") return false;
    if (selectedFilters.cottage && hotel.category?.toLowerCase() !== "cottage") return false;

    return matchesSearch && matchesCity;
  });

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
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", fontSize: "16px", color: "#64748b" }}>Loading properties from database...</div>
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
                  {filteredHotels.length} Properties Found
                </h2>
              </div>

              {filteredHotels.length === 0 ? (
                <div style={{ background: "white", borderRadius: "12px", padding: "40px", textAlign: "center", border: "1px solid #e2e8f0" }}>
                  <p style={{ fontSize: "16px", color: "#64748b", margin: 0 }}>No properties found matching your criteria.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {filteredHotels.map((hotel) => (
                    <div 
                      key={hotel._id || hotel.id}
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
                      onClick={() => navigate(`/hotels/${hotel._id || hotel.id}`)}
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