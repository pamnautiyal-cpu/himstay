import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ईमेल और एडमिन स्टेटस चेक करना
  const userEmail = localStorage.getItem("userEmail");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    // 1. अगर यूज़र लॉग इन नहीं है, तो सीधे वापस भेजें
    if (!userEmail) {
      alert("Please login to view your trips!");
      navigate("/login");
      return;
    }

    setLoading(true);
    axios.get(`${BACKEND_URL}/api/bookings/user/${userEmail}`)
      .then((res) => {
        const apiBookings = res.data || [];
        const localBookings = JSON.parse(localStorage.getItem("myTrips") || "[]");
        
        // 2. डेटा मर्ज करें
        const combinedBookings = [
          ...apiBookings, 
          ...localBookings.map(b => ({ 
            _id: Math.random().toString(), 
            hotelName: b.id, 
            status: "Confirmed (Local)", 
            amount: b.amount || "Paid", 
            paymentId: b.paymentId,
            isLocal: true,
            userEmail: userEmail // ताकि हम मैच कर सकें
          }))
        ];
        
        // 3. डेटा फिल्टर करें: सिर्फ अपनी बुकिंग या अगर एडमिन हो तो सब
        const filteredBookings = isAdmin 
          ? combinedBookings 
          : combinedBookings.filter(b => b.userEmail === userEmail || b.isLocal === true);
        
        setBookings(filteredBookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [userEmail, navigate, isAdmin]);

  // ✅ सुरक्षित PDF डाउनलोड फंक्शन
  const downloadTicket = (trip) => {
    // एक्स्ट्रा सिक्योरिटी चेक
    if (trip.userEmail && trip.userEmail !== userEmail && !isAdmin) {
      alert("Access Denied!");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 108, 228);
    doc.text("THE HIMALAYANS", 20, 20);
    
    const bookingId = trip.paymentId ? trip.paymentId.slice(-8).toUpperCase() : "TH-" + Math.floor(1000 + Math.random() * 9000);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.line(20, 60, 190, 60);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Details:", 20, 75);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Destination: ${trip.hotelName || "Stay"}`, 20, 90);
    doc.text(`Amount Paid: ₹${trip.amount || "N/A"}`, 20, 100);
    doc.text(`Status: ${trip.status}`, 20, 110);
    
    doc.save(`Ticket_${bookingId}.pdf`);
  };

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
                <h3>{trip.hotelName || "Stay"}</h3>
                <p><strong>Price:</strong> ₹{trip.amount || "N/A"}</p>
                <button onClick={() => downloadTicket(trip)} style={{ padding: "8px 16px", background: "#059669", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Download E-Ticket
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}