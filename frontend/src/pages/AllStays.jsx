import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate();

  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "/images/hotals/Hotel Nagraja Palac1.jpg", location: "Gangotri Hwy", price: "2,499", rating: "4.8" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli", image: "/images/hotals/Grandparents Homestay1.jpg", location: "NH 34", price: "1,899", rating: "4.9" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", location: "Barahat Range", price: "2,199", rating: "4.7" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", location: "Near Medicose", price: "2,200", rating: "4.6" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", location: "ITBP Rd", price: "1,599", rating: "4.8" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", location: "Main Market", price: "2,799", rating: "4.9" },
    { _id: "local_07", name: "Riverside Retreat", city: "Maneri", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank", price: "1,899", rating: "4.9" },
    { _id: "local_08", name: "Gangotri View Inn", city: "Gangori", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", location: "Gangori Bridge", price: "3,199", rating: "4.7" },
    { _id: "local_09", name: "Green Valley Homestay", city: "Matli", image: "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600", location: "Village Road", price: "1,799", rating: "4.8" },
    { _id: "local_10", name: "Uttarkashi Guest House", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600", location: "Old Town", price: "2,099", rating: "4.5" },
    { _id: "local_11", name: "Mountain Peak Hotel", city: "Dunda", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", location: "Dunda Main Rd", price: "2,599", rating: "4.7" },
    { _id: "local_12", name: "Peaceful Stay", city: "Matli", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600", location: "Valley View", price: "1,699", rating: "4.8" },
    { _id: "local_13", name: "Char Dham Camp", city: "Gangotri Rd", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Near Highway", price: "2,999", rating: "4.9" },
    { _id: "local_14", name: "Sunrise Residency", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=600", location: "Tiloth Road", price: "2,199", rating: "4.6" },
    { _id: "local_15", name: "Nature's Nest", city: "Athali", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600", location: "Orchard Side", price: "1,999", rating: "4.8" },
    { _id: "local_16", name: "Skyline Hotel", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600", location: "City Center", price: "2,899", rating: "4.7" }
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

  if (loading) return <div style={{ textAlign: "center", padding: "80px", fontSize: "20px", color: "#64748b" }}> Loading Stays...</div>;

  const currentHotels = hotels.slice(0, visibleCount);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "30px 20px" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "35px", maxWidth: "800px", margin: "0 auto 35px auto" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
          Stays in Uttarakhand ({hotels.length} Properties)
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
          Discover handpicked mountain retreats, cozy homestays, and scenic luxury hotels crafted for an unforgettable Himalayan experience.
        </p>
      </div>

      {/* MakeMyTrip Style Horizontal Layout Container */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {currentHotels.map((hotel) => (
          <div 
            key={hotel._id} 
            style={{ 
              background: "#ffffff",
              border: "1px solid #e2e8f0", 
              borderRadius: "14px", 
              overflow: "hidden", 
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              display: "grid",
              gridTemplateColumns: "260px 1fr 200px",
              alignItems: "stretch"
            }}
          >
            {/* Left: Hotel Image */}
            <div style={{ position: "relative", width: "260px", height: "180px", background: "#f1f5f9" }}>
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"; }}
              />
              <span style={{
                position: "absolute", top: "10px", left: "10px", background: "rgba(15, 23, 42, 0.8)",
                color: "white", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700", zIndex: 2
              }}>
                ⭐ {hotel.rating || "4.8"}
              </span>
            </div>

            {/* Middle: Details */}
            <div style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>
                  📍 {hotel.location || hotel.city}, Uttarkashi
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "6px 0 8px 0" }}>
                  {hotel.name}
                </h3>
                <p style={{ fontSize: "12px", color: "#16a34a", fontWeight: "600", margin: "0 0 4px 0" }}>
                  ✓ Couple Friendly & Verified Property
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                  Free cancellation available • Breakfast included options
                </p>
              </div>
            </div>

            {/* Right: Price & CTA */}
            <div style={{ padding: "18px", background: "#f8fafc", borderLeft: "1px solid #f1f5f9", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", textAlign: "right" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Starting from</span>
                <span style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>₹{hotel.price}</span>
                <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>+ ₹300 taxes & fees</span>
              </div>

              <button 
                onClick={() => navigate(`/hotels/${hotel._id}`)}
                style={{ 
                  width: "100%", padding: "10px 0", background: "#0284c7", 
                  color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(2, 132, 199, 0.3)"
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load More Button Section */}
      <div style={{ textAlign: "center", marginTop: "35px" }}>
        {visibleCount < hotels.length ? (
          <button 
            onClick={() => setVisibleCount(prev => prev + 5)}
            style={{
              background: "#0284c7", color: "white", border: "none", padding: "12px 35px",
              borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)"
            }}
          >
            Load More Stays ({hotels.length - visibleCount} remaining) ↓
          </button>
        ) : (
          <button 
            onClick={() => setVisibleCount(5)}
            style={{
              background: "#64748b", color: "white", border: "none", padding: "12px 35px",
              borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer"
            }}
          >
            Show Less ↑
          </button>
        )}
      </div>

    </div>
  );
}