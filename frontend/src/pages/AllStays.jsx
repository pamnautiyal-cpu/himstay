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

  // 🆕 उत्तरकाशी (मटली) के तुम्हारे 5 असली होटल्स का डेटाबेस
  const localUttarkashiHotels = [
    {
      _id: "local_nagraja_01",
      name: "Hotel Nagraja Palace",
      city: "Matli, Uttarkashi",
      location: "Gangotri National Highway, Matli, Uttarakhand 249193",
      price: 3500,
      rating: 4.8,
      reviews: 19,
      phone: "097604 56649",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
      roomType: "Luxury Gangotri Highway View Room",
      guests: 3,
      view: "River & Highway View"
    },
    {
      _id: "local_grandparents_02",
      name: "Grandparents Homestay",
      city: "Matli, Uttarkashi",
      location: "1, NH 34, Matli, Barahat Range, Uttarakhand 249193",
      price: 1800,
      rating: 4.6,
      reviews: 61,
      phone: "094101 98367",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      roomType: "Traditional Homestay Room",
      guests: 2,
      view: "Barahat Mountain Range View"
    },
    {
      _id: "local_prisha_03",
      name: "Hotel Prisha Pahal Home Stay",
      city: "Matli, Uttarkashi",
      location: "NH 34, Matli, Barahat Range, Uttarakhand 249193",
      price: 2200,
      rating: 4.9,
      reviews: 360,
      phone: "081262 59767",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
      roomType: "Premium Family Suite",
      guests: 4,
      view: "Valley View"
    },
    {
      _id: "local_kp_04",
      name: "Hotel K.P Residency",
      city: "Matli, Uttarkashi",
      location: "Near Gangotri Medicose, Matli, Barahat Range, Uttarakhand 249193",
      price: 2800,
      rating: 4.6,
      reviews: 117,
      phone: "081260 31252",
      image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600",
      roomType: "Deluxe Comfort Room",
      guests: 2,
      view: "Mountain View"
    },
    {
      _id: "local_dhruvnanda_05",
      name: "Dhruvnanda Homestay",
      city: "Matli, Uttarkashi",
      location: "ITBP Rd, Matli, Athali, Uttarakhand 249193",
      price: 1500,
      rating: 4.6,
      reviews: 46,
      phone: "090450 77759",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600",
      roomType: "Cozy Valley Homestay Cabin",
      guests: 2,
      view: "River Stream & Orchard View"
    }
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        // बैकएंड डेटा और लोकल उत्तरकाशी डेटा दोनों को कंबाइन करें
        const backendData = res.data || [];
        // डुप्लिकेट रोकने के लिए फिल्टर
        const merged = [...localUttarkashiHotels, ...backendData.filter(bh => !bh._id.startsWith("local_"))];
        setHotels(merged);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotels, using verified local data:", err);
        // अगर बैकएंड बंद भी हो, तो तुम्हारे ये 5 होटल्स हमेशा लाइव दिखेंगे
        setHotels(localUttarkashiHotels);
        setLoading(false);
      });
  }, [location.search]);

  // सर्च बार या डेस्टिनेशन क्लिक के आधार पर फिल्टर करने का लॉजिक
  const filteredHotels = hotels.filter((hotel) => {
    if (!cityQuery) return true;
    const query = cityQuery.toLowerCase();
    return (
      hotel.city?.toLowerCase().includes(query) ||
      hotel.name?.toLowerCase().includes(query) ||
      hotel.location?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center", fontSize: "18px", color: "#64748b", fontFamily: "sans-serif" }}>
        🏔️ Loading verified stays in Uttarakhand...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 20px", fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0f172a", marginBottom: "5px" }}>Stays in Uttarakhand</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", marginTop: 0 }}>Discover premium hotels, cozy homestays and unforgettable Himalayan experiences.</p>

        {cityQuery && (
          <div style={{ marginBottom: "20px", padding: "12px 16px", background: "#eff6ff", color: "#1d4ed8", borderRadius: "8px", fontWeight: "600", fontSize: "14px", border: "1px solid #bfdbfe" }}>
            📍 Showing available properties in "{cityQuery}"
          </div>
        )}

        {filteredHotels.length === 0 ? (
          <div style={{ background: "#fff", padding: "50px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "20px", color: "#334155", marginBottom: "10px" }}>No stays found matching your query 😔</h3>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>Try searching for 'Uttarkashi' or check all verified properties.</p>
            <button 
              onClick={() => navigate("/hotels")} 
              style={{ padding: "12px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
            >
              View All Verified Stays
            </button>
          </div>
        ) : (
          filteredHotels.map((hotel) => (
            <div 
              key={hotel._id} 
              style={{ display: "flex", background: "#fff", borderRadius: "16px", marginBottom: "25px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", flexWrap: "wrap" }}
            >
              {/* HOTEL IMAGE LINK */}
              <div 
                onClick={() => navigate(`/hotels/${hotel._id}`)} 
                style={{ width: "300px", minWidth: "260px", height: "220px", cursor: "pointer", position: "relative" }}
              >
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>

              {/* HOTEL CONTENT DETAILS */}
              <div style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 
                      onClick={() => navigate(`/hotels/${hotel._id}`)}
                      style={{ margin: "0 0 6px 0", fontSize: "22px", fontWeight: "700", color: "#0f172a", cursor: "pointer" }}
                    >
                      {hotel.name}
                    </h2>
                    
                    {/* Badge Style Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}>({hotel.reviews || 10} reviews)</span>
                      <span style={{ background: "#003580", color: "#fff", padding: "4px 8px", borderRadius: "6px 6px 6px 0", fontWeight: "bold", fontSize: "13px" }}>
                        ⭐ {hotel.rating}
                      </span>
                    </div>
                  </div>

                  <p style={{ color: "#64748b", margin: "0 0 12px 0", fontSize: "13px", lineHeight: "1.4" }}>
                    📍 {hotel.location}
                  </p>
                  
                  {/* Inline Contact Info */}
                  <p style={{ color: "#059669", margin: "0 0 14px 0", fontSize: "12px", fontWeight: "600" }}>
                    📞 Contact Host: {hotel.phone}
                  </p>
                  
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", color: "#475569", fontSize: "13px", marginBottom: "10px" }}>
                    <span>🛏️ {hotel.roomType || "Deluxe Room"}</span>
                    <span>👥 Max Guests: {hotel.guests || 2}</span>
                    <span>🌄 {hotel.view || "Mountain View"}</span>
                  </div>
                </div>

                {/* PRICE & BUTTON */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
                  <div>
                    <h3 style={{ color: "#16a34a", margin: 0, fontSize: "24px", fontWeight: "800" }}>
                      ₹{hotel.price}
                    </h3>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>Includes taxes & fees</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/hotels/${hotel._id}`)} 
                    style={{ padding: "12px 28px", background: "#006ce4", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", transition: "background 0.1s" }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#0053b3"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#006ce4"}
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