import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  // उत्तरकाशी और मटली केverified लोकल होटल्स का डेटाबेस
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
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500"
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

  // 💳 100% फुल-प्रूफ रेज़रपे पेमेंट ट्रिगर (बिना क्रैश होने वाला आर्किटेक्चर)
  const handlePayment = async (amountToPay) => {
    try {
      // 1. बैकएंड के '/api/payment/create-order' एंडपॉइंट से आर्डर आईडी लाना
      const orderUrl = `${BACKEND_URL}/api/payment/create-order`;
      const response = await axios.post(orderUrl, { amount: amountToPay });
      const orderData = response.data;

      if (!orderData || !orderData.id) {
        alert("Payment initialization error. Secure order token missing.");
        return;
      }

      // 2. रेज़रपे पॉपअप विंडो सेटिंग्स (फ़िक्स की हुई सरंचना)
      const options = {
        key: "rzp_test_RxW3z0Ei0iGN69", // तुम्हारी एक्टिव टेस्ट की हार्डकोडेड की
        order_id: orderData.id, // मस्ट है: इसके लोड होते ही अमाउंट अपने आप सर्वर से लॉक हो जाएगा
        name: "The Himalayans",
        description: `Booking Room at ${hotel.name}`,
        image: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=100",
        handler: async function (paymentResponse) {
          try {
            // पेमेंट सक्सेसफुल होने पर वेरिफिकेशन रूट को हिट करना
            const verifyUrl = `${BACKEND_URL}/api/payment/verify`;
            const verifyData = {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              bookingData: {
                hotelId: id,
                hotelName: hotel.name,
                amount: amountToPay,
                email: "customer@example.com",
                checkIn: "June 2026",
                checkOut: "June 2026",
                guests: 2
              }
            };
            
            const verificationRes = await axios.post(verifyUrl, verifyData);
            if (verificationRes.data.success) {
              alert("🎉 Celebration! Booking Confirmed & Securely Saved in Database.");
              navigate("/mytrips");
            } else {
              alert("Payment verification failed.");
            }
          } catch (vErr) {
            console.error("Verification connection error:", vErr);
            alert("Payment done, but server failed to verify the payload.");
          }
        },
        prefill: {
          name: "Pramod Nautiyal",
          email: "traveler@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0f1e36", // वेबसाइट मैचिंग डार्क ब्लू थीम
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open(); 
    } catch (error) {
      console.error("Payment flow failure:", error);
      alert("Oops! Something went wrong.\nPayment Failed. Connection timed out.");
    }
  };

  if (!hotel) {
    return (
      <div style={{ padding: "80px", textAlign: "center", fontSize: "18px", color: "#64748b" }}>
        🏔️ Loading luxury property configurations...
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "30px 20px", fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* BACK RESULT BUTTON */}
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
            <div style={{ background: "#0f1e36", color: "#fff", padding: "8px 12px", borderRadius: "6px", fontWeight