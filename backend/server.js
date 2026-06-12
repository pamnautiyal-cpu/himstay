const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // 1. Multer Import
const path = require("path");    // 2. Path Import
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
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

/* ===== MULTER SETUP ===== */
// 3. Storage Config
const storage = multer.diskStorage({
  destination: "./uploads/", 
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// 4. Serve Static Images
app.use('/uploads', express.static('uploads'));

/* ===== DATABASE ===== */
console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error", err));

/* ===== ROUTES ===== */
app.get("/", (req, res) => {
  res.send("Himstay Backend Running 🚀");
});

// IMPORTANT: Agar tumhe hotel listing wale route mein file upload karni hai, 
// toh us route mein 'upload.single("image")' middleware use karna hoga.

app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/hotels", require("./routes/hotelRoutes")); // Hotel routes mein upload use hoga
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});