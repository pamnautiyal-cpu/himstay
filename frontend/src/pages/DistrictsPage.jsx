import React, { useState } from "react";

const districtData = [
  {
    id: "uttarkashi",
    name: "Uttarkashi (उत्तरकाशी)",
    tagline: "Hub of Hill Rajma, Trekking & Scenic Valleys",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Pahadi Rajma", "Red Rice", "Mandua Roti"],
    foodSpots: [
      {
        id: "uttarkashi-spot-1",
        name: "Pahadi Cafe Harshil",
        type: "Local Cafe & Organic Eatery",
        specialtyMenu: "Specialty: Fresh Apple Juice, Local Momos & Organic Red Rice Khichdi",
        rating: "4.8 ★",
        location: "Harshil Valley, Uttarkashi"
      },
      {
        id: "uttarkashi-spot-2",
        name: "Uttarkashi Traditional Bhojanalaya",
        type: "Desi Dhaba & Traditional Thali",
        specialtyMenu: "Special Menu: Pure Desi Ghee Dal-Bhat, Hill Rajma & Mandua Roti",
        rating: "4.6 ★",
        location: "Main Market, Uttarkashi"
      },
      {
        id: "uttarkashi-spot-3",
        name: "Gangotri Street Food Corner",
        type: "Street Food & Snacks",
        specialtyMenu: "Special Menu: Aloo ke Gutke, Hot Tea & Local Urad Pakodi",
        rating: "4.7 ★",
        location: "Bhatwari Road, Uttarkashi"
      }
    ]
  },
  {
    id: "tehri",
    name: "Tehri Garhwal (टिहरी गढ़वाल)",
    tagline: "Traditional Taste by the Majestic Lake Waters",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Chainsoo", "Gahat Dal", "Urad Pakodi"],
    foodSpots: [
      {
        id: "tehri-spot-1",
        name: "Kanatal View Dine & Cafe",
        type: "Hillside Cafe & Restaurant",
        specialtyMenu: "Special Menu: Chainsoo, Gahat Dal, Organic Pahadi Thali & Burans Juice",
        rating: "4.7 ★",
        location: "Kanatal, Tehri Garhwal"
      },
      {
        id: "tehri-spot-2",
        name: "Tehri Lake Food Plaza",
        type: "Local Food Court & Snacks",
        specialtyMenu: "Special Menu: Urad Pakodi with Mint Chutney & Jhangora Kheer",
        rating: "4.5 ★",
        location: "New Tehri Lakeside"
      }
    ]
  },
  {
    id: "dehradun",
    name: "Dehradun & Mussoorie (देहरादून & मसूरी)",
    tagline: "Vibrant Cafe Culture & Colonial Heritage Flavors",
    image: "https://images.unsplash.com/photo-1589182337358-2fabedd73e9d?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Kafuli", "Baal Mithai", "Arsa"],
    foodSpots: [
      {
        id: "dehradun-spot-1",
        name: "Landour Bakehouse",
        type: "Heritage Bakery & Cafe",
        specialtyMenu: "Special Menu: Cinnamon Buns, Hot Chocolate, Artisanal Coffee & Muffins",
        rating: "4.9 ★",
        location: "Landour, Mussoorie"
      },
      {
        id: "dehradun-spot-2",
        name: "Kalsang Ama Cafe",
        type: "Popular Himalayan Cafe",
        specialtyMenu: "Special Menu: Tibetan Delicacies, Thukpa & Local Green Kafuli",
        rating: "4.8 ★",
        location: "Mall Road, Mussoorie"
      },
      {
        id: "dehradun-spot-3",
        name: "Traditional Garhwali Rasoi",
        type: "Authentic Restaurant",
        specialtyMenu: "Special Menu: Arsa Sweet, Baal Mithai & Mixed Veg Pahadi Thali",
        rating: "4.7 ★",
        location: "Rajpur Road, Dehradun"
      }
    ]
  },
  {
    id: "nainital",
    name: "Nainital - Kumaon (नैनीताल)",
    tagline: "The Lake District with Rich Kumaoni Heritage",
    image: "https://images.unsplash.com/photo-1590447158019-883281ab4bc1?auto=format&fit=crop&w=800&q=80",
    famousFood: ["Bhatt ki Churkani", "Aloo ke Gutke", "Baal Mithai"],
    foodSpots: [
      {
        id: "nainital-spot-1",
        name: "Mallital Kumaoni Rasoi",
        type: "Specialty Kumaoni Restaurant",
        specialtyMenu: "Special Menu: Bhatt ki Churkani, Dubuk, Wood-fired Kumaoni Thali",
        rating: "4.9 ★",
        location: "Mallital, Nainital"
      },
      {
        id: "nainital-spot-2",
        name: "Sonam Fast Food (Tibetan & Local)",
        type: "Famous Street Food Joint",
        specialtyMenu: "Special Menu: Authentic Thukpa, Chowmein & Local Aloo ke Gutke",
        rating: "4.8 ★",
        location: "Bara Bazaar, Nainital"
      }
    ]
  }
];

export default function DistrictsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div style={{ padding: "60px 20px", background: "#f8fafc", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ fontSize: "13px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "2px", background: "#e0f2fe", padding: "6px 16px", borderRadius: "20px" }}>
            Culture & Food Guide
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0f172a", margin: "16px 0 10px 0" }}>
            Uttarakhand Districts & Local Food Spots
          </h2>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Explore districts to discover local restaurants, street food hubs, cafes, and their traditional menus.
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
                <img 
                  src={district.image} 
                  alt={district.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  onError={(e)=>{
                    // Fallback image if any link fails
                    e.target.src = "https://images.unsplash.com/photo-1595655608293-98782a174f83?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(4px)", color: "white", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" }}>
                  🍽️ {district.foodSpots.length} Food Spots & Cafes Listed
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "0 0 6px 0" }}>{district.name}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 20px 0", lineHeight: "1.5" }}>{district.tagline}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#0284c7" }}>View Food Spots & Menu →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal showing District Food Spots & Menus */}
        {selectedDistrict && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px"
          }}>
            <div style={{ background: "white", width: "100%", maxWidth: "700px", borderRadius: "24px", padding: "35px", position: "relative", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDistrict(null)}
                style={{ position: "absolute", top: "24px", right: "24px", background: "#f1f5f9", border: "none", width: "36px", height: "36px", borderRadius: "50%", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#334155", fontSize: "16px" }}
              >
                ✕
              </button>

              <div style={{ marginBottom: "20px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>Local Food & Restaurant Guide</span>
                <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", margin: "4px 0 6px 0" }}>{selectedDistrict.name}</h2>
                <p style={{ fontSize: "14px", color: "#64748b" }}>Explore standalone restaurants, cafes, dhabas, and street food joints with their special menus below.</p>
              </div>

              {/* Famous Traditional Dishes Tags */}
              <div style={{ marginBottom: "20px", background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "13px", fontWeight: "800", color: "#334155", marginBottom: "8px" }}>🍲 Signature Local Dishes of this District:</h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {selectedDistrict.famousFood.map((food, index) => (
                    <span key={index} style={{ background: "white", border: "1px solid #cbd5e1", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", color: "#1e293b" }}>
                      ✨ {food}
                    </span>
                  ))}
                </div>
              </div>

              {/* Food Spots List with Menus */}
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>🍴 Local Restaurants, Cafes & Food Joints:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {selectedDistrict.foodSpots.map((spot) => (
                    <div 
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot)}
                      style={{ 
                        background: "#ffffff", 
                        padding: "16px 20px", 
                        borderRadius: "16px", 
                        border: "1px solid #cbd5e1", 
                        cursor: "pointer", 
                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#0284c7";
                        e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#cbd5e1";
                        e.currentTarget.style.background = "#ffffff";
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                        <div>
                          <span style={{ fontSize: "10px", fontWeight: "800", background: "#f0fdf4", color: "#166534", padding: "2px 8px", borderRadius: "6px", marginRight: "8px" }}>{spot.type}</span>
                          <span style={{ fontSize: "16px", fontWeight: "900", color: "#0f172a" }}>{spot.name}</span>
                        </div>
                        <span style={{ background: "#fef3c7", color: "#92400e", padding: "3px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "800" }}>{spot.rating}</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "6px" }}>📍 {spot.location}</div>
                      <p style={{ fontSize: "13px", color: "#475569", margin: "4px 0 0 0", lineHeight: "1.4" }}>
                        ✨ {spot.specialtyMenu}
                      </p>
                      <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "700", color: "#0284c7" }}>
                        View Restaurant Menu & Details →
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedDistrict(null)}
                style={{ width: "100%", background: "#0f172a", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer" }}
              >
                Close Guide
              </button>

            </div>
          </div>
        )}

        {/* Opening Soon / Coming Soon Modal */}
        {selectedSpot && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100, padding: "20px"
          }}>
            <div style={{ background: "white", width: "100%", maxWidth: "450px", borderRadius: "24px", padding: "35px", textAlign: "center", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
              
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🚀</div>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", background: "#e0f2fe", padding: "4px 12px", borderRadius: "20px" }}>
                Opening Soon
              </span>
              <h3 style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a", margin: "16px 0 8px 0" }}>
                {selectedSpot.name}
              </h3>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 20px 0", lineHeight: "1.5" }}>
                The complete detailed listing, menu, and offerings for this restaurant will be live on this platform very soon. Stay tuned!
              </p>
              
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px", color: "#334155", marginBottom: "24px", fontWeight: "600" }}>
                ✨ {selectedSpot.specialtyMenu}
              </div>

              <button 
                onClick={() => setSelectedSpot(null)}
                style={{ width: "100%", background: "#0f172a", color: "white", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer" }}
              >
                Got It, Thanks!
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}