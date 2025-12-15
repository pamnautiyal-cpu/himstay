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

  const whatsappLink = `https://wa.me/919410106470?text=${encodeURIComponent(
    `Booking Enquiry:
Hotel: ${hotelName}
Check-in: ${checkIn}
Check-out: ${checkOut}
Guests: ${guests}
Nights: ${nights}
Total Price: ₹${totalPrice}`
  )}`;

  const handleBooking = async () => {
    await fetch("https://himstay.onrender.com/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelName,
        checkIn,
        checkOut,
        guests,
        totalPrice,
      }),
    });

    window.open(whatsappLink, "_blank");
  };

  return (
    <div style={box}>
      <h3>Book Your Stay</h3>

      <input type="date" onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" onChange={(e) => setCheckOut(e.target.value)} />

      <select onChange={(e) => setGuests(Number(e.target.value))}>
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4 Guests</option>
        <option value="5">5+ Guests</option>
      </select>

      <div>₹ {pricePerNight} / night</div>

      {nights > 0 && (
        <div>
          Total: ₹ {totalPrice} ({nights} nights)
        </div>
      )}

      <button onClick={handleBooking} style={btn}>
        Book on WhatsApp
      </button>
    </div>
  );
}

const box = {
  padding: 22,
  borderRadius: 22,
  background: "#fff",
};

const btn = {
  marginTop: 14,
  padding: 12,
  background: "#22c55e",
  color: "#fff",
  border: "none",
};

export default Booking;
