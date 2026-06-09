import React from "react";
import { Routes, Route } from "react-router-dom";

// कंपोनेंट्स
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// पेजेस
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
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<AllStays />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/mytrips" element={<MyTrips />} />
        
        {/* ✨ तुम्हारा एडमिन रूट - अब इसे ब्राउज़र में /admin/bookings खोलकर चेक करना */}
        <Route path="/admin/bookings" element={<AdminBookings />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </>
  );
}