import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  // आपके सभी 16 लोकल होटल्स का ऑरिजिनल डेटा (Professional Room Formatting के साथ)
  const localHotels = {
    "local_01": { 
      name: "Hotel Nagraja Palace", 
      location: "Gangotri Hwy", 
      description: "Luxury stay at Gangotri with traditional architecture and modern comfort.", 
      images: ["/images/hotals/Hotel Nagraja Palace1.jpg", "/images/hotals/Hotel Nagraja Palace2.jpg", "/images/hotals/Hotel Nagraja Palace3.jpg"], 
      rooms: [
        { type: "Deluxe Room (1 Queen Bed)", price: 2200, inclusions: ["1 Double Bed", "Max 2 Adults", "Attached Bath", "TV"] }, 
        { type: "Super Deluxe Room (1 Double + Extra Bed)", price: 2800, inclusions: ["1 Double Bed + Extra Mattress", "Max 3 Guests", "Hot Water", "TV"] }
      ] 
    },
    "local_02": { 
      name: "Grandparents Homestay", 
      location: "NH 34, Matli", 
      description: "Cozy home-like stay offering genuine pahadi hospitality and warmth.", 
      images: ["/images/hotals/Grandparents Homestay1.jpg", "/images/hotals/Grandparents Homestay2.jpg", "/images/hotals/Grandparents Homestay3.jpg"], 
      rooms: [
        { type: "Deluxe Room (1 Queen Bed)", price: 2200, inclusions: ["1 Double Bed", "Max 2 Adults", "TV", "Mountain View"] }
      ] 
    },
    "local_03": { 
      name: "Hotel Prisha Pahal", 
      location: "Barahat Range", 
      description: "Best hygiene stay with scenic valley views and quiet ambiance.", 
      images: ["/images/hotals/Hotel Prisha Pahal1.jpg", "/images/hotals/Hotel Prisha Pahal2.jpg", "/images/hotals/Hotel Prisha Pahal3.jpg"], 
      rooms: [
        { type: "Deluxe Room (1 Queen Bed)", price: 2200, inclusions: ["Attached Bath", "Hygienic", "Max 2 Adults"] }, 
        { type: "Super Deluxe Room", price: 2800, inclusions: ["Extra Space", "TV", "Valley View"] }
      ] 
    },
    "local_04": { 
      name: "Hotel K.P Residency", 
      location: "Near Medicose", 
      description: "Modern comfort right in town with high-speed connectivity.", 
      images: ["/images/hotals/Hotel K.P Residency1.jpg", "/images/hotals/Hotel K.P Residency2.jpg", "/images/hotals/Hotel K.P Residency3.jpg"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["Modern Bed", "WiFi", "Max 2 Adults"] }, 
        { type: "Family Suite (2 Double Beds)", price: 3200, inclusions: ["Luxury Suite", "TV", "Max 4 Guests"] }
      ] 
    },
    "local_05": { 
      name: "Dhruvnanda Homestay", 
      location: "ITBP Rd", 
      description: "Nestled in nature's lap, perfect for meditation and peaceful holidays.", 
      images: ["/images/hotals/Dhruvnanda Homestay1.jpg", "/images/hotals/Dhruvnanda Homestay2.jpg", "/images/hotals/Dhruvnanda Homestay3.jpg"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["1 Double Bed", "Nature View", "Max 2 Adults"] }
      ] 
    },
    "local_06": { 
      name: "Himalayan Abode", 
      location: "Main Market", 
      description: "Premium market stay with easy access to local attractions.", 
      images: ["/images/hotals/Himalayan Abode home stay.jpg", "/images/hotals/Hotel Nagraja Palace2.jpg", "/images/hotals/Hotel Nagraja Palace3.jpg"], 
      rooms: [
        { type: "Super Deluxe Room", price: 2800, inclusions: ["Market View", "TV", "Max 3 Guests"] }, 
        { type: "Family Suite", price: 3200, inclusions: ["2 Double Beds", "Attached Bath", "Max 4 Guests"] }
      ] 
    },
    "local_07": { 
      name: "Riverside Retreat", 
      location: "Bhagirathi Bank", 
      description: "Stunning river view retreat by the holy Bhagirathi river stream.", 
      images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["River View", "TV", "Max 2 Adults"] }, 
        { type: "Super Deluxe Room", price: 2800, inclusions: ["Balcony", "Hot Water", "Max 3 Guests"] }
      ] 
    },
    "local_08": { 
      name: "Gangotri View Inn", 
      location: "Gangori Bridge", 
      description: "Scenic view overlooking the mountains and holy water streams.", 
      images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["Scenic View", "TV", "Max 2 Adults"] }, 
        { type: "Super Deluxe Room", price: 2800, inclusions: ["Mountain View", "Attached Bath", "Max 3 Guests"] }
      ] 
    },
    "local_09": { 
      name: "Green Valley Homestay", 
      location: "Village Road", 
      description: "Simple, clean stay surrounded by lush green mountain vegetation.", 
      images: ["https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["1 Double Bed", "Max 2 Adults"] }
      ] 
    },
    "local_10": { 
      name: "Uttarkashi Guest House", 
      location: "Old Town", 
      description: "Authentic old town experience with traditional mountain culture.", 
      images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["Traditional Bed", "Max 2 Adults"] }, 
        { type: "Super Deluxe Room", price: 2800, inclusions: ["Spacious", "TV", "Max 3 Guests"] }
      ] 
    },
    "local_11": { 
      name: "Mountain Peak Hotel", 
      location: "Dunda Main Rd", 
      description: "Breathtaking peak views with crisp Himalayan morning breeze.", 
      images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["Peak View", "TV", "Max 2 Adults"] }, 
        { type: "Family Suite", price: 3200, inclusions: ["Wide View", "Attached Bath", "Max 4 Guests"] }
      ] 
    },
    "local_12": { 
      name: "Peaceful Stay", 
      location: "Valley View", 
      description: "Ultra-peaceful environment away from city noise.", 
      images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["Peaceful Env", "Max 2 Adults"] }
      ] 
    },
    "local_13": { 
      name: "Char Dham Camp", 
      location: "Near Highway", 
      description: "Adventurous camp-style stay equipped with comfortable bedding.", 
      images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Super Deluxe Room", price: 2800, inclusions: ["Adventure Bed", "Max 3 Guests"] }, 
        { type: "Family Suite", price: 3200, inclusions: ["Large Camp", "Attached Bath", "Max 4 Guests"] }
      ] 
    },
    "local_14": { 
      name: "Sunrise Residency", 
      location: "Tiloth Road", 
      description: "Wake up to stunning sunrise views over the Garhwal ridges.", 
      images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["Sunrise View", "TV", "Max 2 Adults"] }
      ] 
    },
    "local_15": { 
      name: "Nature's Nest", 
      location: "Orchard Side", 
      description: "Tranquil retreat located right beside apple and fruit orchards.", 
      images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Deluxe Room", price: 2200, inclusions: ["Orchard View", "Max 2 Adults"] }, 
        { type: "Super Deluxe Room", price: 2800, inclusions: ["Luxury Bed", "TV", "Max 3 Guests"] }
      ] 
    },
    "local_16": { 
      name: "Skyline Hotel", 
      location: "City Center", 
      description: "Convenient city center location with premium hospitality.", 
      images: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], 
      rooms: [
        { type: "Super Deluxe Room", price: 2800, inclusions: ["City View", "TV", "Max 3 Guests"] }, 
        { type: "Family Suite", price: 3200, inclusions: ["Grand Bed", "Attached Bath", "Max 4 Guests"] }
      ] 
    }
  };

  useEffect(() => {
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else if (id) {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => {
          const data = res.data;
          setHotel({
            ...data,
            location: data.city ? `${data.city}, ${data.state || ""}` : (data.location || "Uttarakhand"),
            images: data.images && data.images.length > 0 ? data.images : ["/images/hotals/Hotel Nagraja Palace1.jpg"],
            rooms: data.rooms || [
              { 
                type: "Deluxe Room (1 Queen Bed)", 
                price: data.price || 2200, 
                inclusions: [data.roomView || "Himalayan View", "1 Double Bed", "Attached Bath"] 
              }
            ]
          });
        })
        .catch((err) => {
          console.error("Error fetching property details:", err);
          setHotel(localHotels["local_01"]);
        });
    } else {
      setHotel(localHotels["local_01"]);
    }
  }, [id]);

  const navigateToBooking = () => {
    const targetId = id || "local_01";
    navigate(`/booking/${targetId}`);
  };

  if (!hotel) return <div style={{ textAlign: "center", padding: "100px", fontSize: "18px", color: "#64748b" }}>🏔️ Loading Details...</div>;

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
        
        {/* Photo Gallery Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", borderRadius: "16px", overflow: "hidden", marginBottom: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", height: "380px" }}>
          <div>
            <img 
              src={mainImg} 
              alt={hotel.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace1.jpg"; }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%" }}>
            <img 
              src={subImg1} 
              alt="preview 1" 
              style={{ width: "100%", height: "calc(50% - 6px)", objectFit: "cover" }} 
              onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace2.jpg"; }}
            />
            <img 
              src={subImg2} 
              alt="preview 2" 
              style={{ width: "100%", height: "calc(50% - 6px)", objectFit: "cover" }} 
              onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palace3.jpg"; }}
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "30px", alignItems: "flex-start" }}>
          
          {/* Left Column */}
          <div>
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>📍 {hotel.location}</span>
                  <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "6px 0 8px 0" }}>{hotel.name}</h1>
                  <p style={{ fontSize: "13px", color: "#16a34a", fontWeight: "600", margin: 0 }}>✓ Verified Himalayan Stay • Couple Friendly</p>
                </div>
                <div style={{ background: "#0284c7", color: "white", padding: "6px 12px", borderRadius: "8px", fontWeight: "800", fontSize: "14px", textAlign: "center" }}>
                  ⭐ 4.8 <span style={{ fontSize: "10px", fontWeight: "400", display: "block" }}>Excellent</span>
                </div>
              </div>
            </div>

            <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>About Property</h3>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{hotel.description || "No description provided."}</p>
            </div>

            <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "15px" }}>Top Amenities</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", fontSize: "13px", color: "#334155", fontWeight: "600" }}>
                <div style={amenityBox}>🅿️ Free Parking</div>
                <div style={amenityBox}>🍽️ Restaurant Inside</div>
                <div style={amenityBox}>📶 High-speed Wi-Fi</div>
                <div style={amenityBox}>🚿 24/7 Hot Water</div>
                <div style={amenityBox}>🛡️ CCTV Security</div>
                <div style={amenityBox}>🚽 Attached Toilet</div>
              </div>
            </div>

            {/* Select Your Room Section */}
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Select Your Room & Plan</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {hotel.rooms?.map((room, index) => (
                  <div key={index} style={{ border: "1px solid #cbd5e1", borderRadius: "12px", padding: "18px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
                    <div>
                      <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" }}>{room.type}</h4>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                        {room.inclusions?.map((inc, i) => (
                          <span key={i} style={{ background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
                            ✓ {inc}
                          </span>
                        ))}
                      </div>
                      <span style={{ background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700" }}>
                        Free Cancellation Available
                      </span>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "20px" }}>
                      <div>
                        <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Per Night</span>
                        <span style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a" }}>₹{room.price}</span>
                      </div>
                      <button 
                        onClick={navigateToBooking}
                        style={{ background: "#0284c7", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer", boxShadow: "0 2px 6px rgba(2, 132, 199, 0.3)" }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div style={{ background: "#f1f5f9", padding: "20px", borderRadius: "14px", border: "1px solid #cbd5e1" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Terms & Conditions</h4>
              <ol style={{ fontSize: "12px", color: "#475569", margin: 0, paddingLeft: "18px", lineHeight: "1.5", display: "flex", flexDirection: "column", gap: "4px" }}>
                <li>According to government rules, all guests must bring a valid government ID proof at check-in.</li>
                <li>Check-in: 12:00 PM | Check-out: 11:00 AM.</li>
                <li>No outside food, alcohol, or non-veg allowed inside rooms.</li>
                <li>Basic facilities only; be prepared for power outages in mountain regions.</li>
                <li>Any dispute subject to Dehradun (Uttarakhand) jurisdiction.</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div style={{ position: "sticky", top: "20px" }}>
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Best Price Guarantee</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "4px 0 12px 0" }}>
                <span style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a" }}>₹{hotel.rooms?.[0]?.price || 2200}</span>
                <span style={{ fontSize: "12px", color: "#64748b" }}>+ taxes / night</span>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px", borderRadius: "8px", fontSize: "12px", color: "#166534", fontWeight: "600", marginBottom: "16px" }}>
                🎉 Instant Confirmation & Free Cancellation.
              </div>
              <button 
                onClick={navigateToBooking}
                style={{ width: "100%", background: "#0284c7", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)", marginBottom: "14px" }}
              >
                PROCEED TO BOOK
              </button>
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", fontSize: "12px", color: "#64748b", textAlign: "center" }}>
                📞 24/7 Mountain Support Available
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
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0"
};