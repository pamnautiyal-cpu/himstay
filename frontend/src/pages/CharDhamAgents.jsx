import React from 'react';
import { Link } from 'react-router-dom';

export default function CharDhamAgents() {
  return (
    <div style={{ background: "#09090b", color: "#d4d4d8", padding: "60px 20px", minHeight: "80vh", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Heading Section */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "700" }}>
            चारधाम यात्रा स्पेशल पार्टनर प्रोग्राम
          </span>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", margin: "15px 0 10px 0" }}>
            उत्तरकाशी रूट पर ट्रेवल एजेंट्स और ड्राइवर्स के लिए होटल बुकिंग
          </h1>
          <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
            गंगोत्री और यमुनोत्री धाम रूट पर ग्रुप स्टे, ड्राइवर एकोमोडेशन और कन्फर्म रूम्स के लिए सीधे हमारे साथ जुड़ें।
          </p>
        </div>

        {/* Key Benefits Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginBottom: "50px" }}>
          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "25px", borderRadius: "12px" }}>
            <h3 style={{ color: "#38bdf8", fontSize: "18px", marginBottom: "10px" }}>📍 उत्तरकाशी डिस्ट्रिक्ट कवरेज</h3>
            <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: "1.5" }}>बड़कोट, यमुनोत्री रूट, उत्तरकाशी शहर, हर्षिल और गंगोत्री रूट पर हमारे पास होटल्स और रूम्स की बढ़िया इन्वेंट्री उपलब्ध है।</p>
          </div>
          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "25px", borderRadius: "12px" }}>
            <h3 style={{ color: "#38bdf8", fontSize: "18px", marginBottom: "10px" }}>🚌 ड्राइवर और ग्रुप फैसिलिटी</h3>
            <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: "1.5" }}>ट्रेवल ग्रुप्स के लिए विशेष रियायत और ड्राइवर्स के ठहरने व खाने की खास व्यवस्था।</p>
          </div>
          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "25px", borderRadius: "12px" }}>
            <h3 style={{ color: "#38bdf8", fontSize: "18px", marginBottom: "10px" }}>⚡ त्वरित पुष्टि (Fast Confirmation)</h3>
            <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: "1.5" }}>एजेंट्स सीधे फोन या व्हाट्सएप के जरिए तुरंत रूम की उपलब्धता और बुकिंग कन्फर्म कर सकते हैं।</p>
          </div>
        </div>

        {/* Call to Action Box */}
        <div style={{ background: "linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%)", border: "1px solid rgba(14, 165, 233, 0.3)", padding: "40px", borderRadius: "16px", textAlign: "center" }}>
          <h2 style={{ color: "#ffffff", fontSize: "22px", marginBottom: "15px" }}>बुकिंग या इन्वेंट्री की जानकारी के लिए सीधे संपर्क करें</h2>
          <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "25px" }}>
            फोन उठाइए या व्हाट्सएप पर अपनी डेट्स और ग्रुप साइज भेजिए। आपको तुरंत रेट्स और उपलब्धता मिल जाएगी।
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <a href="https://wa.me/91YOUR_PHONE_NUMBER?text=Hello,%20I%20am%20a%20travel%20agent%20looking%20for%20Char%20Dham%20hotel%20rooms%20in%20Uttarkashi." 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ background: "#22c55e", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
              💬 व्हाट्सएप पर बात करें
            </a>
            <a href="tel:+91YOUR_PHONE_NUMBER" 
               style={{ background: "#ef4444", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
              📞 डायरेक्ट कॉल करें
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}