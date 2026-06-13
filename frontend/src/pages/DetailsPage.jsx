import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destinationData } from "../data";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function DetailsPage() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  
  const data = destinationData[id];

  // ✅ Backend API के ज़रिए पेमेंट और बुकिंग का Final लॉजिक
  const handleConfirmBooking = async () => {
    if (!bookingName || !bookingDate) {
      alert("Please fill in your details!");
      return;
    }

    const price = data.hotels?.length > 0 ? parseInt(data.hotels[0].price.replace(/,/g, "")) : 500;
    
    try {
      // 1. Backend से Order ID जनरेट करें
      const { data: orderData } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, { amount: price });

      // 2. Razorpay Options
      const options = {
        key: "rzp_test_RxW3zOEiOiGN69", // आपकी वर्किंग Key
        amount: orderData.amount,
        currency: "INR",
        name: "The Himalayans",
        description: `Booking for ${id}`,
        order_id: orderData.id,
        handler: async (response) => {
          // 3. पेमेंट वेरीफाई करें
          const res = await axios.post(`${BACKEND_URL}/api/payment/verify`, response);
          if (res.data.success) {
            // 4. लोकल स्टोरेज में डेटा सेव करें (Old data safe रहेगा)
            const existingTrips = JSON.parse(localStorage.getItem("myTrips") || "[]");
            const finalBooking = { 
              id, 
              name: bookingName, 
              date: bookingDate, 
              category, 
              amount: price, 
              status: "Confirmed",
              paymentId: response.razorpay_payment_id 
            };
            localStorage.setItem("myTrips", JSON.stringify([...existingTrips, finalBooking]));
            
            alert("🎉 Booking Confirmed!");
            setShowModal(false);
            navigate("/mytrips"); // MyTrips पर भेजें
          }
        },
        theme: { color: "#006ce4" }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment setup failed. Please check server.");
    }
  };

  if (!data) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>{id}</h1>
        <p>Information coming soon!</p>
        <button className="view-btn" onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="details-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>{data.name}</h1>
      <p><strong>Category:</strong> {category.toUpperCase()}</p>
      <p>{data.description}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", margin: "30px 0" }}>
        <div className="info-box" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h3>Nearby Hotels</h3>
          {data.hotels.map((h, i) => <p key={i}>• {h.name} - ₹{h.price}</p>)}
        </div>
        <div className="info-box" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h3>Yoga & Wellness</h3>
          {data.yoga.length > 0 ? data.yoga.map((y, i) => <p key={i}>• {y.name}</p>) : <p>No specific centers listed.</p>}
        </div>
        <div className="info-box" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h3>Popular Treks</h3>
          {data.treks.map((t, i) => <p key={i}>• {t.name} ({t.difficulty})</p>)}
        </div>
      </div>

      <div className="booking-box" style={{ border: "1px solid #006ce4", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
        <h3>Ready to book your {id} experience?</h3>
        <button className="view-btn" onClick={() => setShowModal(true)}>Book Now</button>
      </div>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2>Booking for {id}</h2>
            <input type="text" placeholder="Your Name" style={inputStyle} value={bookingName} onChange={(e) => setBookingName(e.target.value)} />
            <input type="date" style={inputStyle} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            <div style={{ marginTop: "20px" }}>
              <button className="view-btn" onClick={handleConfirmBooking}>Pay Now</button>
              <button onClick={() => setShowModal(false)} style={{ marginLeft: "10px", padding: "10px", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "320px", textAlign: "center", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" };
const inputStyle = { width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px" };