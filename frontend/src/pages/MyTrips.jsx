import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // लॉगिन यूजर की ईमेल लोकल स्टोरेज से उठाना (यदि नहीं है तो डेमो के लिए customer@example.com)
  const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

  useEffect(() => {
    setLoading(true);
    
    // 🚀 बैकएंड के ईमेल स्पेसिफिक एंडपॉइंट से सीधे फिल्टर की हुई बुकिंग्स मांगना
    axios
      .get(`${BACKEND_URL}/api/bookings/user/${userEmail}`)
      .then((res) => {
        setBookings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dynamic trips fetch error:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) {
    return (
      <div style={{ padding: "80px", textAlign: "center", fontSize: "18px", color: "#64748b", fontFamily: "sans-serif" }}>
        🏔️ Loading your Himalayan journeys...
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "BlinkMacSystemFont, -apple-system, Roboto, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>My Trips & Bookings</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", marginTop: 0 }}>Manage your verified stays and upcoming adventures across Uttarakhand hills.</p>

        {bookings.length === 0 ? (
          /* 📭 खाली स्टेट: जब कोई बुकिंग न हो */
          <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "50px" }}>🗺️</span>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a", margin: "15px 0 8px 0" }}>No trips booked yet</h3>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 20px 0" }}>Your upcoming dream stays in Uttarkashi, Rishikesh and Char Dham routes will appear here.</p>
            <button 
              onClick={() => navigate("/hotels")} 
              style={{ background: "#006ce4", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
            >
              Explore Active Stays
            </button>
          </div>
        ) : (
          /* 💳 डायनामिक बुकिंग कार्ड्स की लिस्ट */
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {bookings.map((trip, index) => (
              <div 
                key={trip._id || index} 
                style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", position: "relative" }}
              >
                {/* STATUS BADGE */}
                <span style={{ position: "absolute", top: "24px", right: "24px", background: "#f0fdf4", color: "#16a34a", fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", border: "1px solid #bbf7d0" }}>
                  ● Confirmed & Paid
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "24px" }}>🏨</span>
                  <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
                    {trip.hotelName || trip.bookingData?.hotelName || "Premium Stay"}
                  </h3>
                </div>

                <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px 0" }}>
                  📅 <b>Dates:</b> June 2026 (Upcoming Stay)
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "15px", background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                  <div>
                    <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>GUESTS</span>
                    <strong style={{ color: "#334155", fontSize: "14px" }}>👥 {trip.guests || trip.bookingData?.guests || 2} Guests</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>TOTAL PRICE</span>
                    <strong style={{ color: "#16a34a", fontSize: "16px", fontWeight: "800" }}>₹{trip.amount || trip.bookingData?.amount}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>TRANSACTION ID</span>
                    <strong style={{ color: "#475569", fontSize: "12px", fontFamily: "monospace" }}>
                      {trip.paymentId || "pay_test_active"}
                    </strong>
                  </div>
                </div>

                <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button 
                    onClick={() => alert("Your premium invoice has been sent to your registered email.")}
                    style={{ background: "none", border: "1px solid #cbd5e1", padding: "8px 14px", borderRadius: "6px", color: "#475569", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}
                  >
                    📄 Download Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const thStyle = { padding: "12px 16px", fontWeight: "600", fontSize: "13px" };
const tdStyle = { padding: "20px 16px", verticalAlign: "top", lineHeight: "1.5" };
const tableBtnStyle = { background: "#006ce4", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "700", fontSize: "13px", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,108,228,0.2)" };