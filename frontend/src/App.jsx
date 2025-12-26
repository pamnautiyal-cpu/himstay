import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TrekDetails from "./pages/TrekDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
