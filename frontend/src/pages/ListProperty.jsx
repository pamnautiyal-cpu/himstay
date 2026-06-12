import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function ListProperty() { // Function name fixed
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "Uttarkashi",
    location: "",
    price: "",
    phone: "",
    image: "",
    roomType: "Deluxe Comfort Room",
    guests: "2",
    view: "Mountain View"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      ...formData,
      price: Number(formData.price) || 1200,
      rating: 4.5,
      reviews: 1
    };

    axios
      .post(`${BACKEND_URL}/api/hotels`, finalData)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => navigate("/hotels"), 3000);
      })
      .catch((err) => {
        console.error("Error onboarding:", err);
        alert("Server error. Please verify your backend.");
        setLoading(false);
      });
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1>🏔️ List Your Property</h1>
          <p style={{ color: "#64748b" }}>Join the premier Uttarakhand hotel network.</p>
        </div>

        {success ? (
          <div style={{ padding: "20px", background: "#f0fdf4", color: "#16a34a", borderRadius: "8px", textAlign: "center" }}>
            🎉 Property successfully added! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Basics */}
            <div>
              <label style={labelStyle}>Hotel Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }} className="form-grid">
              <div>
                <label style={labelStyle}>City</label>
                <select name="city" value={formData.city} onChange={handleChange} style={inputStyle}>
                  <option value="Uttarkashi">Uttarkashi</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Mussoorie">Mussoorie</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Price per Night</label>
                <input type="number" name="price" required value={formData.price} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Processing..." : "⚡ Complete Free Listing"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Styles
const labelStyle = { display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "5px" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" };
const btnStyle = { background: "#006ce4", color: "#fff", padding: "14px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };