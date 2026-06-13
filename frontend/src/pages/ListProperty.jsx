import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", city: "Uttarkashi", location: "", price: "", 
    phone: "", roomType: "", guests: "2", view: "", description: ""
  });
  
  const [files, setFiles] = useState([]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("कम से कम एक इमेज ज़रूर चुनें!");
    
    setLoading(true);
    const data = new FormData();
    
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    
    files.forEach((file) => {
      data.append("images", file);
    });

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/add`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Property Listed Successfully!");
      navigate("/hotels");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
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
        
        <label style={{ fontSize: "14px", fontWeight: "600" }}>Upload Multiple Images *</label>
        <input 
          type="file" 
          name="images" 
          accept="image/*" 
          multiple 
          onChange={handleFileChange} 
          style={inputStyle} 
        />
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "5px" }}>
          {files.map((file, index) => (
            <div key={index} style={{ padding: "5px 10px", background: "#e2e8f0", borderRadius: "15px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
              {file.name.substring(0, 15)}...
              <span onClick={() => removeFile(index)} style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}>x</span>
            </div>
          ))}
        </div>

        <textarea name="description" placeholder="Short description..." onChange={handleChange} style={{...inputStyle, height: "80px"}}></textarea>
        
        {/* ✅ Terms & Conditions Checkbox */}
        <div style={{ fontSize: "13px", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px" }}>
          <input type="checkbox" required style={{ marginTop: "3px" }} />
          <span>
            I agree to the Terms & Conditions and confirm that all property information and images are verified and owned by me.
          </span>
        </div>
        
        <button type="submit" style={btnStyle} disabled={loading}>
          {loading ? "Uploading..." : "Complete Listing"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" };
const btnStyle = { background: "#006ce4", color: "#fff", padding: "14px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" };