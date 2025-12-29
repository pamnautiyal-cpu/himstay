const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ============================
// CREATE ORDER ✅
// ============================
router.post("/create-order", async (req, res) => {
  try {
    console.log("CREATE ORDER BODY:", req.body); // 🔴 DEBUG

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount missing" });
    }

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100, // rupees → paise
      currency: "INR",
      receipt: "himstay_receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.error("RAZORPAY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
