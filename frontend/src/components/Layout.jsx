import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // ✅ Footer यहाँ इम्पोर्ट हो गया

export default function Layout({ children }) {
  return (
    <div className="app-main-wrapper">
      <Navbar />
      
      {/* Ye main container hai jo content ko center karega */}
      <main className="page-content">
        {children}
      </main>
      
      {/* ✅ Footer को यहाँ Layout के अंदर रखा गया है, ताकि यह App.jsx में दोबारा न आए */}
      <Footer /> 
    </div>
  );
}