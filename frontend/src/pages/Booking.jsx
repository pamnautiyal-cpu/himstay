import React, { useState } from "react";

function Booking({ pricePerNight = 2500, hotelName = "The Moksha Valley" }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const nights =
    checkIn && checkOut
      ? Math.max(
          (new Date(checkOut) - new Date(checkIn)) /
            (1000 * 60 * 60 * 24),
          1
        )
      : 0;

  const totalPrice = nights * pricePerNight;

  const handleBooking = () => {
    alert(
      `Booking Requested\n\nHotel: ${hotelName}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nTotal: ₹${totalPrice}`
    );
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Confirm Booking</h2>

      <label>Check-in</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />

      <br /><br />

      <label>Check-out</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />

      <br /><br />

      <label>Guests</label>
      <input
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
      />

      <br /><br />

      <p>₹ {pricePerNight} / night</p>

      {nights > 0 && (
        <p>
          Total: ₹ {totalPrice} ({nights} nights)
        </p>
      )}

      <button onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
}

export default Booking;
