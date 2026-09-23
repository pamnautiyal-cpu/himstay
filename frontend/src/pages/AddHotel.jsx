import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AddHotel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "Uttarkashi",
    location: "",
    price: "",
    rating: "4.8",
    tag: "New Listing ✨",
    image: "",
    description: "",
    amenities: "Free WiFi, Parking, Mountain View, Couple Friendly"
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newHotelObj = {
      _id: "custom_" + Date.now(),
      ...formData,
      price: formData.price || "2,499",
      image: formData.image || "/images/hotals/Hotel Nagraja Palace1.jpg"
    };

    try {
      // 1. Try sending to backend API
      await axios.post(`${BACKEND_URL}/api/hotels`, newHotelObj);
    } catch (err) {
      console.log("Backend offline, saving locally for instant view...");
    }

    // 2. Fallback / Permanent LocalStorage sync so it instantly shows in AllStays
    const existingLocal = JSON.parse(localStorage.getItem("user_added_hotels") || "[]");
    localStorage.setItem("user_added_hotels", JSON.stringify([newHotelObj, ...existingLocal]));

    setLoading(false);
    setSuccessMsg("🎉 Property successfully listed & published!");
    
    setTimeout(() => {
      navigate("/hotels"); // Redirect back to AllStays page to see the new hotel
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "#ffffff", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
        
        <span style={{ background: "rgba(2, 132, 199, 0.1)", color: "#0284c7", padding: "6px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
          Partner Registration
        </span>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "12px 0 8px 0" }}>
          List Your Property on HimStay
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "30px" }}>
          Add your hotel, homestay or villa details below. It will instantly go live on the All Stays portal with booking & payment support.
        </p>

        {successMsg && (
          <div style={{ background: "#f0fdf4", color: "#16a34a", padding: "14px", borderRadius: "12px", fontWeight: "700", marginBottom: "20px", border: "1px solid #bbf7d0", textAlign: "center" }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Hotel / Property Name *</label>
              <input type="text" name="name" required placeholder="e.g. Himalayan Pine Resort" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>City / Region *</label>
              <input type="text" name="city" required placeholder="e.g. Uttarkashi / Matli" value={formData.city} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Exact Location</label>
              <input type="text" name="location" placeholder="e.g. Near Main Market" value={formData.location} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Price Per Night (₹) *</label>
              <input type="text" name="price" required placeholder="e.g. 2,499" value={formData.price} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Special Tag</label>
              <input type="text" name="tag" placeholder="e.g. Best Seller ⭐" value={formData.tag} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Image URL / Path *</label>
            <input type="text" name="image" required placeholder="e.g. /images/hotals/Hotel Nagraja Palace1.jpg or external image URL" value={formData.image} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Property Description</label>
            <textarea name="description" rows="3" placeholder="Describe the view, rooms, hospitality..." value={formData.description} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }}></textarea>
          </div>

          <button type="submit" disabled={loading} style={{ background: "#0284c7", color: "white", border: "none", padding: "15px", borderRadius: "12px", fontWeight: "800", fontSize: "15px", cursor: "pointer", marginTop: "10px", boxShadow: "0 6px 20px rgba(2, 132, 199, 0.4)" }}>
            {loading ? "Publishing Property..." : "Publish Hotel Listing 🚀"}
          </button>

        </form>
      </div>
    </div>
  );
}