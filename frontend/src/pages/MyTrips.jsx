import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf"; // सुनिश्चित करें कि आपने 'npm install jspdf' किया है

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

  // ✅ अपडेटेड प्रोफेशनल ई-टिकट डाउनलोड फंक्शन
  const downloadTicket = (trip) => {
    const doc = new jsPDF();
    
    // 1. हेडर (Branding)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 108, 228); 
    doc.text("THE HIMALAYANS", 20, 20);
    
    // 2. यूनिक बुकिंग ID
    const bookingId = trip.paymentId ? trip.paymentId.slice(-8).toUpperCase() : "TH-" + Math.floor(1000 + Math.random() * 9000);
    
    // 3. टिकट बॉडी
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Date of Issue: ${new Date().toLocaleDateString()}`, 20, 50);
    doc.line(20, 60, 190, 60); // सेपरेटर लाइन

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Details:", 20, 75);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Destination: ${trip.hotelName || "Stay"}`, 20, 90);
    doc.text(`Amount Paid: ₹${trip.amount || "N/A"}`, 20, 100);
    doc.text(`Status: ${trip.status}`, 20, 110);
    doc.text(`Payment Ref: ${trip.paymentId || "N/A"}`, 20, 120);

    doc.setFontSize(10);
    doc.text("Thank you for choosing The Himalayans for your Himalayan journey!", 20, 150);
    doc.text("For support, contact us at: support@thehimalayans.in", 20, 160);

    doc.save(`Ticket_${bookingId}.pdf`);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/bookings/user/${userEmail}`)
      .then((res) => {
        const apiBookings = res.data || [];
        const localBookings = JSON.parse(localStorage.getItem("myTrips") || "[]");
        
        const combinedBookings = [
          ...apiBookings, 
          ...localBookings.map(b => ({ 
            _id: Math.random().toString(), 
            hotelName: b.id, 
            status: "Confirmed (Local)", 
            amount: b.amount || "Paid", 
            paymentId: b.paymentId,
            isLocal: true 
          }))
        ];
        
        setBookings(combinedBookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) return <div style={{ padding: "80px", textAlign: "center" }}>🏔️ Loading your journeys...</div>;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1>My Trips & Bookings</h1>
        {bookings.length === 0 ? (
          <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
            <h3>No trips booked yet</h3>
            <button onClick={() => navigate("/hotels")} style={{ background: "#006ce4", color: "#fff", padding: "10px 24px", borderRadius: "6px", cursor: "pointer" }}>Explore Stays</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {bookings.map((trip) => (
              <div key={trip._id} style={{ background: "#fff", borderRadius: "12px", padding: "24px", position: "relative", border: "1px solid #e2e8f0" }}>
                <span style={{ 
                  position: "absolute", top: "24px", right: "24px", 
                  background: trip.status.includes("Confirmed") ? "#f0fdf4" : "#fef2f2", 
                  color: trip.status.includes("Confirmed") ? "#16a34a" : "#dc2626", 
                  fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px"
                }}>
                  ● {trip.status}
                </span>
                <h3>{trip.hotelName || trip.bookingData?.hotelName || "Stay"}</h3>
                <p><strong>Price:</strong> ₹{trip.amount || trip.bookingData?.amount || "N/A"}</p>
                
                {/* ✅ PDF डाउनलोड बटन */}
                <button 
                  onClick={() => downloadTicket(trip)} 
                  style={{ marginTop: "10px", padding: "8px 16px", background: "#059669", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                  Download E-Ticket
                </button>

                {trip.isLocal && <p style={{marginTop: '10px'}}><small style={{color: '#666'}}>* Booking saved on this device</small></p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}