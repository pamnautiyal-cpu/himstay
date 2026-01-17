import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />
      <MainRoutes />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
