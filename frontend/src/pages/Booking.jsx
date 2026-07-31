import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hotelId = searchParams.get("hotelId");

  const [hotel, setHotel] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [packageType, setPackageType] = useState("Standard");
  const [notes, setNotes] = useState("");
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hotelId) {
      axios
        .get(`${BACKEND_URL}/api/hotels/${hotelId}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.error("Error loading hotel context:", err));
    }
  }, [hotelId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  async function handleBookingAndPayment(e) {
    e.preventDefault();

    if (!hotelId) return alert("Hotel selection missing.");
    if (!name || !phone || !email || !checkIn) return alert("Please fill required fields (*)");

    setLoading(true);

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setLoading(false);
      return;
    }

    try {
      const amountInPaise = hotel ? Number(hotel.price) * 100 : 250000;
      
      const orderRes = await axios.post(`${BACKEND_URL}/api/create-order`, {
        amount: amountInPaise, 
        currency: "INR"
      });

      const order = orderRes.data;

      if (!order || !order.order_id) {
        alert("Server failed to initiate order.");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_TKBfYo6v5i4nor",
        amount: order.amount,
        currency: order.currency,
        name: "The Himalayans",
        description: hotel ? hotel.name : "Himalayan Booking",
        order_id: order.order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${BACKEND_URL}/api/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
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
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification err:", err);
            alert("Internal error during confirmation.");
          } finally {
            setLoading(false);
          }
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#2563eb" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error("Payment Order Error:", err);
      alert("Failed to reach payment gateway.");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "30px", background: "#fff", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "5px", color: "#1e293b" }}>Book Your Stay</h2>
      {hotel && <p style={{ color: "#2563eb", fontWeight: "bold", marginTop: 0 }}>📍 {hotel.name} — ₹{hotel.price}/night</p>}
      
      <form onSubmit={handleBookingAndPayment} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <input placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input type="email" placeholder="Email Address *" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <input type="tel" placeholder="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputStyle} />
        <input placeholder="Your City" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
        
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", color: "#64748b" }}>Check-in Date *</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", color: "#64748b" }}>Number of Guests</label>
            <input type="number" min="1" max="10" value={guests} onChange={(e) => setGuests(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: "12px", color: "#64748b" }}>Choose Package</label>
          <select value={packageType} onChange={(e) => setPackageType(e.target.value)} style={inputStyle}>
            <option value="Standard">Standard Package</option>
            <option value="Deluxe">Deluxe Package</option>
            <option value="Premium">Premium Luxury Package</option>
          </select>
        </div>

        <textarea placeholder="Any Special Notes or Requirements?" value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" style={inputStyle} />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "14px", background: "linear-gradient(135deg,#16a34a,#22c55e)", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }}
        >
          {loading ? "Processing Secure Payment..." : "Pay Now & Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  boxSizing: "border-box"
};