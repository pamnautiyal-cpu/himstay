import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./App.css"; // CSS import zaruri hai!

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Baki routes yahan add karte jao */}
      </Routes>
    </Layout>
  );
}