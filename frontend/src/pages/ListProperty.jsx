import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function ListProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "Uttarkashi",
    location: "", // Address ke liye
    price: "",
    phone: "",    // Contact number ke liye
    image: "",    // Image link ke liye
    roomType: "",
    guests: "2"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${BACKEND_URL}/api/hotels`, formData)
      .then(() => {
        alert("Property listed successfully!");
        navigate("/hotels");
      })
      .catch((err) => {
        console.error(err);
        alert("Error listing property.");
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", background: "#f8fafc", borderRadius: "10px" }}>
      <h2>List Your Property</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input name="name" placeholder="Hotel / Homestay Name *" required onChange={handleChange} style={inputStyle} />
        
        <select name="city" onChange={handleChange} style={inputStyle}>
          <option value="Uttarkashi">Uttarkashi</option>
          <option value="Rishikesh">Rishikesh</option>
          <option value="Mussoorie">Mussoorie</option>
        </select>

        <input name="location" placeholder="Full Address *" required onChange={handleChange} style={inputStyle} />
        <input name="phone" type="tel" placeholder="Contact Number *" required onChange={handleChange} style={inputStyle} />
        <input name="price" type="number" placeholder="Price per Night *" required onChange={handleChange} style={inputStyle} />
        <input name="image" type="url" placeholder="Image URL (Unsplash link) *" required onChange={handleChange} style={inputStyle} />
        <input name="roomType" placeholder="Room Type (e.g. Deluxe Room)" onChange={handleChange} style={inputStyle} />
        
        <button type="submit" style={btnStyle} disabled={loading}>
          {loading ? "Submitting..." : "⚡ Complete Free Listing"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { padding: "12px", borderRadius: "6px", border: "1px solid #ccc" };
const btnStyle = { background: "#006ce4", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", cursor: "pointer" };