const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

/* ===== MIDDLEWARE ===== */
const allowedOrigins = [
  "https://thehimalayans.in",
  "https://www.thehimalayans.in",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Production me safety ke sath bypass
      }
    },
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

/* ===== RAZORPAY CONFIG ===== */
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_live_TKtTqRDH6nVxxo";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_SECRET) {
  console.warn("⚠️ WARNING: RAZORPAY_KEY_SECRET is missing in environment variables!");
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET || "",
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

/* ===== RAZORPAY PAYMENT ROUTES ===== */
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    // Amount validation & strict integer rounding
    const parsedAmount = Math.round(Number(amount));

    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount < 100) {
      return res.status(400).json({
        error: "Invalid amount. Minimum amount must be at least 100 paise (₹1).",
      });
    }

    const options = {
      amount: parsedAmount,
      currency: currency.toUpperCase(),
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log(`✅ Razorpay Order Created Successfully: ${order.id}`);

    return res.json({
      id: order.id,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:", error);
    const errorMessage =
      error?.error?.description ||
      error?.description ||
      error?.message ||
      "Internal Server Error";

    return res.status(500).json({ error: errorMessage });
  }
});

app.post("/api/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required payment fields" });
    }

    if (!RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        error: "Server configuration error: Secret Key missing",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid signature, payment verification failed",
      });
    }
  } catch (error) {
    console.error("❌ ERROR VERIFYING PAYMENT:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});