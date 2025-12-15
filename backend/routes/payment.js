const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ===== EMAIL SETUP ===== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ===== CREATE ORDER ===== */
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  });

  res.json(order);
});

/* ===== VERIFY PAYMENT + SEND EMAIL ===== */
router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    booking,
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  /* CUSTOMER EMAIL */
  await transporter.sendMail({
    from: `"The Himalayans" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "Booking Confirmed – The Himalayans",
    html: `
      <h2>Your booking is confirmed 🎉</h2>
      <p><strong>Hotel:</strong> ${booking.hotelName}</p>
      <p><strong>Check-in:</strong> ${booking.checkIn}</p>
      <p><strong>Check-out:</strong> ${booking.checkOut}</p>
      <p><strong>Guests:</strong> ${booking.guests}</p>
      <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>
      <br/>
      <p>Thank you for booking with <b>The Himalayans</b>.</p>
    `,
  });

  /* ADMIN EMAIL */
  await transporter.sendMail({
    from: `"The Himalayans" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Booking Received",
    html: `
      <h3>New Booking</h3>
      <p><strong>Hotel:</strong> ${booking.hotelName}</p>
      <p><strong>Customer Email:</strong> ${booking.email}</p>
      <p><strong>Dates:</strong> ${booking.checkIn} → ${booking.checkOut}</p>
      <p><strong>Guests:</strong> ${booking.guests}</p>
      <p><strong>Amount:</strong> ₹${booking.amount}</p>
    `,
  });

  res.json({ success: true });
});

module.exports = router;
