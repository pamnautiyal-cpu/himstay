import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function ListProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // 1. LOGIN CHECK
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login first to list your property!");
      navigate("/login");
    }
  }, [navigate]);

  // Main Category Dropdown: "hotel", "yoga", "trek"
  const [listingCategory, setListingCategory] = useState("hotel");

  const [formData, setFormData] = useState({
    name: "", 
    city: "Uttarkashi", 
    location: "", 
    price: "", 
    phone: "", 
    description: "", 
    facilities: "", 
    checkIn: "12:00 PM", 
    checkOut: "11:00 AM", 
    roomDetails: "2 Room Set", 
    maxGuests: "",
    // Yoga & Trek specific fields
    duration: "", 
    difficulty: "Easy", 
    batchDates: ""
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
    if (files.length === 0) return alert("Please upload at least one image");
    
    setLoading(true);
    const data = new FormData();
    data.append("listingCategory", listingCategory); // कौन सी कैटेगरी है (Hotel/Yoga/Trek)
    for (let key in formData) { data.append(key, formData[key]); }
    files.forEach((file) => { data.append("images", file); });

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (currentUser.email) {
      data.append("ownerEmail", currentUser.email);
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/add`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      try {
        await emailjs.send(
          "service_lvjl1yl", 
          "template_17qwwpa", 
          {
            name: currentUser.name || "Admin",
            title: formData.name, 
            message: `Category: ${listingCategory.toUpperCase()}, Location: ${formData.location}, Price: ${formData.price}, Phone: ${formData.phone}`,
            email: "system@thehimalayans.com"
          }, 
          "BN7sU5C5l-KUXpOj"
        );
      } catch (emailErr) {
        console.log("Email notification skipped/failed:", emailErr);
      }

      setLoading(false);
      setShowSuccessModal(true);

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <div style={{ maxWidth: "650px", margin: "40px auto", padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", position: "relative" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1e293b" }}>List Your Offering</h2>
      
      {/* 🌟 MAIN DROPDOWN TO SELECT CATEGORY */}
      <div style={{ marginBottom: "20px", background: "#f0fdf4", padding: "15px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
        <label style={{ fontSize: "15px", fontWeight: "700", color: "#166534", display: "block", marginBottom: "8px" }}>
          What would you like to list? *
        </label>
        <select 
          value={listingCategory} 
          onChange={(e) => setListingCategory(e.target.value)} 
          style={{ ...inputStyle, fontWeight: "600", background: "#fff", borderColor: "#4ade80" }}
        >
          <option value="hotel">🏨 Hotel / Homestay Listing</option>
          <option value="yoga">🧘 Yoga & Wellness Retreat</option>
          <option value="trek">⛺ Trekking & Camping Experience</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        
        {/* Name / Title */}
        <input 
          name="name" 
          placeholder={
            listingCategory === "hotel" ? "Hotel / Homestay Name *" :
            listingCategory === "yoga" ? "Yoga Retreat / Program Name *" : "Trek / Campsite Name *"
          } 
          required 
          onChange={handleChange} 
          style={inputStyle} 
        />

        {/* City & Price */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <select name="city" onChange={handleChange} style={inputStyle}>
            <option value="Uttarkashi">Uttarkashi</option>
            <option value="Rishikesh">Rishikesh</option>
            <option value="Mussoorie">Mussoorie</option>
            <option value="Dehradun">Dehradun</option>
            <option value="Chakrata">Chakrata</option>
          </select>
          <input 
            name="price" 
            type="number" 
            placeholder={listingCategory === "hotel" ? "Price / Night (₹) *" : "Price per Person (₹) *"} 
            required 
            onChange={handleChange} 
            style={inputStyle} 
          />
        </div>

        {/* --- 1. HOTEL SPECIFIC FIELDS --- */}
        {listingCategory === "hotel" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <select name="roomDetails" onChange={handleChange} style={inputStyle}>
                <option value="1 Room Set">1 Room Set</option>
                <option value="2 Room Set">2 Room Set</option>
                <option value="3 Room Set">3 Room Set</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Entire Villa">Entire Villa</option>
              </select>
              <input name="maxGuests" type="number" placeholder="Max Guests (e.g. 4)" onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input name="checkIn" placeholder="Check-in (e.g. 12:00 PM)" defaultValue="12:00 PM" onChange={handleChange} style={inputStyle} />
              <input name="checkOut" placeholder="Check-out (e.g. 11:00 AM)" defaultValue="11:00 AM" onChange={handleChange} style={inputStyle} />
            </div>
            <input name="facilities" placeholder="Hotel Facilities (e.g., Free WiFi, Geyser, Parking, CCTV)" onChange={handleChange} style={inputStyle} />
          </>
        )}

        {/* --- 2. YOGA & WELLNESS SPECIFIC FIELDS --- */}
        {listingCategory === "yoga" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input name="duration" placeholder="Duration (e.g. 5 Days / 7 Days)" onChange={handleChange} style={inputStyle} />
              <input name="batchDates" placeholder="Next Batch Date (e.g. 15 Aug 2026)" onChange={handleChange} style={inputStyle} />
            </div>
            <input name="facilities" placeholder="Retreat Highlights (e.g., Meditation, Ayurvedic Meals, Certified Guru)" onChange={handleChange} style={inputStyle} />
          </>
        )}

        {/* --- 3. TREK & CAMPING SPECIFIC FIELDS --- */}
        {listingCategory === "trek" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input name="duration" placeholder="Trek Duration (e.g. 3 Days / 4 Nights)" onChange={handleChange} style={inputStyle} />
              <select name="difficulty" onChange={handleChange} style={inputStyle}>
                <option value="Easy">Difficulty: Easy</option>
                <option value="Moderate">Difficulty: Moderate</option>
                <option value="Difficult">Difficulty: Difficult / Steep</option>
              </select>
            </div>
            <input name="facilities" placeholder="Inclusions (e.g., Tents, Sleeping Bags, Guide, Meals, Bonfire)" onChange={handleChange} style={inputStyle} />
          </>
        )}

        <input name="location" placeholder="Full Address / Starting Point Location *" required onChange={handleChange} style={inputStyle} />
        <input name="phone" placeholder="Contact Number *" required onChange={handleChange} style={inputStyle} />

        {/* Images Upload */}
        <label style={{ fontSize: "14px", fontWeight: "600" }}>Upload Photos / Gallery *</label>
        <input type="file" multiple onChange={handleFileChange} style={inputStyle} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {files.map((file, index) => (
            <div key={index} style={{ padding: "5px 10px", background: "#e2e8f0", borderRadius: "15px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
              {file.name.substring(0, 15)}... <span onClick={() => removeFile(index)} style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}>x</span>
            </div>
          ))}
        </div>

        <textarea 
          name="description" 
          placeholder={
            listingCategory === "hotel" ? "Write about rooms, view and surroundings..." :
            listingCategory === "yoga" ? "Describe the yoga schedule, teacher experience & benefits..." :
            "Describe the trek route, altitude, highest point & inclusions..."
          } 
          onChange={handleChange} 
          style={{...inputStyle, height: "80px"}}
        ></textarea>
        
        <div style={{ fontSize: "13px", color: "#475569", display: "flex", alignItems: "flex-start", gap: "8px" }}>
          <input type="checkbox" required style={{ marginTop: "3px" }} />
          <span>I agree to the Terms & Conditions and confirm all details are accurate.</span>
        </div>
        
        <button type="submit" style={btnStyle} disabled={loading}>
          {loading ? "Publishing Listing..." : "Complete Listing"}
        </button>
      </form>

      {/* SUCCESS MODAL */}
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
            <h2 style={{ color: "#1e293b", marginBottom: "10px" }}>Listing Added Successfully!</h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
              Your {listingCategory.toUpperCase()} offering has been submitted for admin review.
            </p>
            <button 
              onClick={() => navigate("/hotels")} 
              style={{
                background: "#0ea5e9", color: "#fff", border: "none",
                padding: "12px 24px", borderRadius: "8px", fontSize: "16px",
                cursor: "pointer", fontWeight: "600", width: "100%"
              }}
            >
              View Listings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px" };
const btnStyle = { background: "#006ce4", color: "#fff", padding: "14px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", fontWeight: "600" };