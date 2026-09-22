import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const districtData = [
  {
    id: "uttarkashi",
    name: "Uttarkashi (उत्तरकाशी)",
    slug: "uttarkashi",
    tagline: "Hub of Hill Rajma, Trekking & Scenic Valleys",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Pahadi Rajma", "Red Rice", "Mandua Roti"],
    restaurants: [
      { name: "Pahadi Cafe Harshil", specialty: "Local Apple Juice and Momos", rating: "4.8 ★" },
      { name: "Uttarkashi Traditional Bhojanalaya", specialty: "Pure Desi Ghee Dal-Bhat", rating: "4.6 ★" }
    ],
    hotelsCount: "12+ Stays Available"
  },
  {
    id: "tehri",
    name: "Tehri Garhwal (टिहरी गढ़वाल)",
    slug: "tehri",
    tagline: "Traditional Taste by the Majestic Lake Waters",
    image: "https://images.unsplash.com/photo-1595655608293-98782a174f83?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Chainsoo", "Gahat Dal", "Urad Pakodi"],
    restaurants: [
      { name: "Kanatal View Dine", specialty: "Organic Pahadi Thali & Chai", rating: "4.7 ★" }
    ],
    hotelsCount: "15+ Stays Available"
  },
  {
    id: "dehradun",
    name: "Dehradun & Mussoorie (देहरादून & मसूरी)",
    slug: "dehradun",
    tagline: "Vibrant Cafe Culture & Colonial Heritage Flavors",
    image: "https://images.unsplash.com/photo-1589182337358-2fabedd73e9d?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Kafuli", "Baal Mithai", "Arsa"],
    restaurants: [
      { name: "Landour Bakehouse", specialty: "Cinnamon Bun & Artisan Coffee", rating: "4.9 ★" },
      { name: "Kalsang Ama Cafe", specialty: "Tibetan & Himalayan Delicacies", rating: "4.8 ★" }
    ],
    hotelsCount: "35+ Stays Available"
  },
  {
    id: "nainital",
    name: "Nainital - Kumaon (नैनीताल)",
    slug: "nainital",
    tagline: "The Lake District with Rich Kumaoni Heritage",
    image: "https://images.unsplash.com/photo-1590447158019-883281ab4bc1?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Bhatt ki Churkani", "Aloo ke Gutke", "Baal Mithai"],
    restaurants: [
      { name: "Mallital Kumaoni Rasoi", specialty: "Authentic Wood-fired Kumaoni Thali", rating: "4.9 ★" }
    ],
    hotelsCount: "28+ Stays Available"
  }
];

export default function DistrictsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "60px 20px", background: "#f8fafc", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Premium Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ fontSize: "13px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "2px", background: "#e0f2fe", padding: "6px 16px", borderRadius: "20px" }}>
            Culture & Culinary Heritage
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0f172a", margin: "16px 0 10px 0" }}>
            Explore Uttarakhand Districts & Local Delights
          </h2>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Discover authentic traditional recipes, handpicked cafes, and luxury mountain stays tailored for your Himalayan journey.
          </p>
        </div>

        {/* District Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
          {districtData.map((district) => (
            <div 
              key={district.id}
              onClick={() => setSelectedDistrict(district)}
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.04)";
              }}
            >
              <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                <img src={district.image} alt={district.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(4px)", color: "white", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" }}>
                  🏨 {district.hotelsCount}
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "0 0 6px 0" }}>{district.name}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 20px 0", lineHeight: "1.5" }}>{district.tagline}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#0284c7" }}>Explore Guide & Hotels →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Modal / Detail Drawer */}
        {selectedDistrict && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px"
          }}>
            <div style={{ background: "white", width: "100%", maxWidth: "650px", borderRadius: "24px", padding: "35px", position: "relative", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDistrict(null)}
                style={{ position: "absolute", top: "24px", right: "24px", background: "#f1f5f9", border: "none", width: "36px", height: "36px", borderRadius: "50%", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#334155", fontSize: "16px" }}
              >
                ✕
              </button>

              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>Destination & Culture Guide</span>
                <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", margin: "4px 0 6px 0" }}>{selectedDistrict.name}</h2>
                <p style={{ fontSize: "14px", color: "#64748b" }}>{selectedDistrict.tagline}</p>
              </div>

              {/* Famous Foods Section */}
              <div style={{ marginBottom: "24px", background: "#f8fafc", padding: "18px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>🍲 Must-Try Traditional Pahadi Dishes:</h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {selectedDistrict.famousFood.map((food, index) => (
                    <span key={index} style={{ background: "white", border: "1px solid #cbd5e1", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", color: "#1e293b", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                      ✨ {food}
                    </span>
                  ))}
                </div>
              </div>

              {/* Restaurants & Cafes Section */}
              <div style={{ marginBottom: "30px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>☕ Top Recommended Restaurants & Cafes:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {selectedDistrict.restaurants.map((rest, index) => (
                    <div key={index} style={{ background: "#ffffff", padding: "14px 18px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a" }}>{rest.name}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>Specialty: {rest.specialty}</div>
                      </div>
                      <span style={{ background: "#f0fdf4", color: "#166534", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "800" }}>{rest.rating}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  onClick={() => navigate(`/hotels?city=${selectedDistrict.slug}`)}
                  style={{ flex: 1, background: "#0284c7", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.2)", transition: "background 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#0369a1"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#0284c7"}
                >
                  🏨 View All Hotels in {selectedDistrict.name.split(" ")[0]}
                </button>
                <button 
                  onClick={() => setSelectedDistrict(null)}
                  style={{ background: "#f1f5f9", color: "#475569", border: "none", padding: "14px 20px", borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer" }}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}