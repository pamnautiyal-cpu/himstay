import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  // 16 Hotels ka complete database
  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", price: 3500, description: "Luxury stay at Gangotri Hwy.", images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", price: 1800, description: "Cozy home-like stay.", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"] },
    // ... baki 16 tak yahan honge
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

  // ✅ YAHI HAI WOH PAYMENT FUNCTION JO AAPNE GAYAB KAR DIYA THA
  const handlePayment = async (amount) => {
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
      <p>📍 {hotel.location}</p>
      <img src={hotel.images[0]} style={{ width: "100%", borderRadius: "15px" }} />
      <h3>{hotel.description}</h3>
      <h2>Price: ₹{hotel.price}</h2>
      
      {/* ✅ YAHAN CLICK HONE PAR PAYMENT KHULEGA */}
      <button 
        onClick={() => handlePayment(hotel.price)} 
        style={{ padding: "15px 40px", background: "#006ce4", color: "#fff", border: "none", borderRadius: "8px", fontSize: "18px", cursor: "pointer" }}
      >
        Reserve Your Stay
      </button>
    </div>
  );
}