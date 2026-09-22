import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 1. HotelDetails se pass ki gayi state ko receive karna
  const { roomType = "Standard Room", finalPrice = 1799, mealPlan = "EP (Room Only)" } = location.state || {};

  const [hotel, setHotel] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    checkInDate: "",
    guests: "2"
  });

  // Coupon / Offer state variables
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // Local hotels database (fallback ke liye)
  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy" },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli" },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range" },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose" },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd" },
    "local_06": { name: "Himalayan Abode", location: "Main Market" },
    "local_07": { name: "Riverside Retreat", location: "Bhagirathi Bank" },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge" },
    "local_09": { name: "Green Valley Homestay", location: "Village Road" },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town" },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd" },
    "local_12": { name: "Peaceful Stay", location: "Valley View" },
    "local_13": { name: "Char Dham Camp", location: "Near Highway" },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road" },
    "local_15": { name: "Nature's Nest", location: "Orchard Side" },
    "local_16": { name: "Skyline Hotel", location: "City Center" }
  };

  useEffect(() => {
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch(() => setHotel({ name: "Himalayan Luxury Stay", location: "Uttarakhand" }));
    }
  }, [id]);

  // 2. Coupon apply karne ka logic (Price Reduce karne ke liye)
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (code === "HIMALAYA10" || code === "WELCOME10") {
      const discAmount = Math.round(finalPrice * 0.10); // 10% discount
      setDiscount(discAmount);
      setCouponMessage("🎉 10% Discount Applied Successfully!");
    } else if (code === "FLAT500") {
      setDiscount(500); // Flat ₹500 discount
      setCouponMessage("🎉 Flat ₹500 Discount Applied Successfully!");
    } else {
      setDiscount(0);
      setCouponMessage("❌ Invalid Coupon Code. Try HIMALAYA10 or FLAT500");
    }
  };

  const netPayablePrice = Math.max(0, finalPrice - discount);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed for ${formData.fullName}! Room: ${roomType}, Meal Plan: ${mealPlan}, Total Paid: ₹${netPayablePrice}`);
    navigate("/");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "white", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", padding: "32px" }}>
        
        <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a", marginBottom: "6px" }}>Book Your Stay</h2>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>
          {hotel ? hotel.name : "Loading hotel details..."} ({hotel?.location})
        </p>

        {/* Selected Room & Meal Plan Summary Box */}
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px", borderRadius: "12px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#166534", textTransform: "uppercase", display: "block" }}>Selected Configuration</span>
            <h4 style={{ fontSize: "16px", fontWeight: "900", color: "#14532d", margin: "2px 0" }}>{roomType}</h4>
            <span style={{ fontSize: "12px", color: "#166534", fontWeight: "700" }}>🍽️ Meal Plan: {mealPlan}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>Base Price: ₹{finalPrice}</span>
            {discount > 0 && <span style={{ fontSize: "12px", color: "#dc2626", display: "block" }}>Discount: -₹{discount}</span>}
            <span style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a" }}>₹{netPayablePrice}</span>
          </div>
        </div>

        {/* Coupon Code Section (Yahan price reduce hoga) */}
        <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", padding: "16px", borderRadius: "12px", marginBottom: "24px" }}>
          <label style={{ fontSize: "12px", fontWeight: "800", color: "#334155", display: "block", marginBottom: "8px" }}>Have a Coupon Code / Offer?</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input 
              type="text" 
              placeholder="e.g. HIMALAYA10 or FLAT500" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)}
              style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
            />
            <button 
              type="button" 
              onClick={handleApplyCoupon}
              style={{ background: "#0284c7", color: "white", border: "none", padding: "0 18px", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <p style={{ fontSize: "12px", fontWeight: "700", color: discount > 0 ? "#16a34a" : "#dc2626", margin: "8px 0 0 0" }}>
              {couponMessage}
            </p>
          )}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input type="text" name="fullName" required placeholder="Enter your name" value={formData.fullName} onChange={handleInputChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input type="email" name="email" required placeholder="name@example.com" value={formData.email} onChange={handleInputChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input type="tel" name="phone" required placeholder="9876543210" value={formData.phone} onChange={handleInputChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Your City</label>
              <input type="text" name="city" placeholder="e.g. Delhi, Dehradun" value={formData.city} onChange={handleInputChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Check-in Date *</label>
              <input type="date" name="checkInDate" required value={formData.checkInDate} onChange={handleInputChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Number of Guests *</label>
              <input type="number" name="guests" min="1" max="6" required value={formData.guests} onChange={handleInputChange} style={inputStyle} />
            </div>
          </div>

          <button 
            type="submit" 
            style={{ marginTop: "16px", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "900", fontSize: "15px", cursor: "pointer", boxShadow: "0 6px 18px rgba(34, 197, 94, 0.35)" }}
          >
            Pay Now & Confirm Booking (₹{netPayablePrice})
          </button>
        </form>

      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#475569",
  display: "block",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};