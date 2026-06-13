import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import HotelDetails from "./pages/HotelDetails";
import DetailsPage from "./pages/DetailsPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import MyTrips from "./pages/MyTrips";
import ListProperty from "./pages/ListProperty";
import AdminBookings from "./pages/AdminBookings";
import Terms from "./pages/Terms";
import "./App.css";

// ✅ Professional Footer Component
const Footer = () => (
  <footer style={{ background: "#0f1e36", color: "#fff", padding: "40px 20px", marginTop: "50px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
      <div>
        <h4>The Himalayans</h4>
        <p style={{ fontSize: "14px", color: "#94a3b8" }}>Authentic Himalayan experiences & stays.</p>
      </div>
      <div>
        <h4>Support</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/mytrips" style={{ color: "#94a3b8", textDecoration: "none" }}>Manage My Trips</a></li>
          <li><a href="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/terms" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div style={{ textAlign: "center", marginTop: "30px", borderTop: "1px solid #1e293b", paddingTop: "20px", fontSize: "12px", color: "#64748b" }}>
      © 2026 The Himalayans. All rights reserved.
    </div>
  </footer>
);

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>The Himalayans | Best Stays in Uttarakhand</title>
        <meta name="description" content="Book premium hotels and homestays across Uttarakhand. Experience the best of Himalayas with The Himalayans." />
      </Helmet>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<AllStays />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/details/:category/:id" element={<DetailsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mytrips" element={<MyTrips />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
        </Routes>
      </Layout>
      
      {/* ✅ Footer यहाँ जुड़ गया है */}
      <Footer />
    </HelmetProvider>
  );
}