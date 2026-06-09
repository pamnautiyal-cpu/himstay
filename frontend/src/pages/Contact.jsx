import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function Contact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // फॉर्म डेटा की स्टेट स्ट्रक्चर (बैकएंड मॉडल के अनुसार)
  const [formData, setFormData] = useState({
    name: "",
    city: "Uttarkashi", // डिफ़ॉल्ट सिलेक्शन
    location: "",
    price: "",
    rating: "4.5", // नई प्रॉपर्टी के लिए डिफ़ॉल्ट रेटिंग
    reviews: "1",   // डिफ़ॉल्ट रिव्यू काउंट
    phone: "",
    image: "",
    roomType: "Deluxe Comfort Room",
    guests: "2",
    view: "Mountain View"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // स्ट्रिंग प्राइस को नंबर में बदलें
    const finalData = {
      ...formData,
      price: Number(formData.price) || 1200
    };

    // 🚀 डेटाबेस एपीआई पोस्ट रिक्वेस्ट (सीधे तुम्हारे मोंगोडीबी बैकएंड में सेव होगा)
    axios
      .post(`${BACKEND_URL}/api/hotels`, finalData)
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        // 3 सेकंड के बाद ओनर को सीधे होटल्स लिस्टिंग पेज पर ले जाएं ताकि वो अपना होटल देख सके
        setTimeout(() => {
          navigate("/hotels");
        }, 3000);
      })
      .catch((err) => {
        console.error("Error onboarding property:", err);
        alert("Server error. Please try again or verify your backend deployment.");
        setLoading(false);
      });
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "50px 20px", fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
        
        {/* HEADER BLOCK */}
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <span style={{ fontSize: "40px" }}>🏔️🤝</span>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "10px 0 6px 0" }}>List Your Property on The Himalayans</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "15px", lineHeight: "1.5" }}>
            Join Uttarakhand's premier premium hotel network. Fill in the details below to start earning commission-free bookings instantly.
          </p>
        </div>

        {/* SUCCESS MESSAGE BANNER */}
        {success ? (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", padding: "20px", borderRadius: "12px", textAlign: "center", fontWeight: "700", marginBottom: "20px" }}>
            🎉 Celebration! Your property has been successfully onboarded into our database. Redirecting you to the active listings to view your live setup...
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* SECTION 1: BASIC INFO */}
            <div>
              <h3 style={sectionTitleStyle}>1. Property Basics</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }} className="form-grid">
                <div>
                  <label style={labelStyle}>Hotel / Homestay Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Ganga View Resort" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Select Region / City *</label>
                  <select name="city" value={formData.city} onChange={handleChange} style={inputStyle}>
                    <option value="Uttarkashi">Uttarkashi (Matli/Athali)</option>
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Mussoorie">Mussoorie</option>
                    <option value="Dehradun">Dehradun</option>
                    <option value="Nainital">Nainital</option>
                    <option value="Char Dham">Char Dham Route</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: MANAGEMENT & CONTACT */}
            <div>
              <h3 style={sectionTitleStyle}>2. Location & Contact Security</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                  <label style={labelStyle}>Complete Official Address *</label>
                  <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="e.g. Near ITBP Road, Matli, Uttarakhand 249193" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Owner Official Contact Number (Hidden from Users for Earning Safety) *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="e.g. 094101XXXXX" style={inputStyle} />
                </div>
              </div>
            </div>

            {/* SECTION 3: RATES & SPECS */}
            <div>
              <h3 style={sectionTitleStyle}>3. Pricing & Configurations</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }} className="form-grid">
                <div>
                  <label style={labelStyle}>Price per Night (INR ₹) *</label>
                  <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="e.g. 2500" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Room Type Category</label>
                  <input type="text" name="roomType" value={formData.roomType} onChange={handleChange} placeholder="e.g. Premium Family Suite" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Max Guest Capacity</label>
                  <input type="number" name="guests" value={formData.guests} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Scenic Balcony View Type</label>
                  <input type="text" name="view" value={formData.view} onChange={handleChange} placeholder="e.g. River Stream View" style={inputStyle} />
                </div>
              </div>
            </div>

            {/* SECTION 4: MEDIA LINKS */}
            <div>
              <h3 style={sectionTitleStyle}>4. Media Showcase</h3>
              <div>
                <label style={labelStyle}>Property Image URL (Unsplash or Direct Web Link)</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/photo-..." style={inputStyle} />
                <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>Leave empty to automatically assign a beautiful mountain mockup image.</span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                background: "#006ce4", 
                color: "#fff", 
                border: "none", 
                padding: "16px", 
                borderRadius: "8px", 
                fontSize: "16px", 
                fontWeight: "700", 
                cursor: "pointer", 
                marginTop: "10px",
                boxShadow: "0 4px 14px rgba(0,108,228,0.3)",
                transition: "background 0.1s"
              }}
            >
              {loading ? "Registering Property Securely..." : "⚡ Complete Free Listing"}
            </button>

          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 550px) {
          .form-grid { gridTemplateColumns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// 🧰 INLINE STYLE COMPONENTS FOR CLEAN FORMS
const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#0f172a",
  borderBottom: "2px solid #f1f5f9",
  paddingBottom: "8px",
  marginBottom: "15px",
  marginTop: "10px"
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#334155",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  color: "#0f172a",
  outline: "none",
  background: "#fdfdfd",
  box some: "inset 0 1px 2px rgba(0,0,0,0.02)"
};