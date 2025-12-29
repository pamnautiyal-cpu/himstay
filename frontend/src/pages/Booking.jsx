import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (!hotelId) return;

    axios
      .get(`${BACKEND_URL}/api/hotels/${hotelId}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error(err));
  }, [hotelId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handlePayment() {
    if (!hotel) return alert("Hotel not loaded");
    if (!window.Razorpay) return alert("Razorpay not loaded");

    setLoading(true);

    try {
      // 1️⃣ CREATE ORDER
      const res = await fetch(
        `${BACKEND_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: hotel.price }),
        }
      );

      const order = await res.json();

      if (!order.id) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      // 2️⃣ OPEN RAZORPAY POPUP
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔥 FRONTEND KEY
        amount: order.amount,
        currency: "INR",
        name: "The Himalayans",
        description: hotel.name,
        order_id: order.id,

        handler: async function (response) {
          if (!response.razorpay_payment_id) {
            alert("Payment not completed");
            setLoading(false);
            return;
          }

          // 3️⃣ SAVE BOOKING
          await axios.post(`${BACKEND_URL}/api/bookings`, {
            hotelId,
            ...form,
            paymentStatus: "paid",
            razorpayPaymentId: response.razorpay_payment_id,
          });

          setSuccess(true);
          setLoading(false);
        },

        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <h1>✅ Booking Confirmed</h1>
        <p>Payment successful.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "0 auto" }}>
      <h1>Complete Your Booking</h1>

      {hotel && (
        <p>
          <b>{hotel.name}</b> · {hotel.city} · ₹{hotel.price}/night
        </p>
      )}

      {/* 🔴 BOOKING FORM */}
      <input
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 16,
          borderRadius: 30,
          border: "none",
          background: "#16a34a",
          color: "#fff",
          fontSize: 18,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 14,
  marginTop: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
};
