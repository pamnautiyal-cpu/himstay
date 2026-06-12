import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", city: "Uttarkashi", location: "", price: "", 
    phone: "", roomType: "", guests: "2", view: "", description: "", image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend abhi sirf URL accept kar raha hai
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hotels`, formData);
      alert("Property Listed! Redirection to hotels...");
      navigate("/hotels");
    } catch (err) {
      alert("Backend error: Ensure your server is running and API path is correct.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>List Your Property</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        <input name="name" placeholder="Hotel Name *" required onChange={handleChange} style={inputStyle} />
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <select name="city" onChange={handleChange} style={inputStyle}>
            <option value="Uttarkashi">Uttarkashi</option>
            <option value="Rishikesh">Rishikesh</option>
            <option value="Mussoorie">Mussoorie</option>
          </select>
          <input name="price" type="number" placeholder="Price/Night *" required onChange={handleChange} style={inputStyle} />
        </div>

        <input name="location" placeholder="Full Address *" required onChange={handleChange} style={inputStyle} />
        <input name="phone" placeholder="Contact Number *" required onChange={handleChange} style={inputStyle} />
        <input name="image" placeholder="Image URL (Unsplash Link) *" required onChange={handleChange} style={inputStyle} />
        <textarea name="description" placeholder="Short description..." onChange={handleChange} style={{...inputStyle, height: "80px"}}></textarea>
        
        <button type="submit" style={btnStyle}>Complete Listing</button>
      </form>
    </div>
  );
}

const inputStyle = { padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" };
const btnStyle = { background: "#006ce4", color: "#fff", padding: "14px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" };