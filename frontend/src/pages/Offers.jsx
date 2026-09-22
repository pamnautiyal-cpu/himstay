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
      bgGradient: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
      badge: "Best Seller",
    },
    {
      id: 2,
      title: "Weekend Getaway Deal",
      tag: "SAVE ₹1,500",
      code: "WEEKEND1500",
      validTill: "Valid on Friday-Sunday bookings",
      desc: "Planning a quick escape to the mountains? Flat ₹1,500 off on minimum booking value of ₹5,000.",
      bgGradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      badge: "Popular",
    },
    {
      id: 3,
      title: "Long Stay Workation",
      tag: "STAY 5 PAY FOR 4",
      code: "WORKATION",
      validTill: "Valid for 5+ Nights Stay",
      desc: "Work from the mountains with high-speed WiFi and panoramic views. Get 1 night complimentary on 5-night stays.",
      bgGradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      badge: "Value Deal",
    },
    {
      id: 4,
      title: "Monsoon Trekking Special",
      tag: "FLAT 15% OFF",
      code: "TREK15",
      validTill: "Limited Period Offer",
      desc: "Book guided treks along with stay packages and enjoy special discount on stay charges.",
      bgGradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
      badge: "Limited Time",
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2500);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "85vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Banner Section */}
        <div
          style={{
            background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "20px",
            padding: "40px 30px",
            color: "#fff",
            textAlign: "center",
            marginBottom: "40px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <span
            style={{
              background: "#38bdf8",
              color: "#0f172a",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Exclusive Deals
          </span>
          <h1 style={{ fontSize: "32px", margin: "16px 0 8px 0", fontWeight: "800" }}>
            Unbeatable Mountain Discounts
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
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
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                justify: "space-between",
                position: "relative",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  background: offer.bgGradient,
                  color: "#fff",
                  padding: "20px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(4px)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "12px",
                  }}
                >
                  {offer.badge}
                </span>
                <div style={{ fontSize: "22px", fontWeight: "800", marginBottom: "4px" }}>
                  {offer.tag}
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", opacity: 0.9 }}>
                  {offer.title}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px", flexGrow: 1 }}>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.5", margin: "0 0 16px 0" }}>
                  {offer.desc}
                </p>

                {/* Coupon Box */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#f1f5f9",
                    border: "1px dashed #cbd5e1",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                      Coupon Code
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", letterSpacing: "1px" }}>
                      {offer.code}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(offer.code)}
                    style={{
                      backgroundColor: copiedCode === offer.code ? "#10b981" : "#0284c7",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {copiedCode === offer.code ? "Copied!" : "Copy Code"}
                  </button>
                </div>

                <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>
                  ⏳ {offer.validTill}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ padding: "0 20px 20px 20px" }}>
                <button
                  onClick={() => navigate("/hotels")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "background 0.2s",
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