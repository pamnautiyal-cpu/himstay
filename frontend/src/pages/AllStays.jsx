import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const cityQuery = queryParams.get("city");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        setHotels(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotels from backend:", err);
        setLoading(false);
      });
  }, [location.search]);

  const filteredHotels = hotels.filter((hotel) => {
    if (!cityQuery) return true;
    return (
      hotel.city?.toLowerCase().includes(cityQuery.toLowerCase()) ||
      hotel.name?.toLowerCase().includes(cityQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center", fontSize: "18px", color: "#64748b", fontFamily: "sans-serif" }}>
        🏔️ Loading stays in Uttarakhand...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#1e293b", marginBottom: "5px" }}>Stays in Uttarakhand</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", marginTop: 0 }}>Discover luxury resorts, cozy homestays and unforgettable Himalayan experiences.</p>

        {cityQuery && (
          <div style={{ marginBottom: "20px", padding: "10px 15px", background: "#eff6ff", color: "#1d4ed8", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>
            📍 Showing properties in "{cityQuery}"
          </div>
        )}

        {filteredHotels.length === 0 ? (
          <div style={{ background: "#fff", padding: "50px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "20px", color: "#334155", marginBottom: "10px" }}>No stays found matching your query 😔</h3>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>Try searching for another city or check all stays.</p>
            <button 
              onClick={() => navigate("/hotels")} 
              style={{ padding: "12px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
            >
              Clear Filter & View All
            </button>
          </div>
        ) : (
          filteredHotels.map((hotel) => (
            <div 
              key={hotel._id} 
              style={{ display: "flex", background: "#fff", borderRadius: "20px", marginBottom: "25px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", flexWrap: "wrap" }}
            >
              <div 
                onClick={() => navigate(`/hotels/${hotel._id}`)} 
                style={{ width: "300px", minWidth: "260px", height: "200px", cursor: "pointer" }}
              >
                <img 
                  src={hotel.image || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"} 
                  alt={hotel.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>

              <div style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ margin: "0 0 6px 0", fontSize: "22px", fontWeight: "700", color: "#1e293b" }}>{hotel.name}</h2>
                  <p style={{ color: "#64748b", margin: "0 0 10px 0", fontSize: "14px" }}>📍 {hotel.city || hotel.location}</p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", color: "#475569", fontSize: "13px", marginBottom: "10px" }}>
                    <span>🏔️ Mountain View</span>
                    <span>📶 Free WiFi</span>
                    <span>🍳 Breakfast</span>
                  </div>
                  <span style={{ background: "#2563eb", color: "#fff", padding: "3px 8px", borderRadius: "6px", fontWeight: "bold", fontSize: "12px" }}>
                    ⭐ {hotel.rating || "4.5"}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #f1f5f9" }}>
                  <h3 style={{ color: "#16a34a", margin: 0, fontSize: "24px", fontWeight: "800" }}>
                    ₹{hotel.price} <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "normal" }}>/ night</span>
                  </h3>
                  <button 
                    onClick={() => navigate(`/hotels/${hotel._id}`)} 
                    style={{ padding: "12px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}