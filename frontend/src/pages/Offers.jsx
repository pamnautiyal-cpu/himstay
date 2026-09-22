import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const offersList = [
    {
      id: 1,
      title: "FLAT 20% OFF",
      subtitle: "Early Mountain Explorer",
      desc: "Get 20% instant discount on all Himalayan homestays and luxury resorts when you book 7 days in advance.",
      code: "HIHIMALAYA20",
      validity: "Valid till 30th Sep",
      badge: "Best Seller",
      badgeColor: "#0ea5e9",
      gradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(2, 132, 199, 0.05))",
      borderCol: "rgba(14, 165, 233, 0.3)"
    },
    {
      id: 2,
      title: "SAVE ₹1,500",
      subtitle: "Weekend Getaway Deal",
      desc: "Planning a quick escape to the mountains? Flat ₹1,500 off on minimum booking value of ₹5,000.",
      code: "WEEKEND1500",
      validity: "Valid on Friday-Sunday bookings",
      badge: "Popular",
      badgeColor: "#8b5cf6",
      gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(109, 40, 217, 0.05))",
      borderCol: "rgba(139, 92, 246, 0.3)"
    },
    {
      id: 3,
      title: "STAY 5 PAY FOR 4",
      subtitle: "Long Stay Workation",
      desc: "Work from the mountains with high-speed WiFi and panoramic views. Get 1 night complimentary on 5+ night stays.",
      code: "WORKATION",
      validity: "Valid for 5+ Nights Stay",
      badge: "Value Deal",
      badgeColor: "#10b981",
      gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05))",
      borderCol: "rgba(16, 185, 129, 0.3)"
    },
    {
      id: 4,
      title: "FLAT 15% OFF",
      subtitle: "Monsoon Trekking Special",
      desc: "Book graded treks along with stay packages and enjoy special discount on stay charges.",
      code: "TREK15",
      validity: "Limited Period Offer",
      badge: "Limited Time",
      badgeColor: "#f59e0b",
      gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05))",
      borderCol: "rgba(245, 158, 11, 0.3)"
    }
  ];

  return (
    <div style={{
      background: "#0b0f19",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "#f8fafc",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "40px 20px",
          textAlign: "center",
          marginBottom: "40px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(245, 158, 11, 0.15)",
            color: "#fbbf24",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1px",
            marginBottom: "12px",
            border: "1px solid rgba(245, 158, 11, 0.3)"
          }}>
            EXCLUSIVE DEALS
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "10px", color: "#ffffff" }}>
            Unbeatable Mountain Discounts
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "600px", margin: "0 auto" }}>
            Apply coupon codes at checkout to get instant discounts on stays across Uttarakhand.
          </p>
        </div>

        {/* Offers Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {offersList.map((offer) => (
            <div key={offer.id} style={{
              background: "#1e293b",
              borderRadius: "20px",
              border: `1px solid ${offer.borderCol}`,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(12px)"
            }}>
              {/* Background Glow Effect */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "120px",
                height: "120px",
                background: offer.gradient,
                filter: "blur(40px)",
                zIndex: 0
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Top Badge & Title */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", margin: 0 }}>
                      {offer.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "500", margin: "4px 0 0 0" }}>
                      {offer.subtitle}
                    </p>
                  </div>
                  <span style={{
                    background: `${offer.badgeColor}22`,
                    color: offer.badgeColor,
                    border: `1px solid ${offer.badgeColor}55`,
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "20px"
                  }}>
                    {offer.badge}
                  </span>
                </div>

                <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5", marginBottom: "20px" }}>
                  {offer.desc}
                </p>

                {/* Coupon Box */}
                <div style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px dashed rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px"
                }}>
                  <div>
                    <span style={{ fontSize: "10px", color: "#64748b", display: "block", textTransform: "uppercase", fontWeight: "600" }}>
                      Coupon Code
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#fbbf24", letterSpacing: "0.5px" }}>
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    style={{
                      background: copiedCode === offer.code ? "#10b981" : "#3b82f6",
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                  >
                    {copiedCode === offer.code ? "Copied!" : "Copy Code"}
                  </button>
                </div>

                <div style={{ fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                  <span>⏳</span> {offer.validity}
                </div>
              </div>

              {/* Action Button */}
              <Link to="/hotels" style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                textAlign: "center",
                padding: "10px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600",
                display: "block",
                transition: "all 0.2s ease",
                zIndex: 1
              }}>
                Explore Stays & Apply Offer →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}