import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  // ✅ डेटा स्ट्रक्चर अपडेट: अब रूम सेट कैटेगरी के साथ
  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", description: "Luxury stay at Gangotri.", images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Cozy for couples" }, { type: "3 Bedroom Set", price: 2800, desc: "Spacious for family" }, { type: "4 Bedroom Set", price: 3200, desc: "Large group stay" }] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", description: "Cozy home-like stay.", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Comfortable homestay" }, { type: "3 Bedroom Set", price: 2800, desc: "Perfect for family" }] },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range", description: "Best hygiene stay.", images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Modern & clean" }, { type: "3 Bedroom Set", price: 2800, desc: "Extra space" }] },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose", description: "Modern comfort.", images: ["https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "City center comfort" }, { type: "4 Bedroom Set", price: 3200, desc: "Large luxury suite" }] },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd", description: "Nature's lap.", images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Nature view" }] },
    "local_06": { name: "Himalayan Abode", location: "Main Market", description: "Premium market stay.", images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, desc: "Market view" }, { type: "4 Bedroom Set", price: 3200, desc: "Premium luxury" }] },
    "local_07": { name: "Riverside Retreat", location: "Bhagirathi Bank", description: "River view retreat.", images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "River side" }, { type: "3 Bedroom Set", price: 2800, desc: "River view balcony" }] },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge", description: "Scenic view.", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Scenic mountain" }, { type: "3 Bedroom Set", price: 2800, desc: "Scenic wide view" }] },
    "local_09": { name: "Green Valley Homestay", location: "Village Road", description: "Simple stay.", images: ["https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Village vibes" }] },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town", description: "Old town experience.", images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Traditional" }, { type: "3 Bedroom Set", price: 2800, desc: "Spacious traditional" }] },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd", description: "Peak view.", images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Peak view" }, { type: "4 Bedroom Set", price: 3200, desc: "Wide peak view" }] },
    "local_12": { name: "Peaceful Stay", location: "Valley View", description: "Peaceful.", images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Valley peace" }] },
    "local_13": { name: "Char Dham Camp", location: "Near Highway", description: "Camp experience.", images: ["https://images.unsplash.com/photo-1559957335-5178652d87e0?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, desc: "Adventurous" }, { type: "4 Bedroom Set", price: 3200, desc: "Large camp" }] },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road", description: "Sunrise view.", images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "Sunrise view" }] },
    "local_15": { name: "Nature's Nest", location: "Orchard Side", description: "Nature nest.", images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, desc: "In orchard" }, { type: "3 Bedroom Set", price: 2800, desc: "Luxury orchard" }] },
    "local_16": { name: "Skyline Hotel", location: "City Center", description: "City view.", images: ["https://images.unsplash.com/photo-1501758888041-af3ef285b470?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, desc: "City luxury" }, { type: "4 Bedroom Set", price: 3200, desc: "Grand view" }] }
  };

  useEffect(() => {
    if (localHotels[id]) setHotel(localHotels[id]);
    else if (id && id.length === 24) {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.error("Error:", err));
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
          if (res.data.success) { alert("🎉 Booking Confirmed!"); navigate("/mytrips"); }
        },
        theme: { color: "#006ce4" }
      };
      new window.Razorpay(options).open();
    } catch (err) { alert("Payment error, please try again."); }
  };

  if (!hotel) return <div>🏔️ Loading Details...</div>;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{hotel.name}</h1>
      <p>📍 {hotel.location}</p>
      <img src={hotel.images[0]} alt={hotel.name} style={{ width: "100%", borderRadius: "15px" }} />
      <p style={{ fontSize: "18px", marginTop: "20px" }}>{hotel.description}</p>
      <div className="room-options" style={{ marginTop: "40px" }}>
        <h3>Select Your Room Category</h3>
        {hotel.rooms?.map((room, index) => (
          <div key={index} style={{ border: "1px solid #e2e8f0", padding: "20px", marginBottom: "15px", borderRadius: "12px", background: "#f8fafc" }}>
            <h4>{room.type}</h4>
            <p style={{ color: "#64748b" }}>{room.desc}</p>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>Price: ₹{room.price}</p>
            <button onClick={() => handlePayment(room.price)} style={{ padding: "10px 25px", background: "#006ce4", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Reserve {room.type}</button>
          </div>
        )) || <p>Contact for booking: ₹{hotel.price}</p>}
      </div>
    </div>
  );
}