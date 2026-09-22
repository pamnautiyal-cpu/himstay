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
      bgGradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(3, 105, 161, 0.1) 100%)",
      badge: "Best Seller",
      badgeColor: "#0ea5e9",
      borderCol: "rgba(14, 165, 233, 0.3)"
    },
    {
      id: 2,
      title: "Weekend Getaway Deal",
      tag: "SAVE ₹1,500",
      code: "WEEKEND1500",
      validTill: "Valid on Friday-Sunday bookings",
      desc: "Planning a quick escape to the mountains? Flat ₹1,500 off on minimum booking value of ₹5,000.",
      bgGradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(67, 56, 202, 0.1) 100%)",
      badge: "Popular",
      badgeColor: "#8b5cf6",
      borderCol: "rgba(139, 92, 246, 0.3)"
    },
    {
      id: 3,
      title: "Long Stay Workation",
      tag: "STAY 5 PAY FOR 4",
      code: "WORKATION",
      validTill: "Valid for 5+ Nights Stay",
      desc: "Work from the mountains with high-speed WiFi and panoramic views. Get 1 night complimentary on 5-night stays.",
      bgGradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.25) 0%, rgba(4, 120, 87, 0.1) 100%)",
      badge: "Value Deal",
      badgeColor: "#10b981",
      borderCol: "rgba(16, 185, 129, 0.3)"
    },
    {
      id: 4,
      title: "Monsoon Trekking Special",
      tag: "FLAT 15% OFF",
      code: "TREK15",
      validTill: "Limited Period Offer",
      desc: "Book graded treks along with stay packages and enjoy special discount on stay charges.",
      bgGradient: "linear-gradient(135deg, rgba(217, 119, 6, 0.25) 0%, rgba(180, 83, 9, 0.1) 100%)",
      badge: "Limited Time",
      badgeColor: "#f59e0b",
      borderCol: "rgba(245, 158, 11, 0.3)"
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2500);
  };

  return (
    <div style={{ 
      backgroundColor: "#0b0f19", 
      minHeight: "90vh", 
      padding: "40px 20px",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Banner Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "24px",
            padding: "40px 30px",
            color: "#fff",
            textAlign: "center",
            marginBottom: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <span
            style={{
              background: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              border: "1px solid rgba(56, 189, 248, 0.3)",
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
          <h1 style={{ fontSize: "32px", margin: "0 0 10px 0", fontWeight: "800", color: "#ffffff" }}>
            Unbeatable Mountain Discounts
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "600px", margin: "0 auto" }}>
            Apply coupon codes at checkout to get instant discounts on stays across Uttarakhand.
          </p>
        </div>

        {/* Offers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {offersList.map((offer) => (
            <div
              key={offer.id}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${offer.borderCol}`,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                backdropFilter: "blur(12px)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              {/* Background Glow Effect inside Card */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "140px",
                height: "140px",
                background: offer.bgGradient,
                filter: "blur(45px)",
                zIndex: 0
              }} />

              {/* Card Header Content */}
              <div style={{ padding: "24px 24px 16px 24px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
                      {offer.tag}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8" }}>
                      {offer.title}
                    </div>
                  </div>
                  <span
                    style={{
                      backgroundColor: `${offer.badgeColor}22`,
                      color: offer.badgeColor,
                      border: `1px solid ${offer.badgeColor}55`,
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "4px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    {offer.badge}
                  </span>
                </div>

                <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: "1.5", margin: "12px 0 20px 0" }}>
                  {offer.desc}
                </p>

                {/* Coupon Box */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    border: "1px dashed rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                      Coupon Code
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: "#fbbf24", letterSpacing: "1px" }}>
                      {offer.code}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(offer.code)}
                    style={{
                      backgroundColor: copiedCode === offer.code ? "#10b981" : "#3b82f6",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {copiedCode === offer.code ? "Copied!" : "Copy Code"}
                  </button>
                </div>

                <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>⏳</span> {offer.validTill}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ padding: "0 24px 24px 24px", position: "relative", zIndex: 1 }}>
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
          ))}
        </div>
      </div>
    </div>
  );
}