import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
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

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchListing();
  }, [id]);

  const handleConfirmBooking = async () => {
    if (!bookingName || !bookingDate) { alert("Fill details!"); return; }
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
            localStorage.setItem("myTrips", JSON.stringify([...existingTrips, { id, name: bookingName, date: bookingDate, amount: price, status: "Confirmed" }]));
            alert("🎉 Booking Confirmed!");
            setShowModal(false);
            navigate("/mytrips");
          }
        }
      };
      new window.Razorpay(options).open();
    } catch (err) { alert("Payment failed."); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="details-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer" }}>← Back</button>
      <h1>{data?.name}</h1>
      <p>📍 {data?.location}</p>
      <img src={data?.image} alt={data?.name} style={{ width: "100%", borderRadius: "12px", height: "400px", objectFit: "cover" }} />
      
      <p style={{ marginTop: "20px" }}>{data?.description}</p>

      {/* Facilities & Check-in */}
      <div style={{ border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px", margin: "20px 0", display: "flex", gap: "40px" }}>
        <div><h3>Facilities:</h3><p>{data?.facilities || "Food, Parking, CCTV"}</p></div>
        <div><h3>Check-in:</h3><p>12:00 PM | Check-Out: 11:00 AM</p></div>
      </div>

      {/* DYNAMIC ROOM TYPES */}
      <div style={{ margin: "30px 0" }}>
        <h3>Hotel Rooms</h3>
        {data?.rooms && data.rooms.length > 0 ? (
          data.rooms.map((room, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderBottom: "1px solid #eee" }}>
              <span><strong>{room.type}</strong></span>
              <span>₹{room.price}</span>
              <button onClick={() => setShowModal(true)} style={{ background: "#f97316", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Book Now</button>
            </div>
          ))
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderBottom: "1px solid #eee" }}>
            <span><strong>Base Room</strong></span>
            <span>₹{data?.price}</span>
            <button onClick={() => setShowModal(true)} style={{ background: "#f97316", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Book Now</button>
          </div>
        )}
      </div>

      {/* TERMS & CONDITIONS */}
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", fontSize: "0.85rem", color: "#64748b", marginTop: "30px" }}>
        <h3>Terms & Conditions</h3>
        <p>{data?.terms || "1. Guests must carry valid ID proof. 2. Management is not liable for theft. 3. Food choices are limited."}</p>
      </div>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2>Booking for {data?.name}</h2>
            <input type="text" placeholder="Your Name" style={inputStyle} value={bookingName} onChange={(e) => setBookingName(e.target.value)} />
            <input type="date" style={inputStyle} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            <button onClick={handleConfirmBooking} style={btnStyle}>Pay Now</button>
            <button onClick={() => setShowModal(false)} style={{ marginLeft: "10px" }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "320px", textAlign: "center" };
const inputStyle = { width: "90%", padding: "10px", margin: "10px 0" };
const btnStyle = { padding: "10px 20px", background: "#006ce4", color: "white", border: "none", cursor: "pointer" };