import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  
  // State to track selected meal plan for each room index: { [roomIndex]: { planName, priceExtra } }
  const [selectedMealPlans, setSelectedMealPlans] = useState({});

  // Sabhi 16 hotals ke liye universal rooms list
  const standardRoomsList = [
    { type: "Standard Room", basePrice: 1799, inclusions: ["1 Comfortable Bed", "Max 2 Adults", "Attached Washroom", "Free Wi-Fi"] },
    { type: "Deluxe Room", basePrice: 2299, inclusions: ["1 Double Bed", "Max 2 Adults + 1 Child", "Mountain View", "LED TV"] },
    { type: "Super Deluxe Room", basePrice: 2899, inclusions: ["1 Double Bed + Extra Mattress", "Max 3 Guests", "24/7 Hot Water", "Balcony"] },
    { type: "Family Suite", basePrice: 3599, inclusions: ["2 Double Beds", "Max 4 Guests", "Spacious Hall", "Complimentary Breakfast"] }
  ];

  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", description: "Luxury stay at Gangotri with traditional architecture and modern comfort.", images: ["/images/hotals/Hotel Nagraja Palace1.jpg", "/images/hotals/Hotel Nagraja Palace2.jpg", "/images/hotals/Hotel Nagraja Palace3.jpg"] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", description: "Cozy home-like stay offering genuine pahadi hospitality and warmth.", images: ["/images/hotals/Grandparents Homestay1.jpg", "/images/hotals/Grandparents Homestay2.jpg", "/images/hotals/Grandparents Homestay3.jpg"] },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range", description: "Best hygiene stay with scenic valley views and quiet ambiance.", images: ["/images/hotals/Hotel Prisha Pahal1.jpg", "/images/hotals/Hotel Prisha Pahal2.jpg", "/images/hotals/Hotel Prisha Pahal3.jpg"] },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose", description: "Modern comfort right in town with high-speed connectivity.", images: ["/images/hotals/Hotel K.P Residency1.jpg", "/images/hotals/Hotel K.P Residency2.jpg", "/images/hotals/Hotel K.P Residency3.jpg"] },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd", description: "Nestled in nature's lap, perfect for meditation and peaceful holidays.", images: ["/images/hotals/Dhruvnanda Homestay1.jpg", "/images/hotals/Dhruvnanda Homestay2.jpg", "/images/hotals/Dhruvnanda Homestay3.jpg"] },
    "local_06": { name: "Himalayan Abode", location: "Main Market", description: "Premium market stay with easy access to local attractions.", images: ["/images/hotals/Himalayan Abode home stay.jpg", "/images/hotals/Hotel Nagraja Palace2.jpg", "/images/hotals/Hotel Nagraja Palace3.jpg"] },
    "local_07": { name: "Riverside Retreat", location: "Bhagirathi Bank", description: "Stunning river view retreat by the holy Bhagirathi river stream.", images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600"] },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge", description: "Scenic view overlooking the mountains and holy water streams.", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600"] },
    "local_09": { name: "Green Valley Homestay", location: "Village Road", description: "Simple, clean stay surrounded by lush green mountain vegetation.", images: ["https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town", description: "Authentic old town experience with traditional mountain culture.", images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd", description: "Breathtaking peak views with crisp Himalayan morning breeze.", images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
    "local_12": { name: "Peaceful Stay", location: "Valley View", description: "Ultra-peaceful environment away from city noise.", images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
    "local_13": { name: "Char Dham Camp", location: "Near Highway", description: "Adventurous camp-style stay equipped with comfortable bedding.", images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road", description: "Wake up to stunning sunrise views over the Garhwal ridges.", images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
    "local_15": { name: "Nature's Nest", location: "Orchard Side", description: "Tranquil retreat located right beside apple and fruit orchards.", images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
    "local_16": { name: "Skyline Hotel", location: "City Center", description: "Convenient city center location with premium hospitality.", images: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] }
  };

  useEffect(() => {
    let baseRooms = standardRoomsList;
    if (localHotels[id]) {
      setHotel({ ...localHotels[id], rooms: baseRooms });
    } else if (id) {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => {
          const data = res.data;
          setHotel({
            ...data,
            location: data.city ? `${data.city}, ${data.state || ""}` : (data.location || "Uttarakhand"),
            images: data.images && data.images.length > 0 ? data.images : ["/images/hotals/Hotel Nagraja Palace1.jpg"],
            rooms: data.rooms && data.rooms.length > 0 ? data.rooms : baseRooms
          });
        })
        .catch((err) => {
          console.error("Error fetching property details:", err);
          setHotel({ ...localHotels["local_01"], rooms: baseRooms });
        });
    } else {
      setHotel({ ...localHotels["local_01"], rooms: baseRooms });
    }
  }, [id]);

  const handleMealPlanSelect = (roomIndex, planName, extraCost) => {
    setSelectedMealPlans(prev => ({
      ...prev,
      [roomIndex]: { planName, extraCost }
    }));
  };

  const navigateToBooking = (roomType, finalPrice, mealPlan) => {
    const targetId = id || "local_01";
    navigate(`/booking/${targetId}`, { state: { roomType, finalPrice, mealPlan } });
  };

  if (!hotel) return <div style={{ textAlign: "center", padding: "100px", fontSize: "18px", color: "#64748b" }}>🏔️ Loading Premium Experience...</div>;

  const mainImg = hotel.images?.[0] || "/images/hotals/Hotel Nagraja Palace1.jpg";
  const subImg1 = hotel.images?.[1] || hotel.images?.[0] || "/images/hotals/Hotel Nagraja Palace2.jpg";
  const subImg2 = hotel.images?.[2] || hotel.images?.[0] || "/images/hotals/Hotel Nagraja Palace3.jpg";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", color: "#0f172a", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* Back Button */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 20px" }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: "none", border: "none", color: "#0284c7", fontWeight: "700", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}
        >
          ← Back to Stays
        </button>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Luxury Photo Gallery Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px", borderRadius: "20px", overflow: "hidden", marginBottom: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", height: "400px" }}>
          <div style={{ overflow: "hidden" }}>
            <img 
              src={mainImg} 
              alt={hotel.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", height: "100%" }}>
            <img 
              src={subImg1} 
              alt="preview 1" 
              style={{ width: "100%", height: "calc(50% - 7px)", objectFit: "cover", borderRadius: "12px" }} 
              onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace2.jpg"; }}
            />
            <img 
              src={subImg2} 
              alt="preview 2" 
              style={{ width: "100%", height: "calc(50% - 7px)", objectFit: "cover", borderRadius: "12px" }} 
              onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace3.jpg"; }}
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "30px", alignItems: "flex-start" }}>
          
          {/* Left Column */}
          <div>
            {/* Hotel Title Card */}
            <div style={{ background: "white", padding: "28px", borderRadius: "20px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1px" }}>📍 {hotel.location}</span>
                  <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "8px 0 10px 0" }}>{hotel.name}</h1>
                  <p style={{ fontSize: "13px", color: "#16a34a", fontWeight: "700", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>✨</span> Verified Himalayan Luxury Stay • Couple & Family Friendly
                  </p>
                </div>
                <div style={{ background: "linear-gradient(135deg, #0284c7, #0369a1)", color: "white", padding: "8px 16px", borderRadius: "12px", fontWeight: "800", fontSize: "15px", textAlign: "center", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)" }}>
                  ⭐ 4.9 <span style={{ fontSize: "10px", fontWeight: "500", display: "block", opacity: "0.9" }}>Exceptional</span>
                </div>
              </div>
            </div>

            {/* About Property */}
            <div style={{ background: "white", padding: "28px", borderRadius: "20px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>About Property</h3>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7", margin: 0 }}>{hotel.description || "Experience breathtaking views, serene ambiance, and top-tier hospitality right in the heart of the Himalayas."}</p>
            </div>

            {/* Top Amenities */}
            <div style={{ background: "white", padding: "28px", borderRadius: "20px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Top Amenities</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", fontSize: "13px", color: "#334155", fontWeight: "700" }}>
                <div style={amenityBox}>🅿️ Free Parking</div>
                <div style={amenityBox}>🍽️ Multi-cuisine Dining</div>
                <div style={amenityBox}>📶 High-speed Wi-Fi</div>
                <div style={amenityBox}>🚿 24/7 Hot Water</div>
                <div style={amenityBox}>🛡️ 24/7 CCTV Security</div>
                <div style={amenityBox}>🚽 Attached Washroom</div>
              </div>
            </div>

            {/* Select Your Room & Meal Plans Section */}
            <div style={{ background: "white", padding: "28px", borderRadius: "20px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ marginBottom: "20px" }}>
                <span style={{ background: "rgba(2, 132, 199, 0.1)", color: "#0284c7", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>
                  Tailored Accommodations & Meal Plans
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "8px 0 4px 0" }}>Select Room & Meal Plan (EP, CP, MAP, AP)</h3>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Customize your stay with your preferred meal package.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {hotel.rooms?.map((room, index) => {
                  const base = room.basePrice || room.price || 1799;
                  const currentMeal = selectedMealPlans[index] || { planName: "EP", extraCost: 0 };
                  const finalPrice = base + currentMeal.extraCost;

                  return (
                    <div key={index} style={{ border: "2px solid #e2e8f0", borderRadius: "16px", padding: "20px", background: "#ffffff", display: "flex", flexDirection: "column", gap: "16px", transition: "all 0.3s ease" }}>
                      
                      {/* Room Header Info */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                        <div>
                          <h4 style={{ fontSize: "18px", fontWeight: "900", color: "#0f172a", margin: "0 0 6px 0" }}>{room.type}</h4>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                            {room.inclusions?.map((inc, i) => (
                              <span key={i} style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>
                                ✓ {inc}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "11px", color: "#64748b", display: "block", fontWeight: "600" }}>Total per night</span>
                          <span style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a" }}>₹{finalPrice}</span>
                          <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>+ taxes</span>
                        </div>
                      </div>

                      {/* Meal Plan Selector (EP, CP, MAP, AP) */}
                      <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "#334155", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>
                          Choose Meal Plan:
                        </span>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
                          
                          <label style={mealPlanLabelStyle(currentMeal.planName === "EP")}>
                            <input 
                              type="radio" 
                              name={`meal_plan_${index}`} 
                              defaultChecked 
                              onChange={() => handleMealPlanSelect(index, "EP (Room Only)", 0)} 
                            />
                            <div>
                              <strong style={{ display: "block" }}>EP</strong>
                              <span style={{ fontSize: "10px", color: "#64748b" }}>Room Only (₹0)</span>
                            </div>
                          </label>

                          <label style={mealPlanLabelStyle(currentMeal.planName === "CP (Room + Breakfast)")}>
                            <input 
                              type="radio" 
                              name={`meal_plan_${index}`} 
                              onChange={() => handleMealPlanSelect(index, "CP (Room + Breakfast)", 300)} 
                            />
                            <div>
                              <strong style={{ display: "block" }}>CP</strong>
                              <span style={{ fontSize: "10px", color: "#64748b" }}>+ Breakfast (+₹300)</span>
                            </div>
                          </label>

                          <label style={mealPlanLabelStyle(currentMeal.planName === "MAP (Breakfast + Dinner)")}>
                            <input 
                              type="radio" 
                              name={`meal_plan_${index}`} 
                              onChange={() => handleMealPlanSelect(index, "MAP (Breakfast + Dinner)", 800)} 
                            />
                            <div>
                              <strong style={{ display: "block" }}>MAP</strong>
                              <span style={{ fontSize: "10px", color: "#64748b" }}>B/F & Dinner (+₹800)</span>
                            </div>
                          </label>

                          <label style={mealPlanLabelStyle(currentMeal.planName === "AP (All Meals Included)")}>
                            <input 
                              type="radio" 
                              name={`meal_plan_${index}`} 
                              onChange={() => handleMealPlanSelect(index, "AP (All Meals Included)", 1400)} 
                            />
                            <div>
                              <strong style={{ display: "block" }}>AP</strong>
                              <span style={{ fontSize: "10px", color: "#64748b" }}>All Meals (+₹1400)</span>
                            </div>
                          </label>

                        </div>
                      </div>

                      {/* Book Button */}
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button 
                          onClick={() => navigateToBooking(room.type, finalPrice, currentMeal.planName)}
                          style={{ background: "#0284c7", color: "white", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)" }}
                        >
                          Book {room.type} ({currentMeal.planName.split(" ")[0]})
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div style={{ background: "#f1f5f9", padding: "24px", borderRadius: "18px", border: "1px solid #cbd5e1" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "900", color: "#0f172a", marginBottom: "10px" }}>Important Terms & Policies</h4>
              <ol style={{ fontSize: "12px", color: "#475569", margin: 0, paddingLeft: "18px", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "6px" }}>
                <li>Government regulations require all guests to present a valid photo ID upon check-in.</li>
                <li>Standard Check-in time is 12:00 PM and Check-out time is 11:00 AM.</li>
                <li>Outside food, alcohol, and non-veg items are strictly prohibited inside the rooms.</li>
                <li>Mountain weather can sometimes cause intermittent power fluctuations; backup generators are provided.</li>
                <li>All bookings and disputes are subject to Dehradun (Uttarakhand) jurisdiction.</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div style={{ position: "sticky", top: "20px" }}>
            <div style={{ background: "white", padding: "28px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: "11px", color: "#0284c7", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>Best Price Guarantee</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "6px 0 14px 0" }}>
                <span style={{ fontSize: "30px", fontWeight: "900", color: "#0f172a" }}>₹{hotel.rooms?.[0]?.basePrice || 1799}</span>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>+ taxes / night</span>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "12px", borderRadius: "10px", fontSize: "12px", color: "#166534", fontWeight: "700", marginBottom: "18px" }}>
                🎉 Instant Confirmation & Free Cancellation.
              </div>
              <button 
                onClick={() => navigateToBooking(hotel.rooms?.[0]?.type || "Standard Room", hotel.rooms?.[0]?.basePrice || 1799, "EP (Room Only)")}
                style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #0369a1)", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "900", fontSize: "14px", cursor: "pointer", boxShadow: "0 6px 18px rgba(2, 132, 199, 0.35)", marginBottom: "16px" }}
              >
                PROCEED TO BOOK
              </button>
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px", fontSize: "12px", color: "#64748b", textAlign: "center", fontWeight: "600" }}>
                📞 24/7 Dedicated Mountain Support
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

const amenityBox = {
  background: "#f8fafc",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0"
};

const mealPlanLabelStyle = (isSelected) => ({
  background: isSelected ? "#e0f2fe" : "#ffffff",
  border: isSelected ? "2px solid #0284c7" : "1px solid #cbd5e1",
  padding: "8px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "12px",
  transition: "all 0.2s ease"
});