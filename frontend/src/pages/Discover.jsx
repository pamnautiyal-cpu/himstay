import React from "react";
import { useNavigate } from "react-router-dom";

export default function Discover() {
  const navigate = useNavigate();

  // कुछ चुनिंदा शानदार होटल्स और स्टेज़
  const featuredStays = [
    { id: "local_01", name: "Hotel Nagraja Palace", location: "Gangotri Hwy", price: 2200, img: "/images/hotals/Hotel Nagraja Palac1.jpg", type: "Hotel" },
    { id: "local_02", name: "Grandparents Homestay", location: "Matli, Uttarkashi", price: 1899, img: "/images/hotals/Grandparents Homestay1.jpg", type: "Homestay" },
    { id: "local_04", name: "Hotel K.P Residency", location: "Near Medicose", price: 2200, img: "/images/hotals/Hotel K.P Residency1.jpg", type: "Hotel" },
    { id: "local_06", name: "Himalayan Abode", location: "Main Market", price: 2799, img: "/images/hotals/Himalayan Abode home stay.jpg", type: "Homestay" }
  ];

  // लोकप्रिय ट्रेक्स और कैंपिंग
  const featuredTreks = [
    { name: "Kedarkantha Winter Trek", duration: "6 Days / 5 Nights", price: 4500, difficulty: "Moderate", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600" },
    { name: "Valley of Flowers", duration: "4 Days / 3 Nights", price: 3800, difficulty: "Easy", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600" },
    { name: "Roopkund Glacier Trek", duration: "7 Days / 6 Nights", price: 5200, difficulty: "Difficult", img: "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600" }
  ];

  // योग और वेलनेस रिट्रीट्स
  const featuredYoga = [
    { name: "Himalayan Yoga Sanctuary", location: "Rishikesh", price: 1500, focus: "Deep Meditation & Asanas", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600" },
    { name: "Ayurvedic Wellness & Therapy", location: "Uttarkashi", price: 2000, focus: "Healing & Panchakarma", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600" }
  ];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Banner Section */}
        <div style={{ background: "linear-gradient(135deg, #0284c7, #0369a1)", color: "#fff", padding: "50px 30px", borderRadius: "16px", marginBottom: "40px", textAlign: "center", boxShadow: "0 10px 25px rgba(2, 132, 199, 0.2)" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "12px" }}>🌟 Discover The Himalayans</h1>
          <p style={{ fontSize: "16px", opacity: 0.9, maxWidth: "600px", margin: "0 auto" }}>
            Explore verified mountain stays, sacred Char Dham experiences, thrilling alpine treks, and soulful yoga retreats.
          </p>
        </div>

        {/* 1. Stays & Hotels Section */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 }}>🏨 Handpicked Mountain Stays</h2>
            <button onClick={() => navigate("/hotels")} style={{ background: "none", border: "none", color: "#0284c7", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}>View All Stays →</button>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {featuredStays.map((hotel) => (
              <div 
                key={hotel.id} 
                onClick={() => navigate(`/hotels/${hotel.id}`)} 
                style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.04)", transition: "transform 0.2s ease" }}
              >
                <img src={hotel.img} alt={hotel.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <div style={{ padding: "16px" }}>
                  <span style={{ fontSize: "11px", color: "#0284c7", fontWeight: "700", textTransform: "uppercase" }}>📍 {hotel.location}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "6px 0" }}>{hotel.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "800", color: "#16a34a" }}>₹{hotel.price} <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "400" }}>/ night</span></span>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>Explore</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Treks & Camping Section */}
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>⛺ Popular Alpine Treks & Expeditions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {featuredTreks.map((trek, index) => (
              <div key={index} style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(0,0,0,0.04)" }}>
                <img src={trek.img} alt={trek.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#d97706", fontWeight: "700" }}>⏳ {trek.duration}</span>
                    <span style={{ fontSize: "11px", color: "#475569", fontWeight: "600", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px" }}>{trek.difficulty}</span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "6px 0" }}>{trek.name}</h3>
                  <p style={{ fontSize: "15px", fontWeight: "800", color: "#16a34a", margin: "8px 0 0 0" }}>₹{trek.price} <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "400" }}>/ person</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Yoga & Wellness Section */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>🧘 Yoga & Wellness Retreats</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {featuredYoga.map((yoga, index) => (
              <div key={index} style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(0,0,0,0.04)" }}>
                <img src={yoga.img} alt={yoga.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <div style={{ padding: "16px" }}>
                  <span style={{ fontSize: "11px", color: "#9333ea", fontWeight: "700" }}>📍 {yoga.location}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "6px 0" }}>{yoga.name}</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px 0" }}>{yoga.focus}</p>
                  <p style={{ fontSize: "15px", fontWeight: "800", color: "#16a34a", margin: 0 }}>₹{yoga.price} <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "400" }}>/ session</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}