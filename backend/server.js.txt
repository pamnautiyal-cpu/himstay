const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ====== CONNECT ROUTES ======
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ====== TEST ROUTE ======
app.get("/", (req, res) => {
  res.send("Backend Working!");
});

// ====== MONGODB CONNECT ======
mongoose
  .connect("mongodb://localhost:27017/himstay")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ====== START SERVER ======
app.listen(5000, () => console.log("Server running on port 5000"));
