const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(
  cors({
    origin: [
      "https://thehimalayans.in",
      "https://www.thehimalayans.in",
      "https://checkout.razorpay.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ===== CLOUDINARY CONFIG ===== */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ===== RAZORPAY CONFIG (Direct Hardcoded to bypass Render env issues) ===== */
const razorpay = new Razorpay({
  key_id: "rzp_test_TKBfYo6v5i4nor",
  key_secret: "YAHAPAPNISECRETHARKODALDE", // <-- यहाँ अपनी असली Razorpay Test Secret Key चुपचाप पेस्ट कर दें
});

/* ===== DATABASE ===== */
mongoose
  .connect(process.env.MONGO_URI || process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error", err));

/* ===== ROUTES ===== */
app.get("/", (req, res) => {
  res.send("Himstay Backend Running 🚀");
});

app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/hotels", require("./routes/hotelRoutes")); 
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

/* ===== RAZORPAY PAYMENT ROUTES (Direct in server.js for absolute reliability) ===== */
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Minimum amount must be at least 100 paise' });
    }

    const options = {
      amount: Number(amount),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    return res.status(500).json({ error: error.description || 'Internal Server Error' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing required payment fields' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', "YAHAPAPNISECRETHARKODALDE") // <-- यहाँ भी वही अपनी Secret Key पेस्ट कर दें
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid signature, payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});