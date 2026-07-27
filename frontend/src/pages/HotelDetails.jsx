import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", description: "Luxury stay at Gangotri with traditional architecture and modern comfort.", images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed", "Attached Bath", "TV"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Extra Bed", "TV", "Hot Water"] }] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", description: "Cozy home-like stay offering genuine pahadi hospitality and warmth.", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed", "TV"] }] },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range", description: "Best hygiene stay with scenic valley views and quiet ambiance.", images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Attached Bath", "Hygienic"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Extra Space", "TV"] }] },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose", description: "Modern comfort right in town with high-speed connectivity.", images: ["https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Modern Bed", "WiFi"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Luxury Suite", "TV"] }] },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd", description: "Nestled in nature's lap, perfect for meditation and peaceful holidays.", images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed", "Nature View"] }] },
    "local_06": { name: "Himalayan Abode", location: "Main Market", description: "Premium market stay with easy access to local attractions.", images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, inclusions: ["Market View", "TV"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Premium Bed", "Attached Bath"] }] },
    "local_07": { name: "Riverside Retreat", location: "Bhagirathi Bank", description: "Stunning river view retreat by the holy Bhagirathi river stream.", images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["River View", "TV"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Balcony", "Hot Water"] }] },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge", description: "Scenic view overlooking the mountains and holy water streams.", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Scenic View", "TV"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Mountain View", "Attached Bath"] }] },
    "local_09": { name: "Green Valley Homestay", location: "Village Road", description: "Simple, clean stay surrounded by lush green mountain vegetation.", images: ["https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Double Bed"] }] },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town", description: "Authentic old town experience with traditional mountain culture.", images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Traditional Bed"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Spacious", "TV"] }] },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd", description: "Breathtaking peak views with crisp Himalayan morning breeze.", images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Peak View", "TV"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Wide View", "Attached Bath"] }] },
    "local_12": { name: "Peaceful Stay", location: "Valley View", description: "Ultra-peaceful environment away from city noise.", images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Peaceful Env"] }] },
    "local_13": { name: "Char Dham Camp", location: "Near Highway", description: "Adventurous camp-style stay equipped with comfortable bedding.", images: ["https://images.unsplash.com/photo-1559957335-5178652d87e0?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, inclusions: ["Adventure Bed"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Large Camp", "Attached Bath"] }] },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road", description: "Wake up to stunning sunrise views over the Garhwal ridges.", images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Sunrise View", "TV"] }] },
    "local_15": { name: "Nature's Nest", location: "Orchard Side", description: "Tranquil retreat located right beside apple and fruit orchards.", images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"], rooms: [{ type: "2 Bedroom Set", price: 2200, inclusions: ["Orchard View"] }, { type: "3 Bedroom Set", price: 2800, inclusions: ["Luxury Bed", "TV"] }] },
    "local_16": { name: "Skyline Hotel", location: "City Center", description: "Convenient city center location with premium hospitality.", images: ["https://images.unsplash.com/photo-1501758888041-af3ef285b470?w=800"], rooms: [{ type: "3 Bedroom Set", price: 2800, inclusions: ["City View", "TV"] }, { type: "4 Bedroom Set", price: 3200, inclusions: ["Grand Bed", "Attached Bath"] }] }
  };

  useEffect(() => {
    if (localHotels[id]) setHotel(localHotels[id]);
    else if (id && id.length === 24) {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.error("Error:", err));
    }
  }, [id]);

  const handlePayment = async (amount) => {
    if (!hotel) return;
    try {
      const { data: orderData } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, { amount });
      const options = {
        key: "rzp_test_RxW3zOEiOiGN69",
        amount: orderData.amount,
        currency: "INR",
        name: "The Himalayans",
        description: `Booking ${hotel.name}`,
        order_id: orderData.id,
        handler: async (response) => {
          const res = await axios.post(`${BACKEND_URL}/api/payment/verify`, response);
          if (res.data.success) { alert("🎉 Booking Confirmed!"); navigate("/mytrips"); }
        },
        theme: { color: "#0284c7" }
      };
      new window.Razorpay(options).open();
    } catch (err) { alert("Payment error, please try again."); }
  };

  if (!hotel) return <div style={{ textAlign: "center", padding: "100px", fontSize: "18px", color: "#64748b" }}>🏔️ Loading Details...</div>;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#f8fafc", color: "#0f172a", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* Back Button Container */}
      <div style={{ maxWidth: "1100px", margin: "20px auto", padding: "0 20px" }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: "none", border: "none", color: "#0284c7", fontWeight: "700", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}
        >
          ← Back to Stays
        </button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Title & Location Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "15px", marginBottom: "20px" }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              📍 {hotel.location}
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "6px 0 0 0" }}>
              {hotel.name}
            </h1>
          </div>
          <div style={{ background: "#0f172a", color: "white", padding: "8px 16px", borderRadius: "8px", fontWeight: "800", fontSize: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
            ⭐ 4.8 <span style={{ fontSize: "11px", fontWeight: "400", color: "#cbd5e1" }}>(Verified)</span>
          </div>
        </div>

        {/* Featured Image */}
        <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
          <img 
            src={hotel.images[0]} 
            alt={hotel.name} 
            style={{ width: "100%", height: "400px", objectFit: "cover" }} 
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"; }}
          />
        </div>

        {/* Description & Facilities Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "30px" }}>
          <div style={{ background: "white", padding: "24px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "10px", color: "#0f172a" }}>About the Stay</h3>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{hotel.description}</p>
          </div>

          <div style={{ background: "white", padding: "24px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "10px", color: "#0f172a" }}>Property Highlights</h3>
            <p style={{ fontSize: "13px", color: "#334155", lineHeight: "1.6", margin: "0 0 10px 0" }}>
              <strong>Facilities:</strong> Food, Parking, Drinking Water, Hot Water, CCTV, Attached Toilet.
            </p>
            <p style={{ fontSize: "13px", color: "#334155", margin: 0 }}>
              <strong>Check-in:</strong> 12:00 PM | <strong>Check-Out:</strong> 11:00 AM
            </p>
          </div>
        </div>

        {/* Rooms Selection Section */}
        <div style={{ background: "white", borderRadius: "16px", padding: "30px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "20px", color: "#0f172a" }}>Select Your Room</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {hotel.rooms?.map((room, index) => (
              <div 
                key={index} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  flexWrap: "wrap", 
                  gap: "20px", 
                  background: "#f8fafc", 
                  padding: "20px", 
                  borderRadius: "12px", 
                  border: "1px solid #e2e8f0" 
                }}
              >
                <div>
                  <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#1e293b", margin: "0 0 6px 0" }}>{room.type}</h4>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {room.inclusions?.map((inc, i) => (
                      <span key={i} style={{ background: "#e0f2fe", color: "#0369a1", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "600" }}>
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Price per night</span>
                    <span style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>₹{room.price}</span>
                  </div>
                  <button 
                    onClick={() => handlePayment(room.price)} 
                    style={{ 
                      background: "#0284c7", color: "#fff", padding: "12px 24px", 
                      border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)", transition: "transform 0.2s" 
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions (Embedded & Clean Accordion Style) */}
        <div style={{ background: "#f1f5f9", borderRadius: "16px", padding: "30px", border: "1px solid #cbd5e1" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "14px" }}>Terms & Conditions</h3>
          <ol style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <li>According to government rules, all guests must bring a valid government ID proof at the time of check-in. Guests are not allowed under the age of 18.</li>
            <li>Guest cannot bring any illegal things at the accommodation.</li>
            <li>Room capacity limit is strictly followed.</li>
            <li>Check-in: 12:00 PM, Check-out: 11:00 AM. No early check-in/late check-out allowed.</li>
            <li>Pay at check-in guests must arrive before 3:00 PM.</li>
            <li>Certain religious properties only for specific Yatris.</li>
            <li>Selected properties have no refund policy.</li>
            <li>Food choices are limited; fixed North Indian vegetarian meals.</li>
            <li>Basic facilities only; be prepared for power outages.</li>
            <li>No refunds for natural disasters, weather, or travel issues.</li>
            <li>Management is not responsible for loss/theft of items.</li>
            <li>No pets, outside food, alcohol, or non-veg allowed.</li>
            <li><strong>Security:</strong> Management is not liable for theft of cash/valuables.</li>
            <li><strong>Conduct:</strong> Misbehavior leads to immediate eviction without refund.</li>
            <li><strong>Data Privacy:</strong> Info used only for booking.</li>
            <li><strong>Technical Errors:</strong> Management can modify/cancel bookings due to errors.</li>
            <li>Any dispute subject to Dehradun (Uttarakhand) jurisdiction.</li>
          </ol>
        </div>

      </div>
    </div>
  );
}