import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");

  const [hotel, setHotel] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    guests: 1,
    checkIn: "",
    packageType: "Hotel Stay",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!hotelId) return;

    axios
      .get(`${BACKEND_URL}/api/hotels/${hotelId}`)
      .then((res) => setHotel(res.data))
      .catch((err) =>
        console.error("Booking hotel fetch error", err)
      );
  }, [hotelId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔥 PAYMENT HANDLER (FIXED)
  async function handlePayment() {
    alert("PAY NOW CLICKED"); // ✅ DEBUG (remove later)

    if (!hotel) return alert("Hotel not loaded");

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Razorpay order
      const orderRes = await fetch(
        `${BACKEND_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: hotel.price }),
        }
      );

      const order = await orderRes.json();

      if (!order.id) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      // 2️⃣ Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ CORRECT
        amount: order.amount,
        currency: "INR",
        name: "Himstay",
        description: hotel.name,
        order_id: order.id,
        handler: async function (response) {
          // 3️⃣ Save booking AFTER payment success
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
      console.error("Payment error", err);
      alert("Payment failed");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <h1>✅ Booking Confirmed</h1>
        <p>Payment successful & booking saved.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh", padding: "60px 20px" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 30px 70px rgba(15,23,42,0.2)",
        }}
      >
        <h1 style={{ fontSize: 34, fontWeight: 900 }}>
          Complete Your Booking
        </h1>

        {hotel && (
          <p>
            🏨 <b>{hotel.name}</b> · {hotel.city} · ₹{hotel.price}/night
          </p>
        )}

        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "18px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg,#16a34a,#15803d)",
            color: "#fff",
            fontSize: 18,
            fontWeight: 900,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "16px 18px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  fontSize: 15,
  outline: "none",
};
