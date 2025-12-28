import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadHotels();
  }, []);

  function loadHotels() {
    axios
      .get(`${BACKEND_URL}/api/hotels`)
      .then((res) => setHotels(res.data))
      .catch((err) => console.error(err));
  }

  function deleteHotel(id) {
    if (!window.confirm("Delete this hotel?")) return;

    axios
      .delete(`${BACKEND_URL}/api/hotels/${id}`)
      .then(() => loadHotels())
      .catch((err) => console.error(err));
  }

  function updatePrice(id) {
    const newPrice = prompt("Enter new price");
    if (!newPrice) return;

    axios
      .put(`${BACKEND_URL}/api/hotels/${id}`, { price: newPrice })
      .then(() => loadHotels())
      .catch((err) => console.error(err));
  }

  return (
    <div style={{ padding: 60 }}>
      <h1>Admin – Manage Hotels</h1>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {hotels.map((h) => (
            <tr key={h._id}>
              <td>{h.name}</td>
              <td>{h.city}</td>
              <td>₹{h.price}</td>
              <td>
                <button onClick={() => updatePrice(h._id)}>
                  Edit Price
                </button>
                &nbsp;
                <button
                  onClick={() => deleteHotel(h._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
