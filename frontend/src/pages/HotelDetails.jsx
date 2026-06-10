import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  // 16 Hotels ka complete database (yahan map karo)
  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", price: 3500, rating: 4.8, reviews: 19, images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], description: "Gangotri Hwy par sthit shandaar luxury stay.", amenities: ["Wi-Fi", "Parking", "River View"] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", price: 1800, rating: 4.6, reviews: 61, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], description: "Ekdum ghar jaisa mahaul aur mountain view.", amenities: ["Food", "Balcony"] },
    // ... baaki 16 tak yahan honge
  };

  useEffect(() => {
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.error("Error fetching hotel:", err));
    }
  }, [id]);

  if (!hotel) return <div>🏔️ Loading Details...</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto", fontFamily: "sans-serif" }}>
      <button onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>← Back to results</button>
      
      <h1 style={{ fontSize: "32px", color: "#0f172a" }}>{hotel.name}</h1>
      <p style={{ fontSize: "18px", color: "#64748b" }}>📍 {hotel.location}</p>
      
      <img src={hotel.images[0]} alt={hotel.name} style={{ width: "100%", borderRadius: "15px", margin: "20px 0" }} />
      
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "10px" }}>
        <h3>Property Description</h3>
        <p>{hotel.description}</p>
        
        <h3>Price: ₹{hotel.price}</h3>
        
        <button 
          onClick={() => alert("Payment feature active ho raha hai...")} 
          style={{ padding: "15px 40px", background: "#006ce4", color: "#fff", border: "none", borderRadius: "8px", fontSize: "18px", cursor: "pointer" }}
        >
          Reserve Your Stay
        </button>
      </div>
    </div>
  );
}