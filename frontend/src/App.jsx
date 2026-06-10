import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages Import karo (Check kar lo ki folder path yahi hai)
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import MyTrips from "./pages/MyTrips";
import Contact from "./pages/Contact";
import ListProperty from "./pages/ListProperty";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<AllStays />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  );
}