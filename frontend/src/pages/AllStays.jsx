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
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "/images/hotals/Hotel Nagraja Palace1.jpg", location: "Gangotri Hwy", price: "2,499", rating: "4.8", tag: "Trending 🔥" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay1.jpg", location: "NH 34", price: "1,899", rating: "4.9", tag: "Best Seller ⭐" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Barahat Range", price: "2,199", rating: "4.7", tag: "Luxury Stay ✨" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "Near Medicose", price: "2,200", rating: "4.6", tag: "Great Value 💎" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", location: "ITBP Rd", price: "1,599", rating: "4.8", tag: "Nature View 🌲" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", location: "Main Market", price: "2,799", rating: "4.9", tag: "Top Rated 🏆" },
    { _id: "local_07", name: "Riverside Retreat", city: "Maneri", image: "/images/hotals/Hotel Nagraja Palace2.jpg", location: "Bhagirathi Bank", price: "1,899", rating: "4.9", tag: "River View 🌊" },
    { _id: "local_08", name: "Gangotri View Inn", city: "Gangori", image: "/images/hotals/Hotel Nagraja Palace3.jpg", location: "Gangori Bridge", price: "3,199", rating: "4.7", tag: "Special Offer ⚡" }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Check locally added user properties first from frontend storage
    const userAdded = JSON.parse(localStorage.getItem("user_added_hotels") || "[]");

    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const backendData = (res.data || []).map(item => ({
          ...item,
          price: item.price || "2,499",
          rating: item.rating || "4.8",
          location: item.location || item.city || "Uttarakhand",
          image: item.image || item.img || "/images/hotals/Hotel Nagraja Palace1.jpg",
          tag: item.tag || "Verified Stay ✓"
        }));
        
        // Merge user added hotels + local static + backend data
        const merged = [...userAdded, ...localUttarkashiHotels, ...backendData.filter(bh => !String(bh._id).startsWith("local_"))];
        setHotels(merged);
        setLoading(false);
      })
      .catch(() => {
        const merged = [...userAdded, ...localUttarkashiHotels];
        setHotels(merged);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px", fontSize: "20px", color: "#0284c7", fontWeight: "800", background: "#f8fafc", minHeight: "100vh" }}>
        🏔️ Fetching Handpicked Himalayan Stays...
      </div>
    );
  }

  const currentHotels = hotels.slice(0, visibleCount);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f3f4f6", minHeight: "100vh", padding: "40px 20px", boxSizing: "border-box" }}>
      
      {/* Premium Header Banner */}
      <div style={{ 
        maxWidth: "1200px", margin: "0 auto 40px auto", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
        borderRadius: "24px", padding: "40px 30px", color: "white", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" 
      }}>
        <span style={{ 
          background: "rgba(2, 132, 199, 0.2)", color: "#38bdf8", padding: "6px 16px", borderRadius: "30px", fontSize: "12px", 
          fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", display: "inline-block", marginBottom: "16px",
          border: "1px solid rgba(56, 189, 248, 0.3)"
        }}>
          ✨ Exclusive Agoda & MMT Style Collection
        </span>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "900", marginBottom: "12px", letterSpacing: "-0.5px" }}>
          Handpicked Stays & Mountain Retreats
        </h1>
        <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
          Explore premium villas, cozy riverside homestays, and luxury boutique hotels across Uttarakhand with verified reviews and best price guarantees.
        </p>
      </div>

      {/* Modern Grid Layout (Mixed Card Sizes Effect) */}
      <div style={{ 
        maxWidth: "1200px", margin: "0 auto", 
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px", boxSizing: "border-box" 
      }}>
        
        {currentHotels.map((hotel, index) => {
          // Make every 3rd card slightly stand out as a "Featured/Hero" card vibe
          const isFeatured = index % 3 === 0;

          return (
            <div 
              key={hotel._id} 
              style={{ 
                background: "#ffffff",
                border: isFeatured ? "2px solid #0284c7" : "1px solid #e2e8f0", 
                borderRadius: "20px", 
                overflow: "hidden", 
                boxShadow: isFeatured ? "0 20px 25px -5px rgba(2, 132, 199, 0.15)" : "0 10px 15px -3px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                position: "relative",
                boxSizing: "border-box"
              }}
            >
              {/* Top Image Section with Tags */}
              <div style={{ position: "relative", height: "220px", background: "#e2e8f0", overflow: "hidden" }}>
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }} 
                  onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
                />
                
                {/* Special Tag Badge */}
                <div style={{
                  position: "absolute", top: "14px", left: "14px", background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "white", padding: "5px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: "800", zIndex: 2,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)", textTransform: "uppercase"
                }}>
                  {hotel.tag || "Top Pick ⭐"}
                </div>

                {/* Rating Badge */}
                <div style={{
                  position: "absolute", top: "14px", right: "14px", background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(6px)",
                  color: "white", padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "900", zIndex: 2,
                  display: "flex", alignItems: "center", gap: "4px"
                }}>
                  ⭐ {hotel.rating || "4.8"}
                </div>
              </div>

              {/* Middle Content Section */}
              <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      📍 {hotel.location || hotel.city}, Uttarakhand
                    </span>
                    <span style={{ fontSize: "11px", background: "#f0fdf4", color: "#16a34a", padding: "3px 8px", borderRadius: "6px", fontWeight: "700" }}>
                      Verified ✓
                    </span>
                  </div>

                  <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "0 0 10px 0", lineHeight: "1.3" }}>
                    {hotel.name}
                  </h3>

                  <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.4" }}>
                    {hotel.description || "Enjoy modern amenities, breathtaking mountain views, and world-class hospitality tailored for families and couples."}
                  </p>
                </div>

                {/* Price and Action Section inside Card */}
                <div style={{ 
                  borderTop: "1px solid #f1f5f9", paddingTop: "16px", marginTop: "auto",
                  display: "flex", justifyContent: "space-between", alignItems: "center" 
                }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#94a3b8", display: "block", fontWeight: "600" }}>Per Night Price</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a" }}>₹{hotel.price}</span>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>+ taxes</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(`/hotels/${hotel._id}`)}
                    style={{ 
                      padding: "10px 22px", background: isFeatured ? "#0f172a" : "#0284c7", 
                      color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)", transition: "all 0.2s ease"
                    }}
                  >
                    View Room →
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Load More & Pagination Section */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {visibleCount < hotels.length ? (
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            style={{
              background: "#0284c7", color: "white", border: "none", padding: "14px 45px",
              borderRadius: "14px", fontWeight: "800", fontSize: "15px", cursor: "pointer",
              boxShadow: "0 8px 20px rgba(2, 132, 199, 0.35)", transition: "all 0.2s ease"
            }}
          >
            Load More Amazing Stays ({hotels.length - visibleCount} left) ↓
          </button>
        ) : (
          <button 
            onClick={() => setVisibleCount(6)}
            style={{
              background: "#64748b", color: "white", border: "none", padding: "14px 45px",
              borderRadius: "14px", fontWeight: "800", fontSize: "15px", cursor: "pointer",
              boxShadow: "0 8px 20px rgba(100, 116, 139, 0.3)"
            }}
          >
            Show Less Stays ↑
          </button>
        )}
      </div>

    </div>
  );
}