import React, { useState } from "react";
import axios from "axios";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // assume these already exist in your file
  const hotel = { price: 1000, name: "Test Hotel" };
  const hotelId = "123";
  const form = {};
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function handlePayment() {
    if (!hotel) return alert("Hotel not loaded");
    if (!window.Razorpay) return alert("Razorpay not loaded");

    setLoading(true);

    try {
      // 1️⃣ CREATE ORDER
      const res = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: hotel.price }),
      });

      const order = await res.json();

      if (!order.id) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      // 2️⃣ OPEN RAZORPAY
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "The Himalayans",
        description: hotel.name,
        order_id: order.id,

        handler: async function (response) {
          try {
            // 3️⃣ VERIFY PAYMENT
            const verify = await axios.post(
              `${BACKEND_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (!verify.data.success) {
              alert("Payment verification failed");
              setLoading(false);
              return;
            }

            // 4️⃣ SAVE BOOKING
            await axios.post(`${BACKEND_URL}/api/bookings`, {
              hotelId,
              ...form,
              paymentStatus: "paid",
              razorpayPaymentId: response.razorpay_payment_id,
            });

            setSuccess(true);
            setLoading(false);
          } catch (err) {
            console.error(err);
            alert("Payment failed");
            setLoading(false);
          }
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

  return (
    <div>
      <h2>Booking Page</h2>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {success && <p>Payment Successful ✅</p>}
    </div>
  );
}
