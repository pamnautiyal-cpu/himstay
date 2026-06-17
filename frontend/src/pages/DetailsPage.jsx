import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Firebase के लिए
import { db } from "../firebase"; // सुनिश्चित करें कि path सही है
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function DetailsPage() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  // Firebase से डेटा फेच करने का लॉजिक
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching from Firebase:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleConfirmBooking = async () => {
    if (!bookingName || !bookingDate) {
      alert("Please fill in your details!");
      return;
    }
    // Firebase में price फील्ड के अनुसार कैलकुलेशन
    const price = data.price ? parseInt(data.price) : 500;
    
    try {
      const { data: orderData } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, { amount: price });
      const options = {
        key: "rzp_test_RxW3zOEiOiGN69",
        amount: orderData.amount,
        currency: "INR",
        name: "The Himalayans",
        description: `Booking for ${data.name}`,
        order_id: orderData.id,
        handler: async (response) => {
          const res = await axios.post(`${BACKEND_URL}/api/payment/verify`, response);
          if (res.data.success) {
            const existingTrips = JSON.parse(localStorage.getItem("myTrips") || "[]");
            const finalBooking = { id, name: bookingName, date: bookingDate, category, amount: price, status: "Confirmed" };
            localStorage.setItem("myTrips", JSON.stringify([...existingTrips, finalBooking]));
            alert("🎉 Booking Confirmed!");
            setShowModal(false);
            navigate("/mytrips");
          }
        },
        theme: { color: "#006ce4" }
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment setup failed.");
    }
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading details...</div>;

  if (!data) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Data Not Found</h1>
        <button className="view-btn" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="details-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>{data.name}</h1>
      <p><strong>Category:</strong> {category.toUpperCase()}</p>
      <img src={data.image} alt={data.name} style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }} />
      <p>{data.description}</p>
      <p><strong>Location:</strong> {data.location}</p>
      <p><strong>Price:</strong> ₹{data.price} / night</p>

      <div className="booking-box" style={{ border: "1px solid #006ce4", padding: "20px", borderRadius: "8px", textAlign: "center", marginTop: "30px" }}>
        <h3>Ready to book your stay?</h3>
        <button className="view-btn" onClick={() => setShowModal(true)}>Book Now</button>
      </div>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2>Booking for {data.name}</h2>
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

// Styles वही पुरानी हैं
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "320px", textAlign: "center", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" };
const inputStyle = { width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px" };