import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; 

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_SECRET = "040788"; 

  const handleLogin = () => {
    if (password === ADMIN_SECRET) {
      setIsAuthenticated(true);
    } else {
      alert("गलत पासवर्ड! 🚫");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${BACKEND_URL}/api/bookings/status/${id}`, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      alert("Error updating status!");
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(bookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "Himalayan_Bookings_Report.xlsx");
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`${BACKEND_URL}/api/bookings`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Admin error:", err));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f1e36" }}>
        <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
          <h2>🔒 Admin Login</h2>
          <input type="password" placeholder="Enter Secret Password" onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px", width: "200px", marginBottom: "10px", display: "block" }} />
          <button onClick={handleLogin} style={{ background: "#006ce4", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>📊 Admin Booking Console</h1>
        <button onClick={downloadExcel} style={{ background: "#16a34a", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}>📥 Download Excel</button>
      </div>

      {/* ✅ Summary Dashboard Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #0f1e36", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <h4 style={{ margin: "0", color: "#64748b" }}>Total Bookings</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0 0" }}>{bookings.length}</p>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #f59e0b", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <h4 style={{ margin: "0", color: "#64748b" }}>Pending</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0 0" }}>{bookings.filter(b => !b.status || b.status === "Pending").length}</p>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #22c55e", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <h4 style={{ margin: "0", color: "#64748b" }}>Confirmed</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0 0" }}>{bookings.filter(b => b.status === "Confirmed").length}</p>
        </div>
      </div>

      <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#0f1e36", color: "#fff" }}>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Customer</th>
            <th style={{ padding: "12px" }}>Hotel</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "12px" }}>{new Date(b.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "12px" }}>{b.email || b.bookingData?.email}</td>
              <td style={{ padding: "12px" }}>{b.hotelName || b.bookingData?.hotelName || "Stay"}</td>
              <td style={{ padding: "12px", fontWeight: "bold", color: b.status === "Confirmed" ? "green" : "orange" }}>
                {b.status || "Pending"}
              </td>
              <td style={{ padding: "12px" }}>
                <button onClick={() => updateStatus(b._id, "Confirmed")} style={{ background: "#22c55e", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}>✅ Confirm</button>
                <button onClick={() => updateStatus(b._id, "Cancelled")} style={{ background: "#ef4444", color: "white", border: "none", padding: "4px 8px", cursor: "pointer", marginLeft: "5px" }}>❌ Cancel</button>
                <a href={`https://wa.me/919410106470?text=Hello`} target="_blank" style={{ marginLeft: "10px", textDecoration: "none", fontSize: "12px" }}>💬</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}