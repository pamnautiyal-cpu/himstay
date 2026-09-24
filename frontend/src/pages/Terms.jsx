import React, { useState } from "react";

export default function Terms() {
  const [lang, setLang] = useState("en"); // 'en' for English, 'hi' for Hindi

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0f172a", color: "#f8fafc", minHeight: "100vh", padding: "40px 20px 80px 20px", boxSizing: "border-box" }}>
      
      {/* Container */}
      <div style={{ maxWidth: "900px", margin: "0 auto", background: "#1e293b", borderRadius: "20px", border: "1px solid #334155", padding: "40px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)" }}>
        
        {/* Header & Language Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: "20px", marginBottom: "30px", flexWrap: "wrap", gap: "15px" }}>
          <div>
            <span style={{ background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
              {lang === "en" ? "Legal Information" : "कानूनी जानकारी"}
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#fff", margin: "8px 0 0 0" }}>
              {lang === "en" ? "Terms and Conditions" : "नियम और शर्तें"}
            </h1>
          </div>

          {/* Toggle Buttons */}
          <div style={{ display: "flex", background: "#0f172a", padding: "4px", borderRadius: "10px", border: "1px solid #475569" }}>
            <button 
              onClick={() => setLang("en")}
              style={{
                background: lang === "en" ? "#0284c7" : "transparent",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              English
            </button>
            <button 
              onClick={() => setLang("hi")}
              style={{
                background: lang === "hi" ? "#0284c7" : "transparent",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ fontSize: "14px", lineHeight: "1.7", color: "#cbd5e1" }}>
          
          {lang === "en" ? (
            <>
              <p style={{ marginBottom: "20px", color: "#94a3b8" }}>
                Welcome to <strong>The Himalayans</strong>. By using our platform and services, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>1. Property Information & Accuracy</h3>
                <p style={textStyle}>
                  You confirm that all information provided by you (such as property name, exact location, photos, pricing, and amenities) is accurate, truthful, and up-to-date. You are solely responsible for any incorrect or misleading details listed on the platform.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>2. Photos and Media Content</h3>
                <p style={textStyle}>
                  All photos and media uploaded by you must be legally authorized and owned by you or your property. The use of copyrighted or unauthorized watermarked images from other sources is strictly prohibited.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>3. Service Fees & Payments</h3>
                <p style={textStyle}>
                  All hotel bookings, retreat reservations, and property listing transactions processed through our gateway are secure. In case of any financial disputes or cancellations, the final management decision will be binding.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>4. Safety, Compliance & Moderation</h3>
                <p style={textStyle}>
                  We reserve the right to suspend, moderate, or remove any unauthorized, fraudulent, or non-compliant property listing immediately without prior notice to ensure user safety and trust.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>5. Booking & Cancellation Policy</h3>
                <p style={textStyle}>
                  All bookings are subject to confirmation. Cancellation charges, refund timelines, and property-specific rules will apply as mentioned at the time of reservation.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>6. Limitation of Liability</h3>
                <p style={textStyle}>
                  The Himalayans acts only as a facilitator between travelers and property owners/service providers. We are not liable for any personal injury, loss, or accidents occurring during your stay, trek, or tour.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>7. Force Majeure</h3>
                <p style={textStyle}>
                  We are not responsible for delays or service failures caused by natural disasters, severe weather, landslides, government restrictions, or any other events beyond our control.
                </p>
              </div>
            </>
          ) : (
            <>
              <p style={{ marginBottom: "20px", color: "#94a3b8" }}>
                <strong>The Himalayans</strong> में आपका स्वागत है। हमारी वेबसाइट और सेवाओं का उपयोग करके, आप निम्नलिखित नियमों और शर्तों से सहमत होते हैं।
              </p>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>1. प्रॉपर्टी की जानकारी और सत्यता (Property Information)</h3>
                <p style={textStyle}>
                  आप यह पुष्टि करते हैं कि आपके द्वारा दी गई सभी जानकारी (जैसे नाम, सटीक पता, फोटो, कीमत और सुविधाएं) सही और सटीक है। किसी भी गलत या भ्रामक जानकारी के लिए आप स्वयं जिम्मेदार होंगे।
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>2. फोटो और मीडिया सामग्री (Photos and Media)</h3>
                <p style={textStyle}>
                  आप जो भी फोटो या मीडिया अपलोड करते हैं, वे आपके द्वारा अधिकृत (authorized) होने चाहिए। किसी भी कॉपीराइट वाली या दूसरी जगह से ली गई फोटो का उपयोग करना सख्त मना है।
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>3. सेवा शुल्क और भुगतान (Service Fees & Payments)</h3>
                <p style={textStyle}>
                  होटल बुकिंग या प्रॉपर्टी लिस्टिंग से संबंधित सभी भुगतान सुरक्षित हैं। किसी भी विवाद या कैंसिलेशन की स्थिति में, मैनेजमेंट का निर्णय अंतिम होगा।
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>4. सुरक्षा और नियम अनुपालन (Safety & Compliance)</h3>
                <p style={textStyle}>
                  यात्रियों की सुरक्षा और भरोसे को बनाए रखने के लिए, हम किसी भी अनधिकृत, फर्जी या अवैध प्रॉपर्टी लिस्टिंग को बिना किसी पूर्व सूचना के हटाने या सस्पेंड करने का अधिकार रखते हैं।
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>5. बुकिंग और कैंसिलेशन पॉलिसी (Booking & Cancellation)</h3>
                <p style={textStyle}>
                  सभी बुकिंग्स कन्फर्मेशन के अधीन हैं। बुकिंग के समय बताए गए नियमों के अनुसार कैंसिलेशन चार्ज और रिफंड का समय लागू होगा।
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>6. देयता की सीमा (Limitation of Liability)</h3>
                <p style={textStyle}>
                  The Himalayans केवल एक माध्यम के रूप में कार्य करता है। आपके ठहरने (stay), ट्रेक या टूर के दौरान होने वाली किसी भी दुर्घटना, चोट या नुकसान के लिए हम जिम्मेदार नहीं हैं।
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>7. प्राकृतिक आपदा और अन्य कारण (Force Majeure)</h3>
                <p style={textStyle}>
                  प्राकृतिक आपदाओं, खराब मौसम, भूस्खलन (landslides), सरकारी प्रतिबंधों या हमारे नियंत्रण से बाहर के किसी भी कारण से होने वाली असुविधा के लिए हम उत्तरदायी नहीं हैं।
                </p>
              </div>
            </>
          )}

          {/* Footer Update Timestamp */}
          <div style={{ marginTop: "40px", borderTop: "1px solid #334155", paddingTop: "20px", fontSize: "12px", color: "#64748b", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <span>{lang === "en" ? "Last Updated: June 13, 2026" : "अंतिम अपडेट: 13 जून, 2026"}</span>
            <span>The Himalayans Security & Legal Team</span>
          </div>

        </div>

      </div>
    </div>
  );
}

const sectionStyle = {
  background: "#0f172a",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #334155",
  marginBottom: "16px"
};

const headingStyle = {
  fontSize: "16px",
  fontWeight: "800",
  color: "#38bdf8",
  margin: "0 0 8px 0"
};

const textStyle = {
  margin: 0,
  color: "#cbd5e1",
  fontSize: "13px",
  lineHeight: "1.6"
};