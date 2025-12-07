const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();  // If using .env locally

const app = express();

// ====== Middlewares ======
app.use(cors());
app.use(express.json());

// ====== API Routes ======
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ====== Test Route ======
app.get("/", (req, res) => {
  res.send("Backend Working! Deployed Successfully 🚀");
});

// ====== MongoDB Connect ======
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
