const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking"); // 🌟 डेटाबेस में बुकिंग सेव करने के लिए मॉडल इम्पोर्ट किया

const router = express.Router();

// .env फ़ाइल से कीज़ लोड करना
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ==================================
   1️⃣ CREATE ORDER (ऑर्डर बनाने का रूट)
   ================================== */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount missing" });
    }

    // रेज़रपे हमेशा राशि को नंबर और पैसे (Paise) में स्वीकार करता है
    const options = {
      amount: Math.round(Number(amount) * 100), // राउंड ऑफ लॉजिक
      currency: "INR",
      receipt: "order_rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return res.status(500).json({ error: "Order creation failed", details: err.message });
  }
});

/* ==================================
   2️⃣ VERIFY PAYMENT & SAVE TO DB (वेरिफिकेशन और डेटाबेस सेविंग)
   ================================== */
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData // 🌟 फ्रंटएंड से भेजी गई बुकिंग डिटेल्स
    } = req.body;

    // सुरक्षा के लिए डेटा स्ट्रिंग तैयार करना
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // SHA256 एल्गोरिदम से सिग्नेचर वेरीफाई करना
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString()) // 🛠️ .toString() फिक्स किया ताकि फेल न हो
      .digest("hex");

    // अगर सिग्नेचर मैच नहीं होता तो एरर रिटर्न करें
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment signature verification failed" });
    }

    // 🌟 सेलिब्रेशन! पेमेंट असली है। अब इसे सीधे MongoDB डेटाबेस में सेव करें
    let savedBooking = null;
    if (bookingData) {
      savedBooking = await Booking.create({
        ...bookingData,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "Confirmed" // बुकिंग स्टेटस कन्फर्म मार्क किया
      });
    }

    // फ्रंटएंड को सक्सेस सिग्नल भेजें
    return res.json({ 
      success: true, 
      message: "Payment Verified & Booking Saved Successfully!",
      booking: savedBooking 
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;