import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotels();
  }, []);

  function loadHotels() {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        setHotels(res.data || []);
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

  // नई प्रॉपर्टी को अप्रूव करने का फंक्शन
  function approveHotel(id) {
    axios
      .put(`${BACKEND_URL}/api/hotels/${id}`, { isApproved: true, status: "approved" })
      .then(() => {
        alert("Property Approved Successfully!");
        loadHotels();
      })
      .catch((err) => alert("Approval failed: " + err.message));
  }

  function updatePrice(id) {
    const newPrice = prompt("Enter new price");
    if (!newPrice || isNaN(newPrice)) return;

    axios
      .put(`${BACKEND_URL}/api/hotels/${id}`, { price: Number(newPrice) })
      .then(() => loadHotels())
      .catch((err) => alert("Update failed: " + err.message));
  }

  if (loading) return <div style={{ padding: 60 }}>Loading dashboard...</div>;

  return (
    <div style={{ padding: 60 }}>
      <h1>Admin – Manage & Approve Hotels</h1>

      <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc", background: "#f8f9fa" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>City</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Price</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Status</th>
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
                  {h.isApproved ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>Approved</span>
                  ) : (
                    <span style={{ color: "orange", fontWeight: "bold" }}>Pending</span>
                  )}
                </td>
                <td style={{ padding: "10px" }}>
                  {!h.isApproved && (
                    <>
                      <button 
                        onClick={() => approveHotel(h._id)} 
                        style={{ background: "green", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
                      >
                        Approve
                      </button>
                      &nbsp;
                    </>
                  )}
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
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No hotels found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}