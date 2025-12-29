const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ============================
// CREATE ORDER
// ============================
router.post("/create-order", async (req, res) => {
  try {
    console.log("CREATE ORDER BODY:", req.body);

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount missing" });
    }

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "himstay_" + Date.now(),
    });

    return res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ============================
// VERIFY PAYMENT (CRITICAL)
// ============================
router.post("/verify", (req, res) => {
  try {
    console.log("VERIFY BODY:", req.body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      console.error("VERIFY FAILED: missing fields");
      return res.status(400).json({ success: false });
    }

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("VERIFY SUCCESS");
      return res.json({ success: true });
    } else {
      console.error("VERIFY SIGNATURE MISMATCH");
      return res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
