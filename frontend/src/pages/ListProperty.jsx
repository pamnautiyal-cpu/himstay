import React, { useState } from "react";

export default function ListProperty() {
  const [formData, setFormData] = useState({ name: "", city: "", price: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Property submitted successfully!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>List your property on The Himalayans</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Property Name" required style={inputStyle} />
        <input type="text" placeholder="City" required style={inputStyle} />
        <input type="number" placeholder="Price per night" required style={inputStyle} />
        <textarea placeholder="Description" style={{...inputStyle, height: "100px"}}></textarea>
        <button type="submit" style={btnStyle}>Submit Property</button>
      </form>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "12px", margin: "10px 0", borderRadius: "4px", border: "1px solid #ccc" };
const btnStyle = { background: "#2563eb", color: "#fff", padding: "12px", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%" };