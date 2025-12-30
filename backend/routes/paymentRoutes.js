const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
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

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    return res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return res.status(500).json({ error: "Order creation failed" });
  }
});

/* =========================
   VERIFY PAYMENT
========================= */
router.post("/verify", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
