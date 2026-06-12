import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", price: 3500, description: "Luxury stay at Gangotri Hwy.", images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", price: 1800, description: "Cozy home-like stay.", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"] },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range", price: 2200, description: "Best hygiene stay.", images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"] },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose", price: 2800, description: "Modern comfort.", images: ["https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800"] },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd", price: 1500, description: "Nature's lap.", images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"] },
    "local_06": { name: "Himalayan Abode", location: "Main Market", price: 4000, description: "Premium market stay.", images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"] },
    "local_07": { name: "Riverside Retreat", location: "Bhagirathi Bank", price: 3200, description: "River view retreat.", images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"] },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge", price: 2500, description: "Scenic view.", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"] },
    "local_09": { name: "Green Valley Homestay", location: "Village Road", price: 1200, description: "Simple stay.", images: ["https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=800"] },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town", price: 1000, description: "Old town experience.", images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"] },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd", price: 2900, description: "Peak view.", images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"] },
    "local_12": { name: "Peaceful Stay", location: "Valley View", price: 1700, description: "Peaceful.", images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"] },
    "local_13": { name: "Char Dham Camp", location: "Near Highway", price: 4500, description: "Camp experience.", images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800"] },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road", price: 2100, description: "Sunrise view.", images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=800"] },
    "local_15": { name: "Nature's Nest", location: "Orchard Side", price: 2600, description: "Nature nest.", images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"] },
    "local_16": { name: "Skyline Hotel", location: "City Center", price: 3300, description: "City view.", images: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"] }
  };

  useEffect(() => {
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else if (id && id.length === 24) { // MongoDB IDs are 24 chars
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.error("Error fetching hotel:", err));
    }
  }, [id]);

  const handlePayment = async (amount) => {
    if (!hotel) return;
    try {
      const { data: orderData } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, { amount });
      const options = {
        key: "rzp_test_RxW3zOEiOiGN69",
        amount: orderData.amount,
        currency: "INR",
        name: "The Himalayans",
        description: `Booking ${hotel.name}`,
        order_id: orderData.id,
        handler: async (response) => {
          const res = await axios.post(`${BACKEND_URL}/api/payment/verify`, response);
          if (res.data.success) {
            alert("🎉 Booking Confirmed!");
            navigate("/mytrips");
          }
        },
        theme: { color: "#006ce4" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment shuru nahi ho payi, server check karo.");
    }
  };

  if (!hotel) return <div>🏔️ Loading Details...</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{hotel.name}</h1>
      <p>📍 {hotel.city || hotel.location}</p>
      
      <img 
        src={Array.isArray(hotel.images) ? hotel.images[0] : (hotel.image || "")} 
        alt={hotel.name}
        style={{ width: "100%", borderRadius: "15px" }} 
      />

      <h3>{hotel.description}</h3>
      <h2>Price: ₹{hotel.price}</h2>
      <button 
        onClick={() => handlePayment(hotel.price)} 
        style={{ padding: "15px 40px", background: "#006ce4", color: "#fff", border: "none", borderRadius: "8px", fontSize: "18px", cursor: "pointer" }}
      >
        Reserve Your Stay
      </button>
    </div>
  );
}