import React, { useState } from "react";

function Booking({
  pricePerNight = 2500,
  hotelName = "The Moksha Valley",
}) {
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
      `Booking Requested\nHotel: ${hotelName}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nTotal: ₹${totalPrice}`
    );
  };

  return (
    <div style={box}>
      <h3>Book Your Stay</h3>

      <label>Check-in</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />

      <label>Check-out</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />

      <label>Guests</label>
      <select
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
      >
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4 Guests</option>
      </select>

      <p>₹ {pricePerNight} / night</p>

      {nights > 0 && (
        <p>
          Total: ₹ {totalPrice} ({nights} nights)
        </p>
      )}

      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}

const box = {
  padding: 20,
  borderRadius: 12,
  background: "#fff",
  maxWidth: 400,
};

export default Booking;
