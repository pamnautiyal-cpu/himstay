import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="hs-dashboard">
      <div style={{ marginBottom: 32 }}>
        <div className="hs-dashboard-subtitle">Get in touch</div>
        <h1 className="hs-dashboard-title">Contact The Himalayans</h1>
        <p className="hs-dashboard-text">
          Planning a mountain escape? We’d love to help you.
        </p>
      </div>

      <div className="hs-contact-grid">
        <form className="hs-card" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: 14 }}>Send us a message</h2>

          <input
            className="hs-input"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="hs-input"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="hs-input"
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            className="hs-input"
            rows="4"
            name="message"
            placeholder="Tell us about your trip…"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button className="hs-btn-primary" type="submit">
            Send Message
          </button>
        </form>

        <div className="hs-card hs-map-card">
          <h2 style={{ marginBottom: 10 }}>Our locations</h2>
          <p className="hs-muted" style={{ marginBottom: 12 }}>
            Himachal · Uttarakhand · Mountain regions
          </p>

          <iframe
            title="The Himalayans Map"
            src="https://www.google.com/maps?q=Himachal%20Pradesh&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
