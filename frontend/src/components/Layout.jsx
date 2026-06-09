import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="app-main-wrapper">
      <Navbar />
      {/* Ye main container hai jo content ko center karega */}
      <main className="page-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}