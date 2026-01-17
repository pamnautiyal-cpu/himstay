import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/hotels") {
      document.body.classList.add("no-hero");
    } else {
      document.body.classList.remove("no-hero");
    }
  }, [location.pathname]);

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
