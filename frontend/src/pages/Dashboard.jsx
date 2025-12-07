import { useEffect, useState } from "react";
import { getUserBookings } from "../api/api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    getUserBookings(userId).then((res) => setBookings(res.data));
  }, [userId]);

  if (!userId) {
    return (
      <div className="hs-container">
        <h2 className="hs-page-title">My trips</h2>
        <p className="hs-subtitle">Please log in to see your bookings.</p>
      </div>
    );
  }

  return (
    <div className="hs-container">
      <h2 className="hs-page-title">My trips</h2>
      <p className="hs-subtitle">All your upcoming and past HimStay bookings.</p>

      {bookings.length === 0 && <p>You have no bookings yet.</p>}

      <div className="hs-grid">
        {bookings.map((b) => (
          <div key={b._id} className="hs-card">
            <h3 style={{ marginBottom: 4 }}>{b.hotelId?.name || "HimStay stay"}</h3>
            <div className="hs-muted" style={{ marginBottom: 6 }}>
              {b.hotelId?.city}
            </div>
            <div className="hs-muted">
              {b.checkIn} → {b.checkOut} &nbsp;•&nbsp; {b.guests} guests
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
