const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== DATABASE ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error", err));

/* ===== ROUTES ===== */
app.get("/", (req, res) => {
  res.send("Himstay Backend Running 🚀");
});

/* 🔴 STEP 3 — CONTACT ROUTE REGISTER HERE */
const contactRoutes = require("./routes/contact.routes");
app.use("/api/contact", contactRoutes);

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
