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
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail"; // ✅ नया इम्पोर्ट (Detail Page के लिए)
import "./App.css";

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
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> {/* ✅ यह रूट ब्लॉग डिटेल खोलेगा */}
          <Route path="/admin/bookings" element={<AdminBookings />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
}