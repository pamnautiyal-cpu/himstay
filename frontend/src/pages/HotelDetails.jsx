import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", price: 3500, rating: 4.8, reviews: 19, images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], description: "Gangotri Hwy par sthit shandaar luxury stay.", amenities: ["Wi-Fi", "Parking", "River View"] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", price: 1800, rating: 4.6, reviews: 61, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], description: "Ekdum ghar jaisa mahaul aur mountain view.", amenities: ["Food", "Balcony"] },
    // ... baaki saare hotels yahan honge
  };

  useEffect(() => {
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.error("Error:", err));
    }
  }, [id]);

  const handlePayment = async (price) => {
    // Payment logic yahan aayega
    alert(`Payment initialize ho rahi hai: ₹${price}`);
  };

  if (!hotel) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{hotel.name}</h1>
      <p>📍 {hotel.location}</p>
      <img src={hotel.images[0]} style={{ width: "100%", borderRadius: "10px" }} />
      <p>{hotel.description}</p>
      <h2>Price: ₹{hotel.price}</h2>
      <button 
        onClick={() => handlePayment(hotel.price)} 
        style={{ padding: "15px 30px", background: "#006ce4", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        Reserve Your Stay
      </button>
    </div>
  );
}