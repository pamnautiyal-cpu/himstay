import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const BACKEND_URL = "https://himstay.onrender.com";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hotelId = searchParams.get("hotelId");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState(2);
  const [packageType, setPackageType] = useState("Standard");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBookingAndPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. बैकएंड से Razorpay ऑर्डर आईडी बनाएं
      const orderRes = await axios.post(`${BACKEND_URL}/api/payment/create-order`, { amount: 3500 }); // एस्टीमेट अमाउंट
      const order = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: "INR",
        name: "HimStay",
        description: "Hotel Booking Payment",
        order_id: order.id,
        handler: async function (response) {
          // 2. पेमेंट वेरिफिकेशन और डेटाबेस में सेव करना
          await axios.post(`${BACKEND_URL}/api/bookings`, {
            hotelId,
            name,
            email,
            phone,
            city,
            guests: Number(guests),
            checkIn,
            packageType,
            notes,
          });

          alert("Booking & Payment Successful! 🎉");
          navigate("/mytrips");
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed or server issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <h2>Complete Your Booking</h2>
      <form onSubmit={handleBookingAndPayment} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputStyle} />
        <input placeholder="Your City" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required style={inputStyle} />
        
        <select value={packageType} onChange={(e) => setPackageType(e.target.value)} style={inputStyle}>
          <option value="Standard">Standard Package</option>
          <option value="Deluxe">Deluxe Package</option>
          <option value="Premium">Premium Package</option>
        </select>

        <button type="submit" disabled={loading} style={{ padding: "12px", background: "#16a34a", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Processing Payment..." : "Pay Now & Confirm"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" };