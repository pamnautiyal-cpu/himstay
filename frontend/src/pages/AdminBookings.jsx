import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // अपना सीक्रेट पासवर्ड यहाँ सेट करो (जो सिर्फ तुम्हें पता हो)
  const ADMIN_SECRET = "040788"; 

  const handleLogin = () => {
    if (password === ADMIN_SECRET) {
      setIsAuthenticated(true);
    } else {
      alert("गलत पासवर्ड! 🚫");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`${BACKEND_URL}/api/bookings`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Admin error:", err));
    }
  }, [isAuthenticated]);

  // अगर पासवर्ड नहीं डाला तो लॉगिन स्क्रीन दिखाओ
  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f1e36" }}>
        <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
          <h2>🔒 Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Secret Password" 
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", width: "200px", marginBottom: "10px", display: "block" }}
          />
          <button onClick={handleLogin} style={{ background: "#006ce4", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Login to Bookings
          </button>
        </div>
      </div>
    );
  }

  // लॉगिन होने के बाद बुकिंग टेबल दिखाओ
  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ color: "#0f172a", marginBottom: "20px" }}>📊 Admin Booking Console</h1>
      {/* ... टेबल कोड पहले जैसा ही रहेगा ... */}
      <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#0f1e36", color: "#fff" }}>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Customer Email</th>
            <th style={{ padding: "12px" }}>Hotel</th>
            <th style={{ padding: "12px" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "12px" }}>{new Date(b.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "12px" }}>{b.email || b.bookingData?.email}</td>
              <td style={{ padding: "12px" }}>{b.hotelName || b.bookingData?.hotelName}</td>
              <td style={{ padding: "12px" }}>₹{b.amount || b.bookingData?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}