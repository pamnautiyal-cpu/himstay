import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; 

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || "040788"; 

  const handleLogin = (e) => {
    if (e) e.preventDefault();
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

  // ✅ Flattened data for clean Excel export
  const downloadExcel = () => {
    const formattedData = bookings.map((b) => ({
      "Booking Date": new Date(b.createdAt).toLocaleDateString(),
      "Customer Name": b.name || b.bookingData?.name || "N/A",
      "Phone": b.phone || b.bookingData?.phone || "N/A",
      "Email": b.email || b.bookingData?.email || "N/A",
      "Hotel": b.hotelName || b.bookingData?.hotelName || "Stay",
      "Check-In Date": b.checkIn || b.bookingData?.checkIn || "N/A",
      "Guests": b.guests || b.bookingData?.guests || 1,
      "Package": b.packageType || b.bookingData?.packageType || "Standard",
      "Status": b.status || "Pending"
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "Himalayan_Bookings_Report.xlsx");
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = () => {
        axios.get(`${BACKEND_URL}/api/bookings`)
          .then((res) => setBookings(res.data))
          .catch((err) => console.error("Admin error:", err));
      };

      fetchData();
      const interval = setInterval(fetchData, 30000); 
      return () => clearInterval(interval); 
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f1e36" }}>
        <form onSubmit={handleLogin} style={{ background: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
          <h2 style={{ margin: "0 0 20px", color: "#0f1e36" }}>🔒 Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Secret Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            style={{ padding: "12px", width: "240px", marginBottom: "15px", display: "block", borderRadius: "6px", border: "1px solid #cbd5e1" }} 
          />
          <button type="submit" style={{ background: "#006ce4", color: "#fff", padding: "10px 25px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ color: "#0f1e36", margin: 0 }}>📊 Admin Booking Console</h1>
        <button onClick={downloadExcel} style={{ background: "#16a34a", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>📥 Download Excel</button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #0f1e36", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0", color: "#64748b" }}>Total Bookings</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0 0", color: "#0f1e36" }}>{bookings.length}</p>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #f59e0b", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0", color: "#64748b" }}>Pending</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0 0", color: "#f59e0b" }}>{bookings.filter(b => !b.status || b.status === "Pending").length}</p>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #22c55e", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0", color: "#64748b" }}>Confirmed</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0 0", color: "#22c55e" }}>{bookings.filter(b => b.status === "Confirmed").length}</p>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #ef4444", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0", color: "#64748b" }}>Cancelled</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0 0", color: "#ef4444" }}>{bookings.filter(b => b.status === "Cancelled").length}</p>
        </div>
      </div>

      <div style={{ overflowX: "auto", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#0f1e36", color: "#fff" }}>
              <th style={{ padding: "14px" }}>Date</th>
              <th style={{ padding: "14px" }}>Customer Details</th>
              <th style={{ padding: "14px" }}>Hotel / Stay</th>
              <th style={{ padding: "14px" }}>Check-In / Guests</th>
              <th style={{ padding: "14px" }}>Status</th>
              <th style={{ padding: "14px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No bookings found.</td>
              </tr>
            ) : (
              bookings.map((b) => {
                const customerName = b.name || b.bookingData?.name || "N/A";
                const customerPhone = b.phone || b.bookingData?.phone || "";
                const customerEmail = b.email || b.bookingData?.email || "N/A";
                const hotelName = b.hotelName || b.bookingData?.hotelName || "Stay";
                const checkInDate = b.checkIn || b.bookingData?.checkIn || "N/A";
                const guestsCount = b.guests || b.bookingData?.guests || 1;
                
                // Dynamic WhatsApp Message
                const waMessage = encodeURIComponent(`Hello ${customerName}, regarding your booking at ${hotelName} (Check-in: ${checkInDate})...`);
                const waPhone = customerPhone ? customerPhone.replace(/[^0-9]/g, "") : "919410106470";

                return (
                  <tr key={b._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "12px 14px", fontSize: "14px" }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{customerName}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{customerEmail}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{customerPhone}</div>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: "600", fontSize: "14px" }}>{hotelName}</td>
                    <td style={{ padding: "12px 14px", fontSize: "14px" }}>
                      <div><b>Date:</b> {checkInDate}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}><b>Guests:</b> {guestsCount}</div>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: "bold", fontSize: "14px", color: b.status === "Confirmed" ? "#22c55e" : b.status === "Cancelled" ? "#ef4444" : "#f59e0b" }}>
                      {b.status || "Pending"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <button onClick={() => updateStatus(b._id, "Confirmed")} style={{ background: "#22c55e", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Confirm</button>
                      <button onClick={() => updateStatus(b._id, "Cancelled")} style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", marginLeft: "6px", fontSize: "12px", fontWeight: "bold" }}>Cancel</button>
                      <a href={`https://wa.me/${waPhone}?text=${waMessage}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "10px", textDecoration: "none", fontSize: "16px" }} title="Chat on WhatsApp">💬</a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}