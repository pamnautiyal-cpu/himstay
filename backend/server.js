const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2; // Sirf config ke liye chahiye
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
// Multer setup yahan se hata diya hai kyunki wo ab routes mein hai
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ===== DATABASE ===== */
mongoose
  .connect(process.env.MONGO_URI)
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

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});