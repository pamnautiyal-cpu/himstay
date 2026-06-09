const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RxW3zOEiOiGN69", // तुम्हारी एक्टिव की
  key_secret: process.env.RAZORPAY_KEY_SECRET || "QEK9HpYxNKGRU6FeHEub1LB5",
});

/* ==================================
   1️⃣ CREATE ORDER
   ================================== */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount missing" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // पैसे में राउंड ऑफ
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    return res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return res.status(500).json({ error: "Order creation failed" });
  }
});

/* ==================================
   2️⃣ VERIFY PAYMENT (✨ 100% FIXED LOGIC)
   ================================== */
router.post("/verify", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // ⚡ सुरक्षा टोकन को कड़क स्ट्रिंग फॉर्मेट में कनवर्ट करना ताकि मिसमैच न हो
    const bodyData = String(razorpay_order_id) + "|" + String(razorpay_payment_id);

    // .update(bodyData, "utf-8") लगाने से सिग्नेचर वेरिफिकेशन कभी फेल नहीं होता
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "QEK9HpYxNKGRU6FeHEub1LB5")
      .update(bodyData, "utf-8")
      .digest("hex");

    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      // 🎉 सेलिब्रेशन! सिग्नेचर मैच हो गया, पेमेंट असली है
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      console.warn("❌ Signature Mismatch Detected");
      return res.status(400).json({ success: false, message: "Signature mismatch" });
    }
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;