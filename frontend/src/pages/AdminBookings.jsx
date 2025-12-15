import { useEffect, useState } from "react";

function AdminBookings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://YOUR_BACKEND_URL/api/bookings")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Booking Enquiries</h2>

      {data.map((b) => (
        <div
          key={b._id}
          style={{
            background: "#fff",
            padding: 16,
            marginTop: 12,
            borderRadius: 12,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          }}
        >
          <strong>{b.hotelName}</strong>
          <div>
            {b.checkIn} → {b.checkOut}
          </div>
          <div>Guests: {b.guests}</div>
          <div>Total: ₹{b.totalPrice}</div>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;
