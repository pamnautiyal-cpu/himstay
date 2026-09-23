import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "/images/hotals/Hotel Nagraja Palace1.jpg", location: "Gangotri Hwy", price: "2,499", rating: "4.8" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay1.jpg", location: "NH 34", price: "1,899", rating: "4.9" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Barahat Range", price: "2,199", rating: "4.7" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "Near Medicose", price: "2,200", rating: "4.6" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", location: "ITBP Rd", price: "1,599", rating: "4.8" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", location: "Main Market", price: "2,799", rating: "4.9" },
    { _id: "local_07", name: "Riverside Retreat", city: "Maneri", image: "/images/hotals/Hotel Nagraja Palace2.jpg", location: "Bhagirathi Bank", price: "1,899", rating: "4.9" },
    { _id: "local_08", name: "Gangotri View Inn", city: "Gangori", image: "/images/hotals/Hotel Nagraja Palace3.jpg", location: "Gangori Bridge", price: "3,199", rating: "4.7" },
    { _id: "local_09", name: "Green Valley Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay2.jpg", location: "Village Road", price: "1,799", rating: "4.8" },
    { _id: "local_10", name: "Uttarkashi Guest House", city: "Uttarkashi", image: "/images/hotals/Hotel Prisha Pahal2.jpg", location: "Old Town", price: "2,099", rating: "4.5" },
    { _id: "local_11", name: "Mountain Peak Hotel", city: "Dunda", image: "/images/hotals/Hotel K.P Residency2.jpg", location: "Dunda Main Rd", price: "2,599", rating: "4.7" },
    { _id: "local_12", name: "Peaceful Stay", city: "Matli", image: "/images/hotals/Dhruvnanda Homestay2.jpg", location: "Valley View", price: "1,699", rating: "4.8" },
    { _id: "local_13", name: "Char Dham Camp", city: "Gangotri Rd", image: "/images/hotals/Hotel Nagraja Palace1.jpg", location: "Near Highway", price: "2,999", rating: "4.9" },
    { _id: "local_14", name: "Sunrise Residency", city: "Uttarkashi", image: "/images/hotals/Grandparents Homestay1.jpg", location: "Tiloth Road", price: "2,199", rating: "4.6" },
    { _id: "local_15", name: "Nature's Nest", city: "Athali", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Orchard Side", price: "1,999", rating: "4.8" },
    { _id: "local_16", name: "Skyline Hotel", city: "Uttarkashi", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "City Center", price: "2,899", rating: "4.7" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = (res.data || []).map(item => ({
          ...item,
          price: item.price || "2,499",
          rating: item.rating || "4.8",
          location: item.location || item.city || "Uttarakhand",
          image: item.image || item.img || "/images/hotals/Hotel Nagraja Palace1.jpg"
        }));
        const merged = [...localUttarkashiHotels, ...backendData.filter(bh => !String(bh._id).startsWith("local_"))];
        setHotels(merged);
        setLoading(false);
      })
      .catch(() => {
        setHotels(localUttarkashiHotels);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "#0284c7", fontWeight: "700" }}>
        🏔️ Loading Premium Mountain Stays...
      </div>
    );
  }

  const currentHotels = hotels.slice(0, visibleCount);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "40px 20px", boxSizing: "border-box" }}>
      
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "40px", maxWidth: "800px", margin: "0 auto 40px auto" }}>
        <span style={{ 
          background: "linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(3, 105, 161, 0.15))", 
          color: "#0284c7", padding: "6px 16px", borderRadius: "30px", fontSize: "12px", 
          fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.2px", display: "inline-block", marginBottom: "14px",
          border: "1px solid rgba(2, 132, 199, 0.2)"
        }}>
          ✨ Curated Mountain Sanctuaries
        </span>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: "900", color: "#0f172a", marginBottom: "10px", letterSpacing: "-0.5px" }}>
          Explore All Stays in Uttarakhand
        </h1>
        <p style={{ fontSize: "15px", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
          Discover handpicked mountain retreats, cozy homestays, and scenic luxury properties crafted for an unforgettable Himalayan experience.
        </p>
      </div>

      {/* Main Listings Layout Container */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px", boxSizing: "border-box" }}>
        
        {currentHotels.map((hotel) => (
          <div 
            key={hotel._id} 
            style={{ 
              background: "#ffffff",
              border: "1px solid #e2e8f0", 
              borderRadius: "16px", 
              overflow: "hidden", 
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.04), 0 8px 10px -6px rgba(0,0,0,0.04)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              alignItems: "stretch",
              transition: "all 0.3s ease",
              boxSizing: "border-box"
            }}
          >
            {/* Left: Hotel Image with Badge */}
            <div style={{ position: "relative", minHeight: "200px", background: "#f1f5f9" }}>
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "200px" }} 
                onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
              />
              <div style={{
                position: "absolute", top: "12px", left: "12px", background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(4px)",
                color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", zIndex: 2,
                display: "flex", alignItems: "center", gap: "4px"
              }}>
                ⭐ {hotel.rating || "4.8"}
              </div>
            </div>

            {/* Middle: Details */}
            <div style={{ padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
              <div>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  📍 {hotel.location || hotel.city}, Uttarkashi
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "8px 0 10px 0", lineHeight: "1.3" }}>
                  {hotel.name}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                    ✓ Couple Friendly & Verified Property
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    Free cancellation available • Breakfast included options
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Price & CTA Action Box */}
            <div style={{ 
              padding: "22px", background: "#f8fafc", borderLeft: "1px solid #f1f5f9", 
              display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", textAlign: "right",
              boxSizing: "border-box"
            }}>
              <div style={{ width: "100%" }}>
                <span style={{ fontSize: "12px", color: "#64748b", display: "block", fontWeight: "600" }}>Starting from</span>
                <span style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a" }}>₹{hotel.price}</span>
                <span style={{ fontSize: "11px", color: "#64748b", display: "block", marginTop: "2px" }}>+ ₹300 taxes & fees</span>
              </div>

              <button 
                onClick={() => navigate(`/hotels/${hotel._id}`)}
                style={{ 
                  width: "100%", padding: "12px 0", background: "#0284c7", 
                  color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", fontSize: "14px", cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.35)", transition: "background 0.2s ease"
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load More Button Section */}
      <div style={{ textAlign: "center", marginTop: "45px" }}>
        {visibleCount < hotels.length ? (
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            style={{
              background: "#0284c7", color: "white", border: "none", padding: "14px 40px",
              borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(2, 132, 199, 0.4)", transition: "all 0.2s ease"
            }}
          >
            Load More Stays ({hotels.length - visibleCount} remaining) ↓
          </button>
        ) : (
          <button 
            onClick={() => setVisibleCount(6)}
            style={{
              background: "#64748b", color: "white", border: "none", padding: "14px 40px",
              borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(100, 116, 139, 0.3)"
            }}
          >
            Show Less ↑
          </button>
        )}
      </div>

    </div>
  );
}