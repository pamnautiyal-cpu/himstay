import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function ListProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Current Step Tracker (1 to 6)
  const [currentStep, setCurrentStep] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(1);
  const [ownerInfo, setOwnerInfo] = useState({ email: "", name: "" });

  // 1. LOGIN CHECK & OWNER SESSION
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Please login first with your correct email and password to list a property!");
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(userStr);
        setOwnerInfo({
          email: parsedUser.email || "",
          name: parsedUser.name || "Partner"
        });
      } catch (e) {
        console.error("User session parse error", e);
      }
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    listingCategory: "hotel",
    name: "",
    propertyType: "Hotel",
    city: "Uttarkashi",
    locality: "",
    pincode: "",
    state: "Uttarakhand",
    country: "India",
    price: "",
    maxGuests: "",
    roomDetails: "2 Bedroom Set",
    roomType: "Standard",
    roomView: "Himalayan View",
    roomSize: "",
    sizeUnit: "Square Feet",
    numberOfRooms: "1",
    phone: "",
    description: "",
    duration: "",
    difficulty: "Easy",
    batchDates: "",
    wifi: "No",
    parking: "No",
    ac: "No",
    powerBackup: "No",
    roomService: "No",
    restaurant: "No",
    spa: "No",
    caretaker: "No",
    cctv: "No"
  });
  
  const [files, setFiles] = useState([]); 
  const [agreedTerms, setAgreedTerms] = useState(false);

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

  // STEP VALIDATION BEFORE GOING NEXT
  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        alert("Please enter a valid Property Name.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.locality.trim() || !formData.pincode.trim()) {
        alert("Please fill in both Locality and Pincode.");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.price || Number(formData.price) <= 0) {
        alert("Please enter a valid price.");
        return;
      }
      if (!formData.phone || formData.phone.length < 10) {
        alert("Please enter a valid 10-digit contact phone number.");
        return;
      }
    }
    
    const next = currentStep + 1;
    setCurrentStep(next);
    if (next > highestStepVisited) {
      setHighestStepVisited(next);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (stepNumber) => {
    // Allow jumping to any step that has already been visited or is prior
    if (stepNumber <= highestStepVisited || stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ownerInfo.email) {
      alert("Invalid session email. Please logout and login again with correct credentials.");
      navigate("/login");
      return;
    }

    if (files.length === 0) {
      alert("Please upload at least one property image.");
      return;
    }

    if (!agreedTerms) {
      alert("You must agree to the terms and conditions before submitting.");
      return;
    }
    
    setLoading(true);
    const data = new FormData();
    for (let key in formData) { data.append(key, formData[key]); }
    files.forEach((file) => { data.append("images", file); });
    data.append("ownerEmail", ownerInfo.email);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/add`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      try {
        await emailjs.send(
          "service_lvjl1yl", 
          "template_17qwwpa", 
          {
            name: ownerInfo.name,
            title: formData.name, 
            message: `Owner Email: ${ownerInfo.email}, Category: ${formData.listingCategory.toUpperCase()}, Location: ${formData.locality}, ${formData.city}, Price: ${formData.price}, Phone: ${formData.phone}`,
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
      alert("Upload failed. Check console or verify your network.");
    }
  };

  return (
    <div style={{ maxWidth: "850px", margin: "30px auto", padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
      
      {/* 🌟 VERIFIED PARTNER INFO BAR */}
      <div style={{ background: "#f8fafc", padding: "10px 15px", borderRadius: "6px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e2e8f0", fontSize: "13px", color: "#475569" }}>
        <span>Verified Partner Session: <strong>{ownerInfo.email || "Checking..."}</strong></span>
        <span style={{ color: "#16a34a", fontWeight: "600" }}>● Secure Listing Mode</span>
      </div>

      {/* 🌟 STEPPER HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px", overflowX: "auto", gap: "10px" }}>
        {[
          { step: 1, label: "Basic Info" },
          { step: 2, label: "Location" },
          { step: 3, label: "Room Details" },
          { step: 4, label: "Amenities" },
          { step: 5, label: "Description" },
          { step: 6, label: "Photos" }
        ].map((item) => {
          const isClickable = item.step <= highestStepVisited;
          return (
            <div 
              key={item.step} 
              onClick={() => isClickable && goToStep(item.step)} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "6px", 
                color: currentStep === item.step ? "#0284c7" : isClickable ? "#334155" : "#94a3b8", 
                fontWeight: "600", 
                fontSize: "12px", 
                cursor: isClickable ? "pointer" : "not-allowed" 
              }}
            >
              <span style={stepCircleStyle(currentStep === item.step, isClickable)}>{item.step}</span> {item.label}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* --- STEP 1: BASIC INFO --- */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ marginBottom: "15px", color: "#1e293b" }}>Property Basic Information</h3>
            
            <label style={{ fontSize: "14px", fontWeight: "700", color: "#166534", display: "block", marginBottom: "6px" }}>
              What would you like to list? *
            </label>
            <select 
              name="listingCategory"
              value={formData.listingCategory} 
              onChange={handleChange} 
              style={{ ...inputStyle, marginBottom: "15px", fontWeight: "600", background: "#f0fdf4", borderColor: "#4ade80" }}
            >
              <option value="hotel">🏨 Hotel / Homestay Listing</option>
              <option value="yoga">🧘 Yoga & Wellness Retreat</option>
              <option value="trek">⛺ Trekking & Camping Experience</option>
            </select>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Property Name *</label>
                <input name="name" value={formData.name} placeholder="e.g. Himalayan Heights" required onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Sub-Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} style={inputStyle}>
                  <option value="Hotel">Hotel</option>
                  <option value="Homestay">Homestay & Villa</option>
                  <option value="Resort">Resort</option>
                  <option value="Guest House">Guest House / Lodge</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <button type="button" onClick={nextStep} style={primaryBtnStyle}>Save & Continue</button>
            </div>
          </div>
        )}

        {/* --- STEP 2: LOCATION --- */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ marginBottom: "15px", color: "#1e293b" }}>Property Location Details</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Locality / Area / Sector *</label>
                <input name="locality" value={formData.locality} placeholder="e.g. Kansen" required onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>City *</label>
                <select name="city" value={formData.city} onChange={handleChange} style={inputStyle}>
                  <option value="Uttarkashi">Uttarkashi</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Mussoorie">Mussoorie</option>
                  <option value="Dehradun">Dehradun</option>
                  <option value="Chakrata">Chakrata</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Pincode *</label>
                <input name="pincode" type="number" value={formData.pincode} placeholder="e.g. 249193" required onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>State</label>
                <input name="state" value={formData.state} readOnly style={{ ...inputStyle, background: "#f8fafc" }} />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Country</label>
                <input name="country" value={formData.country} readOnly style={{ ...inputStyle, background: "#f8fafc" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button type="button" onClick={prevStep} style={secondaryBtnStyle}>Back</button>
              <button type="button" onClick={nextStep} style={primaryBtnStyle}>Save & Continue</button>
            </div>
          </div>
        )}

        {/* --- STEP 3: ROOM DETAILS & PRICING --- */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ marginBottom: "15px", color: "#1e293b" }}>Room Details & Pricing</h3>

            {formData.listingCategory === "hotel" ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Room Type *</label>
                    <select name="roomType" value={formData.roomType} onChange={handleChange} style={inputStyle}>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Super Deluxe">Super Deluxe</option>
                      <option value="Suite">Suite</option>
                      <option value="Cottage">Cottage / Villa</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Room View *</label>
                    <select name="roomView" value={formData.roomView} onChange={handleChange} style={inputStyle}>
                      <option value="Himalayan View">Himalayan View</option>
                      <option value="River View">River View</option>
                      <option value="Garden View">Garden View</option>
                      <option value="City View">City View</option>
                      <option value="Forest View">Forest View</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Room Size & Unit</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input name="roomSize" type="number" value={formData.roomSize} placeholder="e.g. 250" onChange={handleChange} style={{ ...inputStyle, flex: 2 }} />
                      <select name="sizeUnit" value={formData.sizeUnit} onChange={handleChange} style={{ ...inputStyle, flex: 1, fontSize: "12px" }}>
                        <option value="Square Feet">Sq. Ft.</option>
                        <option value="Square Meter">Sq. Meter</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Bedroom Set Configuration *</label>
                    <select name="roomDetails" value={formData.roomDetails} onChange={handleChange} style={inputStyle}>
                      <option value="1 Bedroom Set">1 Bedroom Set</option>
                      <option value="2 Bedroom Set">2 Bedroom Set</option>
                      <option value="3 Bedroom Set">3 Bedroom Set</option>
                      <option value="4 Bedroom Set">4 Bedroom Set</option>
                      <option value="Deluxe Room / Suite">Deluxe Room / Suite</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Number of Rooms *</label>
                    <input name="numberOfRooms" type="number" value={formData.numberOfRooms} placeholder="1" required onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Max Guests *</label>
                    <input name="maxGuests" type="number" value={formData.maxGuests} placeholder="e.g. 4" required onChange={handleChange} style={inputStyle} />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Duration *</label>
                  <input name="duration" value={formData.duration} placeholder="e.g. 3 Days / 4 Nights" required onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                    {formData.listingCategory === "yoga" ? "Batch Date" : "Difficulty Level"}
                  </label>
                  {formData.listingCategory === "yoga" ? (
                    <input name="batchDates" value={formData.batchDates} placeholder="e.g. 15 Aug 2026" onChange={handleChange} style={inputStyle} />
                  ) : (
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} style={inputStyle}>
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Difficult">Difficult</option>
                    </select>
                  )}
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  {formData.listingCategory === "hotel" ? "Price / Night (₹) *" : "Price per Person (₹) *"}
                </label>
                <input name="price" type="number" value={formData.price} placeholder="e.g. 2500" required onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Contact Phone Number *</label>
                <input name="phone" value={formData.phone} placeholder="e.g. 9876543210" required onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button type="button" onClick={prevStep} style={secondaryBtnStyle}>Back</button>
              <button type="button" onClick={nextStep} style={primaryBtnStyle}>Save & Continue</button>
            </div>
          </div>
        )}

        {/* --- STEP 4: AMENITIES --- */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ marginBottom: "15px", color: "#1e293b" }}>Property Amenities</h3>
            <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>Please answer the mandatory amenities available at your property.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {[
                { label: "Wifi / Internet", name: "wifi" },
                { label: "Parking Space", name: "parking" },
                { label: "Air Conditioning", name: "ac" },
                { label: "Power Backup", name: "powerBackup" },
                { label: "Room Service", name: "roomService" },
                { label: "Restaurant / Dining", name: "restaurant" },
                { label: "Spa / Wellness", name: "spa" },
                { label: "Caretaker", name: "caretaker" },
                { label: "CCTV Security", name: "cctv" },
              ].map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>{item.label}</span>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <label style={{ fontSize: "14px", cursor: "pointer" }}>
                      <input 
                        type="radio" 
                        name={item.name} 
                        value="No" 
                        checked={formData[item.name] === "No"} 
                        onChange={handleChange} 
                        style={{ marginRight: "4px" }}
                      /> No
                    </label>
                    <label style={{ fontSize: "14px", cursor: "pointer" }}>
                      <input 
                        type="radio" 
                        name={item.name} 
                        value="Yes" 
                        checked={formData[item.name] === "Yes"} 
                        onChange={handleChange} 
                        style={{ marginRight: "4px" }}
                      /> Yes
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button type="button" onClick={prevStep} style={secondaryBtnStyle}>Back</button>
              <button type="button" onClick={nextStep} style={primaryBtnStyle}>Save & Continue</button>
            </div>
          </div>
        )}

        {/* --- STEP 5: DESCRIPTION --- */}
        {currentStep === 5 && (
          <div>
            <h3 style={{ marginBottom: "15px", color: "#1e293b" }}>Description & House Rules</h3>

            <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>Full Description *</label>
            <textarea 
              name="description" 
              value={formData.description}
              placeholder="Describe view, surroundings, check-in instructions..." 
              required
              onChange={handleChange} 
              style={{ ...inputStyle, height: "120px", marginBottom: "15px" }}
            ></textarea>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button type="button" onClick={prevStep} style={secondaryBtnStyle}>Back</button>
              <button type="button" onClick={nextStep} style={primaryBtnStyle}>Save & Continue</button>
            </div>
          </div>
        )}

        {/* --- STEP 6: PHOTOS & SUBMISSION --- */}
        {currentStep === 6 && (
          <div>
            <h3 style={{ marginBottom: "15px", color: "#1e293b" }}>Photos & Final Submission</h3>

            <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>Upload Property Images *</label>
            <input type="file" multiple onChange={handleFileChange} style={{ ...inputStyle, marginBottom: "15px" }} />
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {files.map((file, index) => (
                <div key={index} style={{ padding: "6px 12px", background: "#f1f5f9", borderRadius: "15px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", border: "1px solid #cbd5e1" }}>
                  {file.name.substring(0, 15)}... <span onClick={() => removeFile(index)} style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}>x</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "13px", color: "#475569", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <input 
                type="checkbox" 
                checked={agreedTerms} 
                onChange={(e) => setAgreedTerms(e.target.checked)} 
                required 
                style={{ width: "16px", height: "16px", cursor: "pointer" }} 
              />
              <span>I agree to the terms and conditions and confirm the details provided are accurate.</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button type="button" onClick={prevStep} style={secondaryBtnStyle}>Back</button>
              <button type="submit" style={{ ...primaryBtnStyle, background: "#16a34a", opacity: (files.length === 0 || !agreedTerms) ? 0.6 : 1 }} disabled={loading}>
                {loading ? "Publishing Listing..." : "Submit Listing"}
              </button>
            </div>
          </div>
        )}

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
              Your offering has been submitted for admin review.
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

const stepCircleStyle = (isActive, isClickable) => ({
  width: "24px", height: "24px", borderRadius: "50%",
  background: isActive ? "#0284c7" : isClickable ? "#cbd5e1" : "#e2e8f0", 
  color: isClickable ? "#fff" : "#94a3b8",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: "11px", fontWeight: "bold"
});

const inputStyle = { width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" };
const primaryBtnStyle = { background: "#006ce4", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "15px", fontWeight: "600" };
const secondaryBtnStyle = { background: "#e2e8f0", color: "#334155", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "15px", fontWeight: "600" };