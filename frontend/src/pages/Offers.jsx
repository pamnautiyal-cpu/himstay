import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Offers() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState("");

  const offersList = [
    {
      id: 1,
      title: "Early Mountain Explorer",
      tag: "FLAT 20% OFF",
      code: "HIMALAYA20",
      validTill: "Valid till 30th Sep",
      desc: "Get 20% instant discount on all Himalayan homestays and luxury resorts when you book 7 days in advance.",
      badge: "Best Seller",
      badgeColor: "#0ea5e9",
      accentColor: "#0ea5e9",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      themeGradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(2, 132, 199, 0.05))"
    },
    {
      id: 2,
      title: "Weekend Getaway Deal",
      tag: "SAVE ₹1,500",
      code: "WEEKEND1500",
      validTill: "Valid on Friday-Sunday bookings",
      desc: "Planning a quick escape to the mountains? Flat ₹1,500 off on minimum booking value of ₹5,000.",
      badge: "Popular",
      badgeColor: "#8b5cf6",
      accentColor: "#8b5cf6",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      themeGradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.05))"
    },
    {
      id: 3,
      title: "Long Stay Workation",
      tag: "STAY 5 PAY FOR 4",
      code: "WORKATION",
      validTill: "Valid for 5+ Nights Stay",
      desc: "Work from the mountains with high-speed WiFi and panoramic views. Get 1 night complimentary on 5-night stays.",
      badge: "Value Deal",
      badgeColor: "#10b981",
      accentColor: "#10b981",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
      themeGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))"
    },
    {
      id: 4,
      title: "Monsoon Trekking Special",
      tag: "FLAT 15% OFF",
      code: "TREK15",
      validTill: "Limited Period Offer",
      desc: "Book graded treks along with stay packages and enjoy special discount on stay charges.",
      badge: "Limited Time",
      badgeColor: "#f59e0b",
      accentColor: "#f59e0b",
      image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80",
      themeGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.05))"
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2500);
  };

  return (
    <div style={{ 
      backgroundColor: "#070b14", 
      minHeight: "100vh", 
      padding: "40px 20px",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Banner Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "24px",
            padding: "45px 30px",
            color: "#fff",
            textAlign: "center",
            marginBottom: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{
            position: "absolute",
            top: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            height: "100px",
            background: "rgba(14, 165, 233, 0.15)",
            filter: "blur(60px)",
            zIndex: 0
          }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                display: "inline-block",
                marginBottom: "12px"
              }}
            >
              Exclusive Deals
            </span>
            <h1 style={{ fontSize: "34px", margin: "0 0 10px 0", fontWeight: "800", color: "#ffffff" }}>
              Unbeatable Mountain Discounts
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "600px", margin: "0 auto" }}>
              Apply coupon codes at checkout to get instant discounts on stays across Uttarakhand.
            </p>
          </div>
        </div>

        {/* Offers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
          }}
        >
          {offersList.map((offer) => (
            <div
              key={offer.id}
              style={{
                backgroundColor: "#111827",
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid rgba(255, 255, 255, 0.08)`,
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              {/* Card Image Section */}
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} 
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 40%, #111827 100%)"
                }} />
                
                {/* Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: `${offer.badgeColor}dd`,
                    backdropFilter: "blur(4px)",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                  }}
                >
                  {offer.badge}
                </span>

                {/* Offer Tag Over Image */}
                <div style={{ position: "absolute", bottom: "12px", left: "16px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>
                    {offer.tag}
                  </span>
                </div>
              </div>

              {/* Card Body Content */}
              <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#f8fafc", marginBottom: "8px" }}>
                    {offer.title}
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.5", margin: "0 0 16px 0" }}>
                    {offer.desc}
                  </p>
                </div>

                <div>
                  {/* Coupon Box */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px dashed rgba(255, 255, 255, 0.15)",
                      borderRadius: "12px",
                      padding: "10px 14px",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                        Coupon Code
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: offer.accentColor, letterSpacing: "1px" }}>
                        {offer.code}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(offer.code)}
                      style={{
                        backgroundColor: copiedCode === offer.code ? "#10b981" : offer.accentColor,
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 14px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: `0 4px 12px ${offer.accentColor}44`,
                        transition: "background 0.2s",
                      }}
                    >
                      {copiedCode === offer.code ? "Copied!" : "Copy Code"}
                    </button>
                  </div>

                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                    <span>⏳</span> {offer.validTill}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate("/hotels")}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "#fff",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Explore Stays & Apply Offer →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}