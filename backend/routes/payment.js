const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");

const router = express.Router();

// 🔑 बैकअप के तौर पर तुम्हारी एक्टिव टेस्ट कीज़ यहीं डाल दी हैं ताकि .env लोड न होने पर भी फेल न हो
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RxW3z0Ei0iGN69",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "QEK9HpYxNKGRU6FeHEub1LB5",
});

/* =========================
   CREATE ORDER
========================= */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount missing" });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // इंटीजर राउंड ऑफ लॉजिक
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return res.status(500).json({ error: "Order creation failed", details: err.message });
  }
});

/* =========================
   VERIFY PAYMENT
========================= */
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "QEK9HpYxNKGRU6FeHEub1LB5")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Signature verification failed" });
    }

    // पेमेंट सफल होने पर डेटाबेस में बुकिंग को पक्का करना
    let savedBooking = null;
    if (bookingData) {
      savedBooking = await Booking.create({
        ...bookingData,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "Confirmed"
      });
    }

    return res.json({ success: true, booking: savedBooking });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;