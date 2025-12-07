import { useParams } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../api/api";

function Booking() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    guests: 2,
    checkIn: "",
    checkOut: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking({
      hotelId: id,
      userId: localStorage.getItem("userId") || "demo-user",
      ...form,
    });
    alert("Booking successful! (saved in backend)");
  };

  return (
    <div className="hs-center-wrapper">
      <div className="hs-form-card">
        <h2 className="hs-form-title">Confirm your stay</h2>
        <p className="hs-form-description">
          Fill in a few details and your HimStay booking will be confirmed.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="hs-form-field">
            <label className="hs-label">Your name</label>
            <input
              className="hs-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="hs-form-field">
            <label className="hs-label">Guests</label>
            <input
              type="number"
              min={1}
              className="hs-input"
              value={form.guests}
              onChange={(e) =>
                setForm({ ...form, guests: Number(e.target.value) })
              }
            />
          </div>

          <div className="hs-form-field">
            <label className="hs-label">Check-in</label>
            <input
              type="date"
              className="hs-input"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              required
            />
          </div>

          <div className="hs-form-field">
            <label className="hs-label">Check-out</label>
            <input
              type="date"
              className="hs-input"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              required
            />
          </div>

          <button className="hs-btn-primary" style={{ width: "100%", marginTop: 6 }}>
            Confirm booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
