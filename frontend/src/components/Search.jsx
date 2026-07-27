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

  // Filter States (MakeMyTrip Style)
  const [selectedFilters, setSelectedFilters] = useState({
    freeCancellation: false,
    breakfastIncluded: false,
    homestay: false,
    hotel: false,
    cottage: false
  });

  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", location: "Gangotri Hwy", price: 2499, rating: "4.8", category: "Hotel" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600", location: "NH 34", price: 1899, rating: "4.9", category: "Homestay" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", location: "Barahat Range", price: 2199, rating: "4.7", category: "Hotel" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600", location: "Near Medicose", price: 2200, rating: "4.6", category: "Hotel" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600", location: "ITBP Rd", price: 1599, rating: "4.8", category: "Homestay" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600", location: "Main Market", price: 2799, rating: "4.9", category: "Hotel" },
    { _id: "local_07", name: "Riverside Retreat", city: "Rishikesh", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank", price: 1899, rating: "4.9", category: "Cottage" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = (res.data || []).map(item => ({
          ...item,
          price: Number(item.price) || 2499,
          rating: item.rating || "4.8",
          location: item.location || item.city || "Uttarakhand",
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

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (hotel.location && hotel.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = selectedCity === "All" || (hotel.city && hotel.city.toLowerCase() === selectedCity.toLowerCase()) || (hotel.location && hotel.location.toLowerCase().includes(selectedCity.toLowerCase()));
    
    // Category filters
    if (selectedFilters.homestay && hotel.category !== "Homestay") return false;
    if (selectedFilters.hotel && hotel.category !== "Hotel") return false;
    if (selectedFilters.cottage && hotel.category !== "Cottage") return false;

    return matchesSearch && matchesCity;
  });

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: "50px" }}>
      
      {/* Top Search Bar Header (MMT Style) */}
      <div style={{ background: "#0b132b", padding: "20px", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <input 
            type="text" 
            placeholder="Search hotel, location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 2, padding: "10px 14px", borderRadius: "8px", border: "none", outline: "none", fontSize: "14px" }}
          />
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", outline: "none", fontSize: "14px", fontWeight: "600" }}
          >
            <option value="All">All Cities</option>
            <option value="Uttarkashi">Uttarkashi</option>
            <option value="Matli">Matli</option>
            <option value="Rishikesh">Rishikesh</option>
            <option value="Athali">Athali</option>
          </select>
          <button 
            onClick={() => {}} 
            style={{ background: "#0284c7", color: "white", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Main Container with Left Sidebar & Right Results */}
      <div style={{ maxWidth: "1200px", margin: "30px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "260px 1fr", gap: "24px", alignItems: "flex-start" }}>
        
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

          {loading ? (
            <div style={{ textAlign: "center", padding: "50px", fontSize: "16px", color: "#64748b" }}>Searching properties...</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
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
                ))
              ) : (
                <div style={{ background: "white", padding: "40px", borderRadius: "12px", textAlign: "center", color: "#64748b" }}>
                  No properties found matching your search filters.
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}