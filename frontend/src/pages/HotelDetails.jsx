import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  const localHotels = {
    local_nagraja_01: {
      name: "Hotel Nagraja Palace",
      city: "Matli, Uttarkashi",
      location: "Gangotri National Highway, Matli, Uttarakhand 249193",
      price: 3500,
      rating: 4.8,
      reviews: 19,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500"
      ],
      amenities: ["Free Wi-Fi", "Gangotri Highway View", "Hot Water / Geyser", "Free Parking", "Restaurant", "Power Backup"],
      description: "Located right on the scenic Gangotri National Highway in Matli, Hotel Nagraja Palace offers a blend of luxury and natural beauty. Perfect stopover for Char Dham pilgrims and leisure travelers looking for premium comfort with stunning river views."
    },
    local_grandparents_02: {
      name: "Grandparents Homestay",
      city: "Matli, Uttarkashi",
      location: "1, NH 34, Matli, Barahat Range, Uttarakhand 249193",
      price: 1800,
      rating: 4.6,
      reviews: 61,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500"
      ],
      amenities: ["Free Wi-Fi", "Home Cooked Food", "Mountain View", "Terrace Sitting", "Local Guides", "Pet Friendly"],
      description: "Experience genuine Garhwali hospitality at Grandparents Homestay in Matli. Run by a welcoming local family, this cozy retreat offers clean rooms, organic home-cooked meals, and a peaceful environment overlooking the Barahat Mountain Range."
    },
    local_prisha_03: {
      name: "Hotel Prisha Pahal Home Stay",
      city: "Matli, Uttarkashi",
      location: "Prisha Pahal Home Stay, NH 34, Matli, Barahat Range, Uttarakhand 249193",
      price: 2200,
      rating: 4.9,
      reviews: 360,
      images: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
        "https://images.unsplash.com/photo-1463620910506-d0458a43143e?w=500",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500"
      ],
      amenities: ["Super Fast Wi-Fi", "Valley View Balcony", "Attached Modern Bathroom", "CCTV Security", "Tea/Coffee Maker", "24h Front Desk"],
      description: "Prisha Pahal Home Stay is highly rated by hundreds of travelers for its spotless hygiene and premium family suites. Nestled quietly near the hills of Matli, it features spacious balconies that give an unobstructed view of the majestic valley."
    },
    local_kp_04: {
      name: "Hotel K.P Residency",
      city: "Matli, Uttarkashi",
      location: "Near Gangotri Medicose, Matli, Barahat Range, Uttarakhand 249193",
      price: 2800,
      rating: 4.6,
      reviews: 117,
      images: [
        "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500"
      ],
      amenities: ["Free Wi-Fi", "Air Conditioning", "In-Room Dining", "Flat-screen TV", "Doctor on Call", "Taxi Service Available"],
      description: "Conveniently positioned near key local services and medical facilities in Matli, Hotel K.P Residency is built for absolute comfort. Offering modern amenities, wide parking spaces, and an in-house kitchen serving hot North Indian delicacies."
    },
    local_dhruvnanda_05: {
      name: "Dhruvnanda Homestay",
      city: "Matli, Athali, Uttarkashi",
      location: "ITBP Rd, Matli, Athali, Uttarakhand 249193",
      price: 1500,
      rating: 4.6,
      reviews: 46,
      images: [
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500"
      ],
      amenities: ["Pocket Wi-Fi", "River Stream Access", "Apple Orchard View", "Bonfire Space", "Kitchen Access", "Budget Friendly"],
      description: "Dhruvnanda Homestay on ITBP Road is a hidden treasure for nature lovers and backpackers. Located close to a rushing river stream and surrounded by local fruit orchards, it offers rustic wooden interiors and an amazing outdoor bonfire setup."
    }
  };

  useEffect(() => {
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else {
      fetch(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => res.json())
        .then((data) => setHotel(data))
        .catch((err) => console.error("Error fetching hotel details:", err));
    }
    window.scrollTo(0, 0);
  }, [id]);

  // 💳 🆕 RAZORPAY LIVE INTEGRATION ENGINE
  const handlePayment = async (amountToPay) => {
    try {
      // 1. बैकएंड से ऑर्डर आईडी क्रिएट करना (सुरक्षित ट्रांजैक्शन के लिए)
      const orderUrl = `${BACKEND_URL}/api/payments/order`;
      const response = await axios.post(orderUrl, { amount: amountToPay });
      const { id: order_id, currency } = response.data;

      // 2. रेज़रपे पॉपअप की कॉन्फ़िगरेशन सेटिंग्स
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder_key", // तुम्हारी टेस्ट/लाइव की
        amount: amountToPay * 100, // रेज़रपे पैसे को पैसे (Paise) में गिनता है (₹1 = 100 पैसे)
        currency: currency || "INR",
        name: "The Himalayans Stays",
        description: `Booking Confirmation for ${hotel.name}`,
        image: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=100",
        order_id: order_id,
        handler: async function (response) {
          // पेमेंट सफल होने के बाद यह ब्लॉक चलेगा
          const verifyUrl = `${BACKEND_URL}/api/payments/verify`;
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            hotelId: id,
            amount: amountToPay
          };
          
          const verificationRes = await axios.post(verifyUrl, verifyData);
          if (verificationRes.data.success) {
            alert("🎉 Celebration! Booking Confirmed & Payment Received Successfully.");
            navigate("/mytrips"); // बुकिंग हिस्ट्री पेज पर भेजें
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Guest Traveler",
          email: "traveler@example.com",
          contact: "9999999999",
        },
        notes: {
          address: hotel.location,
        },
        theme: {
          color: "#0f1e36", // तुम्हारी वेबसाइट की लग्ज़री डार्क ब्लू थीम से सिंक किया गया है
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed, triggering fallback modal:", error);
      // बैकएंड पेमेंट एपीआई न होने की स्थिति में फ्रंटएंड डेमो मोड अलर्ट
      alert(`💳 Demo Gateway Triggered!\n\nHotel: ${hotel.name}\nAmount: ₹${amountToPay}\n\n(Connecting to live gateway once your Razorpay API endpoints are configured on Render backend.)`);
    }
  };

  if (!hotel) {
    return (
      <div style={{ padding: "80px", textAlign: "center", fontSize: "18px", color: "#64748b" }}>
        🏔| Loading luxury property configurations...
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "30px 20px", fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* BREADCRUMB */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: "none", border: "none", color: "#006ce4", fontWeight: "700", fontSize: "14px", cursor: "pointer", marginBottom: "15px", padding: 0 }}
        >
          ← Back to results
        </button>

        {/* TITLE BLOCK */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "15px", marginBottom: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ background: "#f59e0b", color: "#fff", fontSize: "11px", fontWeight: "bold", padding: "3px 6px", borderRadius: "4px" }}>Stay</span>
              <span style={{ color: "#f59e0b", fontSize: "14px" }}>⭐⭐⭐⭐</span>
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{hotel.name}</h1>
            <p style={{ color: "#475569", fontSize: "14px", margin: "6px 0 0 0" }}>📍 {hotel.location}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <div style={{ textAlign: "right" }}>
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Excellent</h4>
              <span style={{ fontSize: "12px", color: "#64748b" }}>{hotel.reviews} verified reviews</span>
            </div>
            <div style={{ background: "#0f1e36", color: "#fff", padding: "8px 12px", borderRadius: "6px", fontWeight: "800", fontSize: "16px" }}>
              {hotel.rating}
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "10px", height: "380px", marginBottom: "30px", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%" }}>
            <img src={hotel.images[0]} alt="Main View" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "10px", height: "100%" }}>
            <img src={hotel.images[1] || hotel.images[0]} alt="Room View 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <img src={hotel.images[2] || hotel.images[0]} alt="Room View 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* DESCRIPTION & HIGHLIGHTS */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px", marginBottom: "40px" }} className="details-grid">
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", marginTop: 0, marginBottom: "12px" }}>Property Description</h3>
            <p style={{ color: "#334155", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>{hotel.description}</p>

            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", marginTop: "30px", marginBottom: "15px" }}>Most Popular Facilities</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
              {hotel.amenities.map((amenity, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#059669", fontSize: "14px", fontWeight: "600", background: "#f0fdf4", padding: "10px 14px", borderRadius: "8px" }}>
                  <span>✓</span> {amenity}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", height: "fit-content" }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Property Highlights</h4>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5", margin: "0 0 20px 0" }}>📍 Nestled right in the heart of Uttarakhand. Highly rated for its pristine Himalayan atmosphere.</p>
            
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "15px", marginBottom: "20px" }}>
              <span style={{ fontSize: "13px", color: "#64748b" }}>Price for 1 night:</span>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#16a34a", margin: "4px 0 0 0" }}>₹{hotel.price}</h2>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Includes all verified local taxes</span>
            </div>

            <button 
              onClick={() => handlePayment(hotel.price)}
              style={{ width: "100%", padding: "14px", background: "#006ce4", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: "pointer" }}
            >
              Reserve Your Stay
            </button>
          </div>
        </div>

        {/* ROOM SELECTION TABLE */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px 0" }}>Available Rooms & Rates</h3>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#0f1e36", color: "#fff" }}>
                  <th style={thStyle}>Room Type</th>
                  <th style={thStyle}>Max Guests</th>
                  <th style={thStyle}>Price per Night</th>
                  <th style={thStyle}>Choices & Benefits</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={tdStyle}>
                    <strong style={{ color: "#0f172a", fontSize: "15px" }}>Standard Comfort Room</strong>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>1 Double Bed · Mountain View Window</div>
                  </td>
                  <td style={tdStyle}>👥 2 Adults</td>
                  <td style={tdStyle}>
                    <span style={{ color: "#16a34a", fontWeight: "700", fontSize: "16px" }}>₹{hotel.price}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ color: "#059669", fontWeight: "600", fontSize: "12px" }}>✔ Free Cancellation anytime</div>
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handlePayment(hotel.price)} style={tableBtnStyle}>Book Now</button>
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>
                    <strong style={{ color: "#0f172a", fontSize: "15px" }}>Premium Executive Family Suite</strong>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>2 King Beds · Private Balcony Set</div>
                  </td>
                  <td style={tdStyle}>👨‍👩‍👧‍👦 4 Guests</td>
                  <td style={tdStyle}>
                    <span style={{ color: "#16a34a", fontWeight: "700", fontSize: "16px" }}>₹{Math.round(hotel.price * 1.5)}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ color: "#059669", fontWeight: "600", fontSize: "12px" }}>✔ Free Breakfast Included</div>
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handlePayment(Math.round(hotel.price * 1.5))} style={tableBtnStyle}>Book Suite</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const thStyle = { padding: "12px 16px", fontWeight: "600", fontSize: "13px" };
const tdStyle = { padding: "20px 16px", verticalAlign: "top", lineHeight: "1.5" };
const tableBtnStyle = { background: "#006ce4", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "700", fontSize: "13px", cursor: "pointer" };