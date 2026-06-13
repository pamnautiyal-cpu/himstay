import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  // ✅ पूरा डेटा अपडेट कर दिया गया है, सभी 16 होटल्स के लिए rooms और inclusions के साथ
  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", description: "Luxury stay at Gangotri.", images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed", "Attached Bath", "TV"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Extra Bed", "TV", "Hot Water"] }] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", description: "Cozy home-like stay.", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed", "TV"] }] },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range", description: "Best hygiene stay.", images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Attached Bath", "Hygienic"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Extra Space", "TV"] }] },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose", description: "Modern comfort.", images: ["https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Modern Bed", "WiFi"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Luxury Suite", "TV"] }] },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd", description: "Nature's lap.", images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed", "Nature View"] }] },
    "local_06": { name: "Himalayan Abode", location: "Main Market", description: "Premium market stay.", images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, inclusions: ["Market View", "TV"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Premium Bed", "Attached Bath"] }] },
    "local_07": { name: "Riverside Retreat", location: "Bhagirathi Bank", description: "River view retreat.", images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["River View", "TV"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Balcony", "Hot Water"] }] },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge", description: "Scenic view.", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Scenic View", "TV"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Mountain View", "Attached Bath"] }] },
    "local_09": { name: "Green Valley Homestay", location: "Village Road", description: "Simple stay.", images: ["https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed"] }] },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town", description: "Old town experience.", images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Traditional Bed"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Spacious", "TV"] }] },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd", description: "Peak view.", images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Peak View", "TV"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Wide View", "Attached Bath"] }] },
    "local_12": { name: "Peaceful Stay", location: "Valley View", description: "Peaceful.", images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Peaceful Env"] }] },
    "local_13": { name: "Char Dham Camp", location: "Near Highway", description: "Camp experience.", images: ["https://images.unsplash.com/photo-1559957335-5178652d87e0?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, inclusions: ["Adventure Bed"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Large Camp", "Attached Bath"] }] },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road", description: "Sunrise view.", images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Sunrise View", "TV"] }] },
    "local_15": { name: "Nature's Nest", location: "Orchard Side", description: "Nature nest.", images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Orchard View"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Luxury Bed", "TV"] }] },
    "local_16": { name: "Skyline Hotel", location: "City Center", description: "City view.", images: ["https://images.unsplash.com/photo-1501758888041-af3ef285b470?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, inclusions: ["City View", "TV"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Grand Bed", "Attached Bath"] }] }
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
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>← Back</button>
      <h1>{hotel.name}</h1>
      <p>📍 {hotel.location}</p>
      <img src={hotel.images[0]} alt={hotel.name} style={{ width: "100%", borderRadius: "15px" }} />
      <p style={{ fontSize: "18px", marginTop: "20px" }}>{hotel.description}</p>

      {/* YatraDham स्टाइल टेबल लेआउट */}
      <div className="room-options" style={{ marginTop: "40px" }}>
        <h3>Hotel Rooms</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          {hotel.rooms?.map((room, index) => (
            <div key={index} style={{ 
              display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1fr", alignItems: "center", 
              borderBottom: "1px solid #eee", padding: "15px", background: "#fff", 
              borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
            }}>
              <div><h4 style={{ margin: 0 }}>{room.type}</h4></div>
              <ul style={{ fontSize: "13px", color: "#555", margin: 0, paddingLeft: "15px" }}>
                {room.inclusions?.map((inc, i) => <li key={i}>{inc}</li>)}
              </ul>
              <div>
                <p style={{ fontWeight: "bold", fontSize: "1.1rem", margin: 0 }}>₹{room.price}</p>
              </div>
              <button onClick={() => handlePayment(room.price)} style={{ padding: "10px", background: "#f97316", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Book this Room
              </button>
            </div>
          )) || <p>Contact for booking: ₹{hotel.price}</p>}
        </div>
      </div>
    </div>
  );
}