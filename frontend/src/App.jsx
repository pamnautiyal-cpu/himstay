import React from "react";
import { Routes, Route } from "react-router-dom";

// तुम्हारे प्रोजेक्ट के असली लेआउट कंपोनेंट्स (बिल्कुल सही पाथ के साथ)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// तुम्हारे सारे पेजेस
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import MyTrips from "./pages/MyTrips";
import AdminBookings from "./pages/AdminBookings";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>
      {/* तुम्हारा प्रीमियम हेडर/नेवबार जो गायब था */}
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<AllStays />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* तुम्हारा फुटर */}
      <Footer />
    </>
  );
}