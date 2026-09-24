import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CharDhamAgents() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setSubmitted(true);
      alert("Verification code / Login link sent to your WhatsApp/Phone!");
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#111827" }}>
      
      {/* Top Split Section (ORN Style: Dark Left Hero / Light Right Form) */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "1.2fr 1fr", 
        minHeight: "520px", 
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
            चारधाम यात्रा स्पेशल पार्टनर प्रोग्राम
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: "800", lineHeight: "1.2", margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>
            उत्तरकाशी रूट पर ट्रैवल एजेंट्स और ड्राइवर्स के लिए होटल बुकिंग।
          </h1>
          <p style={{ fontSize: "15px", color: "#94a3b8", margin: "0 0 30px 0", lineHeight: "1.6" }}>
            गंगोत्री और यमुनोत्री धाम रूट पर ग्रुप स्टे, ड्राइवर एकोमोडेशन और कन्फर्म रूम्स के लिए सीधे हमारे साथ जुड़ें।
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "✔️ बड़कोट, यमुनोत्री रूट, उत्तरकाशी शहर और गंगोत्री रूट पर कन्फर्म रूम्स",
              "✔️ ट्रैवल ग्रुप्स के लिए विशेष रियायत और ड्राइवर्स के लिए खास व्यवस्था",
              "✔️ एजेंट्स सीधे फोन या व्हाट्सएप के जरिए तुरंत बुकिंग कन्फर्म कर सकते हैं"
            ].map((text, idx) => (
              <div key={idx} style={{ fontSize: "13.5px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "8px" }}>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Light Form Box (ORN Login Style) */}
        <div style={{ 
          background: "#ffffff", 
          padding: "60px 50px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          color: "#1f2937"
        }}>
          <div style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "750", margin: "0 0 8px 0", color: "#0f172a" }}>
              Welcome back
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px 0" }}>
              Sign in with your agent partner credentials or phone number.
            </p>

            <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#374151" }}>
                  Mobile Number / WhatsApp
                </label>
                <input 
                  type="tel" 
                  placeholder="Enter 10-digit mobile number" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "12px 14px", 
                    borderRadius: "8px", 
                    border: "1px solid #cbd5e1", 
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                  required
                />
              </div>

              <button type="submit" style={{ 
                background: "#ef4444", 
                color: "#ffffff", 
                border: "none", 
                padding: "13px", 
                borderRadius: "8px", 
                fontWeight: "700", 
                fontSize: "15px", 
                cursor: "pointer",
                transition: "background 0.2s"
              }}>
                Continue with WhatsApp / OTP
              </button>
            </form>

            <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "16px", lineHeight: "1.5" }}>
              By continuing, you agree to our terms of service and acknowledge our privacy policy.
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

            {/* Right Feature Card with Image/Graphic Mockup */}
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
              बुकिंग या इन्वेंट्री की जानकारी के लिए सीधे संपर्क करें
            </h3>
            <p style={{ fontSize: "14px", color: "#cbd5e1", margin: "0 0 24px 0" }}>
              फोन उठाइए या व्हाट्सएप पर अपनी डेट्स और ग्रुप साइज भेजिए। आपको तुरंत रेट्स और उपलब्धता मिल जाएगी।
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
              <a 
                href="https://wa.me/91YOUR_PHONE_NUMBER?text=Hello,%20I%20am%20a%20travel%20agent%20looking%20for%20Char%20Dham%20room%2520bookings." 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  background: "#22c55e", 
                  color: "#ffffff", 
                  padding: "12px 24px", 
                  borderRadius: "8px", 
                  textDecoration: "none", 
                  fontWeight: "700", 
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                🟢 व्हाट्सएप पर बात करें
              </a>
              <a 
                href="tel:+919410106470" 
                style={{ 
                  background: "#ef4444", 
                  color: "#ffffff", 
                  padding: "12px 24px", 
                  borderRadius: "8px", 
                  textDecoration: "none", 
                  fontWeight: "700", 
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                📞 डायरेक्ट कॉल करें
              </a>
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