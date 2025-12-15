import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

function Booking() {
  const { id } = useParams();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [email, setEmail] = useState("");

  const amount = 3000;

  const handlePayment = async () => {
    const order = await axios.post(
      `${BACKEND_URL}/api/payment/create-order`,
      { amount }
    );

    const options = {
      key: "rzp_test_xxxxx",
      amount: order.data.amount,
      currency: "INR",
      name: "The Himalayans",
      description: "Hotel Booking",
      order_id: order.data.id,
      handler: async function (response) {
        await axios.post(`${BACKEND_URL}/api/payment/verify`, {
          ...response,
          booking: {
            hotelName: "Himalayan Stay",
            checkIn,
            checkOut,
            guests,
            email,
            amount,
          },
        });

        alert("✅ Booking Confirmed! Check your email.");
      },
      method: { upi: true, card: true, netbanking: true },
      theme: { color: "#2563eb" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="hs-dashboard">
      <h2 className="hs-section-title">Confirm Booking</h2>

      <div className="hs-card" style={{ maxWidth: 420 }}>
        <input type="email" placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="date" onChange={(e)=>setCheckIn(e.target.value)} />
        <input type="date" onChange={(e)=>setCheckOut(e.target.value)} />
        <input type="number" value={guests} min="1" onChange={(e)=>setGuests(e.target.value)} />

        <button className="hs-btn-primary" onClick={handlePayment}>
          Pay ₹{amount} & Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
