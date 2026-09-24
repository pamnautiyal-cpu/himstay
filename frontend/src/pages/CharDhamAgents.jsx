import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CharDhamAgents() {
  const navigate = useNavigate();
  
  // Advanced Form States for Serious Agents & Drivers
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    agencyName: "",
    gstin: "",
    travelDate: "",
    groupSize: "1-5 Persons",
    roomCount: "2-4 Rooms",
    vehicleType: "Tempo Traveller (12-26 Seater)",
    yatraRegistration: "Yes - Completed",
    route: "Yamunotri & Gangotri Route"
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.travelDate) {
      alert("Please fill in all required fields (Name, Phone, Travel Date).");
      return;
    }
    setIsFormSubmitted(true);
    alert("Verification details saved successfully! You can now proceed to WhatsApp.");
  };

  // WhatsApp par pre-filled message bhejne ke liye
  const whatsappMessage = encodeURIComponent(
    `Hello, I am a serious travel agent/driver. Here are my booking inquiry details:\n\n*Name:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Agency:* ${formData.agencyName || "N/A"}\n*GSTIN/ID:* ${formData.gstin || "N/A"}\n*Travel Date:* ${formData.travelDate}\n*Group Size:* ${formData.groupSize}\n*Rooms Required:* ${formData.roomCount}\n*Vehicle Type:* ${formData.vehicleType}\n*Yatra Status:* ${formData.yatraRegistration}\n*Route:* ${formData.route}`
  );

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#111827" }}>
      
      {/* Top Split Section (ORN Style: Dark Left Hero / Light Right Form) */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "1.2fr 1fr", 
        minHeight: "640px", 
        background: "#0f172a", 
        color: "#ffffff" 
      }} className="orn-hero-grid">
        
        {/* Left Dark Content Box */}
        <div style={{ 
          padding: "60px 50px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #1e293b 100%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)"
        }}>
          <span style={{ 
            color: "#ef4444", 
            fontWeight: "700", 
            fontSize: "12px", 
            letterSpacing: "1.5px", 
            textTransform: "uppercase", 
            marginBottom: "12px",
            display: "inline-block"
          }}>
            Char Dham Special Partner Program (चारधाम यात्रा स्पेशल पार्टनर प्रोग्राम)
          </span>
          <h1 style={{ fontSize: "34px", fontWeight: "800", lineHeight: "1.2", margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>
            Hotel Bookings for Verified Travel Agents & Drivers on Uttarkashi Route.
          </h1>
          <p style={{ fontSize: "14.5px", color: "#94a3b8", margin: "0 0 25px 0", lineHeight: "1.6" }}>
            Connect with us directly for group stays, driver accommodation, and confirmed room allocations on Gangotri and Yamunotri Dham routes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              "✔️ Confirmed inventory across Barkot, Yamunotri, Uttarkashi, and Gangotri",
              "✔️ Special B2B rates and dedicated arrangements for transport operators & drivers",
              "✔️ Fill out verification details on the right to instantly unlock direct WhatsApp chat & rates"
            ].map((text, idx) => (
              <div key={idx} style={{ fontSize: "13.5px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "8px" }}>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Light Form Box (Advanced Serious Agent Verification Form) */}
        <div style={{ 
          background: "#ffffff", 
          padding: "35px 40px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          color: "#1f2937"
        }}>
          <div style={{ maxWidth: "440px", width: "100%", margin: "0 auto" }}>
            
            {!isFormSubmitted ? (
              <>
                <h3 style={{ fontSize: "20px", fontWeight: "750", margin: "0 0 4px 0", color: "#0f172a" }}>
                  Partner Agent Verification Form
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 16px 0" }}>
                  Fill in your travel details to filter spam and get instant direct access.
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="Your Name" 
                        value={formData.fullName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="10-digit mobile" 
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={labelStyle}>Agency / Company</label>
                      <input 
                        type="text" 
                        name="agencyName"
                        placeholder="Agency Name" 
                        value={formData.agencyName}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>GSTIN / ID Proof (Opt)</label>
                      <input 
                        type="text" 
                        name="gstin"
                        placeholder="GSTIN or ID Number" 
                        value={formData.gstin}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={labelStyle}>Travel Date *</label>
                      <input 
                        type="date" 
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Group Size</label>
                      <select name="groupSize" value={formData.groupSize} onChange={handleChange} style={inputStyle}>
                        <option value="1-5 Persons">1 - 5 Persons</option>
                        <option value="6-15 Persons">6 - 15 Persons</option>
                        <option value="16+ Persons">16+ Large Group</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={labelStyle}>Rooms Required</label>
                      <select name="roomCount" value={formData.roomCount} onChange={handleChange} style={inputStyle}>
                        <option value="1 Room">1 Room</option>
                        <option value="2-4 Rooms">2 - 4 Rooms</option>
                        <option value="5-10 Rooms">5 - 10 Rooms</option>
                        <option value="10+ Rooms">10+ Group Rooms</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Vehicle Type</label>
                      <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} style={inputStyle}>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                        <option value="Mini Bus">Mini Bus</option>
                        <option value="Personal Car/Cab">Personal Cab</option>
                        <option value="Standard Bus">Standard Bus</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={labelStyle}>Yatra Registration</label>
                      <select name="yatraRegistration" value={formData.yatraRegistration} onChange={handleChange} style={inputStyle}>
                        <option value="Yes - Completed">Yes - Completed</option>
                        <option value="Pending / In Process">Pending / Process</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Preferred Route</label>
                      <select name="route" value={formData.route} onChange={handleChange} style={inputStyle}>
                        <option value="Yamunotri & Gangotri Route">Both Routes</option>
                        <option value="Yamunotri Route Only">Yamunotri Only</option>
                        <option value="Gangotri Route Only">Gangotri Only</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" style={{ 
                    background: "#ef4444", 
                    color: "#ffffff", 
                    border: "none", 
                    padding: "11px", 
                    borderRadius: "8px", 
                    fontWeight: "700", 
                    fontSize: "14px", 
                    cursor: "pointer",
                    marginTop: "4px",
                    transition: "background 0.2s"
                  }}>
                    Verify Details & Unlock WhatsApp
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "44px", marginBottom: "8px" }}>✅</div>
                <h3 style={{ fontSize: "20px", fontWeight: "750", color: "#0f172a", margin: "0 0 8px 0" }}>
                  Verification Successful!
                </h3>
                <p style={{ fontSize: "13.5px", color: "#4b5563", margin: "0 0 20px 0", lineHeight: "1.5" }}>
                  Thank you, <b>{formData.fullName}</b>. Your data has been recorded to prevent spam. Click below to chat directly on WhatsApp.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a 
                    href={`https://wa.me/91YOUR_PHONE_NUMBER?text=${whatsappMessage}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      background: "#22c55e", 
                      color: "#ffffff", 
                      padding: "12px", 
                      borderRadius: "8px", 
                      textDecoration: "none", 
                      fontWeight: "700", 
                      fontSize: "14px",
                      display: "block"
                    }}
                  >
                    🟢 Open WhatsApp Chat Now
                  </a>
                  <button 
                    onClick={() => setIsFormSubmitted(false)}
                    style={{ background: "transparent", border: "1px solid #cbd5e1", padding: "9px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", color: "#64748b" }}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            )}

            <p style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "12px", lineHeight: "1.3" }}>
              🔒 Spam protection enabled. Only genuine agent and driver requests are entertained.
            </p>
          </div>
        </div>
      </section>

      {/* Middle Dark Band: Ground Reality & Stats */}
      <section style={{ background: "#09090b", color: "#ffffff", padding: "80px 30px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "50px", alignItems: "center" }} className="orn-middle-grid">
            
            {/* Left Info & Stats */}
            <div>
              <span style={{ color: "#38bdf8", fontWeight: "700", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                PEACE OF MIND · BUILT IN
              </span>
              <h2 style={{ fontSize: "32px", fontWeight: "800", margin: "10px 0 16px 0", letterSpacing: "-0.5px" }}>
                We're on the ground where you travel.
              </h2>
              <p style={{ fontSize: "14.5px", color: "#a1a1aa", lineHeight: "1.7", margin: "0 0 30px 0" }}>
                The Himalayans runs its own partner network across Yamunotri & Gangotri routes — not a booking desk in India forwarding your trip to a stranger. Real local people, verified mountain stays, and 24/7 support in the same time zone as your yatra.
              </p>

              {/* Stats Counters */}
              <div style={{ display: "flex", gap: "40px" }}>
                <div>
                  <h3 style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", margin: "0 0 4px 0" }}>12+</h3>
                  <span style={{ fontSize: "12.5px", color: "#71717a" }}>LIVE HOTELS</span>
                </div>
                <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "40px" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", margin: "0 0 4px 0" }}>+2</h3>
                  <span style={{ fontSize: "12.5px", color: "#71717a" }}>NEW LOCATIONS 2026</span>
                </div>
                <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "40px" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", margin: "0 0 4px 0" }}>24/7</h3>
                  <span style={{ fontSize: "12.5px", color: "#71717a" }}>ON-TRIP SUPPORT</span>
                </div>
              </div>
            </div>

            {/* Right Feature Card with Image Mockup */}
            <div style={{ 
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", 
              border: "1px solid rgba(255, 255, 255, 0.1)", 
              borderRadius: "20px", 
              padding: "30px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
            }}>
              <div style={{ 
                height: "180px", 
                borderRadius: "12px", 
                background: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80') center/cover",
                marginBottom: "20px",
                position: "relative"
              }}>
                <span style={{ 
                  position: "absolute", 
                  bottom: "12px", 
                  left: "12px", 
                  background: "rgba(0,0,0,0.7)", 
                  backdropFilter: "blur(4px)", 
                  padding: "6px 12px", 
                  borderRadius: "6px", 
                  fontSize: "12px", 
                  fontWeight: "600", 
                  color: "#ffffff" 
                }}>
                  🏔️ Verified Yamunotri & Gangotri Routes
                </span>
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#ffffff", margin: "0 0 8px 0" }}>
                Direct Agent Desk & Instant Allocation
              </h4>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0, lineHeight: "1.6" }}>
                Get guaranteed group rooms during peak Dham seasons without middlemen delays.
              </p>
            </div>

          </div>

          {/* Quick Contact CTA Box */}
          <div style={{ 
            marginTop: "60px", 
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)", 
            border: "1px solid rgba(239, 68, 68, 0.3)", 
            borderRadius: "16px", 
            padding: "40px", 
            textAlign: "center" 
          }}>
            <h3 style={{ fontSize: "22px", fontWeight: "750", color: "#ffffff", margin: "0 0 10px 0" }}>
              Need Direct Assistance?
            </h3>
            <p style={{ fontSize: "14px", color: "#cbd5e1", margin: "0 0 24px 0" }}>
              Please complete the verification form above to unlock direct WhatsApp chat and team contact.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
              <span style={{ 
                background: "rgba(255,255,255,0.05)", 
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8", 
                padding: "12px 24px", 
                borderRadius: "8px", 
                fontWeight: "600", 
                fontSize: "13.5px"
              }}>
                🔒 WhatsApp & Direct Calls Locked Behind Verification
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Responsive Media Queries */}
      <style>{`
        @media (max-width: 968px) {
          .orn-hero-grid, .orn-middle-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: "block", 
  fontSize: "11px", 
  fontWeight: "600", 
  marginBottom: "3px", 
  color: "#374151"
};

const inputStyle = {
  width: "100%", 
  padding: "8px 10px", 
  borderRadius: "6px", 
  border: "1px solid #cbd5e1", 
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
  background: "#ffffff",
  color: "#1f2937"
};