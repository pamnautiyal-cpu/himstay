import React, { useEffect, useState } from "react";
import axios from "axios";

// Environment variable use karna best practice hai
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state add kiya

  useEffect(() => {
    loadHotels();
  }, []);

  function loadHotels() {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        setHotels(res.data || []); // Safety check: agar data null ho toh empty array set kare
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading hotels:", err);
        setLoading(false);
      });
  }

  function deleteHotel(id) {
    if (!window.confirm("Delete this hotel?")) return;

    axios
      .delete(`${BACKEND_URL}/api/hotels/${id}`)
      .then(() => loadHotels())
      .catch((err) => alert("Delete failed: " + err.message));
  }

  function updatePrice(id) {
    const newPrice = prompt("Enter new price");
    if (!newPrice || isNaN(newPrice)) return; // Invalid input handling

    axios
      .put(`${BACKEND_URL}/api/hotels/${id}`, { price: Number(newPrice) })
      .then(() => loadHotels())
      .catch((err) => alert("Update failed: " + err.message));
  }

  if (loading) return <div style={{ padding: 60 }}>Loading dashboard...</div>;

  return (
    <div style={{ padding: 60 }}>
      <h1>Admin – Manage Hotels</h1>

      <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>City</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Price</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length > 0 ? (
            hotels.map((h) => (
              <tr key={h._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{h.name}</td>
                <td style={{ padding: "10px" }}>{h.city || "N/A"}</td>
                <td style={{ padding: "10px" }}>₹{h.price}</td>
                <td style={{ padding: "10px" }}>
                  <button onClick={() => updatePrice(h._id)}>Edit Price</button>
                  &nbsp;
                  <button onClick={() => deleteHotel(h._id)} style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No hotels found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}