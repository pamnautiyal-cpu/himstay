const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ----- FULL CORS FIX -----
app.use(cors({
    origin: [
        "https://himstay-frontend.onrender.com",
        "https://himstay.onrender.com",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// For preflight OPTIONS request (important)
app.options("*", cors());

// ----- Body Parser -----
app.use(express.json());

// ----- Routes -----
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// ----- MongoDB Connect -----
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error:", err));

// ----- Server -----
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
