import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import MyTrips from "./pages/MyTrips";
import ListProperty from "./pages/ListProperty";
import AdminBookings from "./pages/AdminBookings"; // ✅ Admin route import kiya
import "./App.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<AllStays />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list-property" element={<ListProperty />} />
        
        {/* ✅ Admin Panel Route */}
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>
    </Layout>
  );
}