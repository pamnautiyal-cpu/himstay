import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { destinationData } from "../data"; 

export default function DetailsPage() {
  const { category, id } = useParams();
  const [showModal, setShowModal] = useState(false);
  
  // ✅ बुकिंग इनपुट के लिए स्टेट
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  
  const data = destinationData[id];

  // ✅ बुकिंग सेव करने वाला फंक्शन
  const handleConfirmBooking = () => {
    if (!bookingName || !bookingDate) {
      alert("Please fill in your details!");
      return;
    }

    const newBooking = { id, name: bookingName, date: bookingDate, category };
    
    // पुराना डेटा लें और नया जोड़ें
    const existingTrips = JSON.parse(localStorage.getItem("myTrips") || "[]");
    localStorage.setItem("myTrips", JSON.stringify([...existingTrips, newBooking]));

    alert(`Booking Confirmed for ${id}!`);
    setShowModal(false);
  };

  if (!data) return <div>Destination not found!</div>;

  return (
    <div className="details-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>{data.name}</h1>
      <p><strong>Category:</strong> {category.toUpperCase()}</p>
      <p>{data.description}</p>

      {/* इकोसिस्टम (Nearby Items) */}
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

      {/* बुकिंग सेक्शन */}
      <div className="booking-box" style={{ border: "1px solid #006ce4", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
        <h3>Ready to book your {id} experience?</h3>
        <button className="view-btn" onClick={() => setShowModal(true)}>Book Now</button>
      </div>

      {/* बुकिंग Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2>Booking for {id}</h2>
            <input 
              type="text" placeholder="Your Name" style={inputStyle} 
              value={bookingName} onChange={(e) => setBookingName(e.target.value)} 
            />
            <input 
              type="date" style={inputStyle} 
              value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} 
            />
            <div style={{ marginTop: "20px" }}>
              <button className="view-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
              <button onClick={() => setShowModal(false)} style={{ marginLeft: "10px", padding: "10px", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "320px", textAlign: "center", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" };
const inputStyle = { width: "90%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px" };