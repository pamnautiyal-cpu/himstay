import React, { useState } from "react";

export default function BookingForm({ title }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const handleWhatsApp = () => {
    const msg = `Hello, I want to book:\n\n${title}\nName: ${name}\nPhone: ${phone}\nPreferred Date: ${date}`;
    const url = `https://wa.me/919410106470?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        marginTop: 40,
        padding: 24,
        borderRadius: 20,
        background: "#ffffff",
        boxShadow: "0 20px 45px rgba(15,23,42,0.15)",
      }}
    >
      <h3 style={{ marginBottom: 16 }}>📋 Book / Enquire</h3>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={inputStyle}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={handleWhatsApp}
        style={{
          marginTop: 16,
          width: "100%",
          padding: "14px 20px",
          borderRadius: 12,
          border: "none",
          background: "linear-gradient(135deg,#22c55e,#16a34a)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        📲 Book on WhatsApp
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #c7d2fe",
  fontSize: 14,
};
