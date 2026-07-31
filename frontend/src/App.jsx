import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import HotelDetails from "./pages/HotelDetails";
import DetailsPage from "./pages/DetailsPage";
import ComingSoon from "./pages/ComingSoon";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import MyTrips from "./pages/MyTrips";
import ListProperty from "./pages/ListProperty";
import AdminBookings from "./pages/AdminBookings";
import Terms from "./pages/Terms";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import AdminDashboard from "./pages/AdminDashboard";
import Search from "./components/Search";
import "./App.css";

// 🛡️ STRICT PROTECTED ROUTE GUARD WITH EMAIL VALIDATION
const ProtectedRoute = ({ children }) => {
  let isAuthed = false;
  try {
    const userStr = localStorage.getItem("user") || localStorage.getItem("userInfo") || localStorage.getItem("auth") || localStorage.getItem("currentUser");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (parsed && (parsed.email || parsed.userEmail || (typeof parsed === 'string' && parsed.includes("@")))) {
        isAuthed = true;
      } else if (typeof userStr === 'string' && userStr.includes("@")) {
        isAuthed = true;
      }
    }
  } catch (e) {
    isAuthed = false;
  }
  
  if (!isAuthed) {
    alert("Please log in or sign up first to access this page.");
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

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
          <Route path="/search" element={<Search />} />
          <Route path="/hotels" element={<AllStays />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/hotel/:id" element={<HotelDetails />} /> {/* अतिरिक्त सुरक्षा के लिए ताकि दोनों राउट काम करें */}
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<ComingSoon />} />
          <Route path="/details/:category/:id" element={<DetailsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mytrips" element={<MyTrips />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* 🔒 PROTECTED LIST PROPERTY ROUTE */}
          <Route 
            path="/list-property" 
            element={
              <ProtectedRoute>
                <ListProperty />
              </ProtectedRoute>
            } 
          />

          <Route path="/terms" element={<Terms />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
}