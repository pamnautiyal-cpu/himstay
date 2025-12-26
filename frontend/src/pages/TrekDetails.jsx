import React from "react";

export default function TrekDetail() {
  const section = {
    maxWidth: 1100,
    margin: "60px auto",
    padding: "0 20px",
  };

  const hero = {
    borderRadius: 28,
    padding: "70px 40px",
    background:
      "linear-gradient(135deg, rgba(2,6,23,0.75), rgba(2,6,23,0.45)), url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b') center/cover",
    color: "#fff",
    boxShadow: "0 35px 90px rgba(0,0,0,0.45)",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 22,
    marginTop: 30,
  };

  const card = {
    background: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 16px 45px rgba(15,23,42,0.18)",
  };

  const img = {
    width: "100%",
    height: 190,
    objectFit: "cover",
  };

  const pad = { padding: 18 };

  return (
    <div style={{ background: "#f4f8ff", minHeight: "100vh" }}>
      
      {/* HERO */}
      <section style={section}>
        <div style={hero}>
          <h1 style={{ fontSize: 44, fontWeight: 900 }}>
            Kedarkantha Trek
          </h1>
          <p style={{ fontSize: 18, maxWidth: 600, marginTop: 14 }}>
            One of the most beautiful winter treks in Uttarakhand
          </p>
        </div>
      </section>

      {/* TREK INFO */}
      <section style={section}>
        <h2>Trek Overview</h2>
        <p style={{ color: "#475569", maxWidth: 850 }}>
          Kedarkantha Trek is perfect for beginners and experienced trekkers.
          Snow-covered trails, pine forests and stunning Himalayan views
          make it a must-do adventure.
        </p>

        <div style={grid}>
          <div style={card}>
            <div style={pad}>⛰️ <strong>Altitude:</strong> 12,500 ft</div>
          </div>
          <div style={card}>
            <div style={pad}>📅 <strong>Duration:</strong> 5 Days</div>
          </div>
          <div style={
