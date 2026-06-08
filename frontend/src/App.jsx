import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PAGES */
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import HotelDetails from "./pages/HotelDetails";
import MyTrips from "./pages/MyTrips";

/* NEW PAGES */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/hotels" element={<AllStays />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />

        <Route path="/mytrips" element={<MyTrips />} />

        {/* NEW ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}