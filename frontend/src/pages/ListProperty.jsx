import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function ListProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // 1. LOGIN CHECK - Auth Check (यदि यूजर लॉगिन नहीं है तो लॉगिन पेज पर भेजें)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login first to list your property!");
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "", 
    propertyType: "Homestay", // नई प्रॉपर्टी टाइप जोड़ी गई
    city: "Uttarkashi", 
    location: "", 
    price: "", 
    phone: "", 
    description: "", 
    facilities: "", 
    checkIn: "12:00 PM", 
    checkOut: "11:00 AM", 
    roomDetails: "2 Room Set", 
    maxGuests: "", // अधिकतम मेहमानों के लिए
    specialExperiences: [] // योग, ट्रेक आदि के लिए
  });
  
  const [files, setFiles] = useState([]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // स्पेशल एक्सपीरियंस चेकबॉक्स के लिए हैंडलर
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        specialExperiences: [...prev.specialExperiences, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        specialExperiences: prev.specialExperiences.filter(item => item !== value)
      }));
    }
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
    if (files.length === 0) return alert("Please upload at least one image");
    
    setLoading(true);
    const data = new FormData();
    for (let key in formData) { 
      if (key === "specialExperiences") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]); 
      }
    }
    files.forEach((file) => { data.append("images", file); });

    // किस यूजर ने प्रॉपर्टी लिस्ट की है, उसकी जानकारी जोड़ें
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (currentUser.email) {
      data.append("ownerEmail", currentUser.email);
    }

    try {
      // प्रॉपर्टी डेटाबेस में सबमिट करें (Cloudinary / Backend हैंडलिंग सुरक्षित है)
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/add`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // 2. EMAIL NOTIFICATION - सबमिट होने पर ईमेल भेजें (अगर फेल हो तो भी फॉर्म न रुके)
      try {
        await emailjs.send(
          "service_lvjl1yl", 
          "template_17qwwpa", 
          {
            name: currentUser.name || "Admin",
            title: formData.name, 
            message: `Type: ${formData.propertyType}, Location: ${formData.location}, Price: ${formData.price}, Phone: ${formData.phone}, Owner: ${currentUser.email || 'N/A'}`,
            email: "system@thehimalayans.com"
          }, 
          "BN7sU5C5l-KUXpOj"
        );
      } catch (emailErr) {
        console.log("Email notification skipped/failed:", emailErr);
      }

      setLoading(false);
      setShowSuccessModal(true); // सफलता का पॉप-अप दिखाएं

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <div style={{ maxWidth: "650px", margin: "40px auto", padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", position: "relative" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>List Your Property</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        {/* Hotel/Property Name */}
        <input name="name" placeholder="Hotel / Property Name *" required onChange={handleChange} style={inputStyle} />
        
        {/* Property Type & City */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <select name="propertyType" onChange={handleChange} style={inputStyle}>
            <option value="Homestay">Homestay</option>
            <option value="Hotel">Hotel</option>
            <option value="Villa / Cottage">Villa / Cottage</option>
            <option value="Apartment">Apartment</option>
          </select>
          <select name="city" onChange={handleChange} style={inputStyle}>
            <option value="Uttarkashi">Uttarkashi</option>
            <option value="Rishikesh">Rishikesh</option>
            <option value="Mussoorie">Mussoorie</option>
            <option value="Dehradun">Dehradun</option>
            <option value="Chakrata">Chakrata</option>
          </select>
        </div>

        {/* Price & Max Guests */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <input name="price" type="number" placeholder="Price/Night (₹) *" required onChange={handleChange} style={inputStyle} />
          <input name="maxGuests" type="number" placeholder="Max Guests (e.g., 4)" onChange={handleChange} style={inputStyle} />
        </div>

        <input name="location" placeholder="Full Address *" required onChange={handleChange} style={inputStyle} />
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <input name="phone" placeholder="Contact Number *" required onChange={handleChange} style={inputStyle} />
          <select name="roomDetails" onChange={handleChange} style={inputStyle}>
            <option value="1 Room Set">1 Room Set</option>
            <option value="2 Room Set">2 Room Set</option>
            <option value="3 Room Set">3 Room Set</option>
            <option value="Deluxe Room">Deluxe Room</option>
            <option value="Standard Room">Standard Room</option>
            <option value="Entire Villa">Entire Villa</option>
          </select>
        </div>

        <input name="facilities" placeholder="Facilities (e.g., Food, Parking, CCTV, WiFi)" onChange={handleChange} style={inputStyle} />
        
        {/* Special Mountain Activities / Offerings */}
        <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
          <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
            Special Experiences / Activities Offered:
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "14px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <input type="checkbox" value="Yoga & Wellness Retreats" onChange={handleCheckboxChange} /> Yoga & Wellness
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <input type="checkbox" value="Trekking & Camping" onChange={handleCheckboxChange} /> Treks & Camping
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <input type="checkbox" value="Garhwali Local Food" onChange={handleCheckboxChange} /> Garhwali Food
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <input type="checkbox" value="Bonfire & Stargazing" onChange={handleCheckboxChange} /> Bonfire
            </label>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <input name="checkIn" placeholder="Check-in (e.g. 12:00 PM)" defaultValue="12:00 PM" onChange={handleChange} style={inputStyle} />
          <input name="checkOut" placeholder="Check-out (e.g. 11:00 AM)" defaultValue="11:00 AM" onChange={handleChange} style={inputStyle} />
        </div>

        <label style={{ fontSize: "14px", fontWeight: "600" }}>Upload Multiple Images *</label>
        <input type="file" multiple onChange={handleFileChange} style={inputStyle} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {files.map((file, index) => (
            <div key={index} style={{ padding: "5px 10px", background: "#e2e8f0", borderRadius: "15px", fontSize: "12px" }}>
              {file.name.substring(0, 15)}... <span onClick={() => removeFile(index)} style={{ cursor: "pointer", color: "red" }}>x</span>
            </div>
          ))}
        </div>

        <textarea name="description" placeholder="Short description..." onChange={handleChange} style={{...inputStyle, height: "80px"}}></textarea>
        
        <div style={{ fontSize: "13px", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px" }}>
          <input type="checkbox" required style={{ marginTop: "3px" }} />
          <span>I agree to the Terms & Conditions and confirm all info is verified.</span>
        </div>
        
        <button type="submit" style={btnStyle} disabled={loading}>
          {loading ? "Uploading..." : "Complete Listing"}
        </button>
      </form>

      {/* SUCCESS POPUP MODAL */}
      {showSuccessModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center",
          alignItems: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#fff", padding: "30px", borderRadius: "16px",
            textAlign: "center", maxWidth: "400px", width: "90%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}>
            <div style={{ fontSize: "50px", marginBottom: "10px" }}>🎉</div>
            <h2 style={{ color: "#1e293b", marginBottom: "10px" }}>Property Listed Successfully!</h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
              Your property has been submitted and sent for admin review.
            </p>
            <button 
              onClick={() => navigate("/hotels")} 
              style={{
                background: "#0ea5e9", color: "#fff", border: "none",
                padding: "12px 24px", borderRadius: "8px", fontSize: "16px",
                cursor: "pointer", fontWeight: "600", width: "100%"
              }}
            >
              View All Properties
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" };
const btnStyle = { background: "#006ce4", color: "#fff", padding: "14px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" };