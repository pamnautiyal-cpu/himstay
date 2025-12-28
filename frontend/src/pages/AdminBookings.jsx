import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/bookings`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 60 }}>
      <h1>Admin – Bookings</h1>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Hotel</th>
            <th>Guest</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Check-in</th>
            <th>Package</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>
                {b.hotelId?.name} <br />
                <small>{b.hotelId?.city}</small>
              </td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.guests}</td>
              <td>{b.checkIn}</td>
              <td>{b.packageType}</td>
              <td>
                {new Date(b.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
