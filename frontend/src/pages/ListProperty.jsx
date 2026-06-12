import React, { useState } from "react";

export default function ListProperty() {
  // State management for form
  const [formData, setFormData] = useState({ 
    name: "", 
    city: "", 
    price: "", 
    description: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Property '" + formData.name + "' submitted successfully!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#1e293b" }}>List your property on The Himalayans</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" name="name" placeholder="Property Name" required 
          value={formData.name} onChange={handleChange} style={inputStyle} 
        />
        <input 
          type="text" name="city" placeholder="City" required 
          value={formData.city} onChange={handleChange} style={inputStyle} 
        />
        <input 
          type="number" name="price" placeholder="Price per night" required 
          value={formData.price} onChange={handleChange} style={inputStyle} 
        />
        <textarea 
          name="description" placeholder="Description" 
          value={formData.description} onChange={handleChange} 
          style={{...inputStyle, height: "100px"}}
        ></textarea>
        <button type="submit" style={btnStyle}>Submit Property</button>
      </form>
    </div>
  );
}

// Styling Constants
const inputStyle = { 
  width: "100%", 
  padding: "12px", 
  margin: "10px 0", 
  borderRadius: "6px", 
  border: "1px solid #cbd5e1",
  boxSizing: "border-box" // Input border ke bahar na nikle
};

const btnStyle = { 
  background: "#2563eb", 
  color: "#fff", 
  padding: "14px", 
  border: "none", 
  borderRadius: "6px", 
  cursor: "pointer", 
  width: "100%",
  fontSize: "16px",
  fontWeight: "bold"
};