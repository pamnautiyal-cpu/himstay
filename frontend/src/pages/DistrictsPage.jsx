import React, { useState } from "react";

// Uttarakhand districts and cultural/food data structure (English with bilingual local names)
const districtData = [
  {
    id: "uttarkashi",
    name: "Uttarkashi (उत्तरकाशी)",
    tagline: "Hub of Hill Rajma and Trekking",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    famousFood: ["Pahadi Rajma", "Red Rice", "Mandua Roti"],
    restaurants: [
      { name: "Pahadi Cafe Harshil", specialty: "Local Apple Juice and Momos" },
      { name: "Uttarkashi Traditional Bhojanalaya", specialty: "Pure Desi Ghee Dal-Bhat" }
    ]
  },
  {
    id: "tehri",
    name: "Tehri Garhwal (टिहरी गढ़वाल)",
    tagline: "Traditional Taste by the Lake",
    image: "https://images.unsplash.com/photo-1595655608293-98782a174f83?auto=format&fit=crop&w=600&q=80",
    famousFood: ["Chainsoo", "Gahat Dal", "Urad Pakodi"],
    restaurants: [
      { name: "Kanatal View Dine", specialty: "Organic Pahadi Thali" }
    ]
  },
  {
    id: "dehradun",
    name: "Dehradun & Mussoorie (देहरादून & मसूरी)",
    tagline: "Cafe Culture and Mountain Flavors",
    image: "https://images.unsplash.com/photo-1589182337358-2fabedd73e9d?auto=format&fit=crop&w=600&q=80",
    famousFood: ["Kafuli", "Baal Mithai", "Arsa"],
    restaurants: [
      { name: "Landour Bakers", specialty: "Cinnamon Bun and Coffee" }
    ]
  },
  {
    id: "nainital",
    name: "Nainital - Kumaon (नैनीताल)",
    tagline: "City of Lakes and Kumaoni Flavors",
    image: "https://images.unsplash.com/photo-1590447158019-883281ab4bc1?auto=format&fit=crop&w=600&q=80",
    famousFood: ["Bhatt ki Churkani", "Aloo ke Gutke", "Baal Mithai"],
    restaurants: [
      { name: "Mallital Kumaoni Rasoi", specialty: "Traditional Kumaoni Authentic Food" }
    ]
  }
];

export default function DistrictsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <div style={{ padding: "50px 20px", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>
            Culture & Taste
          </span>
          <h2 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "8px 0" }}>
            Uttarakhand Districts, Local Foods & Cafes
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Explore famous traditional dishes and special places of each district along with hotel bookings.
          </p>
        </div>

        {/* District Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {districtData.map((district) => (
            <div 
              key={district.id}
              onClick={() => setSelectedDistrict(district)}
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ height: "160px", overflow: "hidden" }}>
                <img src={district.image} alt={district.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>{district.name}</h3>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 16px 0" }}>{district.tagline}</p>
                <div style={{ display: "inline-block", background: "#f0fdf4", color: "#166534", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px" }}>
                  🍽️ {district.famousFood.length} Local Dishes Available
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Details View when a district is clicked */}
        {selectedDistrict && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px"
          }}>
            <div style={{ background: "white", width: "100%", maxWidth: "600px", borderRadius: "20px", padding: "30px", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
              
              <button 
                onClick={() => setSelectedDistrict(null)}
                style={{ position: "absolute", top: "20px", right: "20px", background: "#f1f5f9", border: "none", width: "32px", height: "32px", borderRadius: "50%", fontWeight: "800", cursor: "pointer" }}
              >
                ✕
              </button>

              <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a", marginBottom: "4px" }}>{selectedDistrict.name} Guide</h2>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>{selectedDistrict.tagline}</p>

              {/* Famous Foods */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", color: "#334155", marginBottom: "8px" }}>🍲 Traditional Pahadi Food:</h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {selectedDistrict.famousFood.map((food, index) => (
                    <span key={index} style={{ background: "#f8fafc", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", color: "#1e293b" }}>
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              {/* Restaurants / Cafes */}
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", color: "#334155", marginBottom: "8px" }}>☕ Famous Restaurants & Cafes:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedDistrict.restaurants.map((rest, index) => (
                    <div key={index} style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a" }}>{rest.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>Specialty: {rest.specialty}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setSelectedDistrict(null)}
                style={{ width: "100%", background: "#0284c7", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "800", fontSize: "14px", cursor: "pointer" }}
              >
                Close / View Hotels
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}