import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const whatsapp = "919410106470"; // ← अपना WhatsApp number
  const mail = "infothehimalayans@gmail.com"; // ← अपना email

  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  )}`;

  const mailLink = `mailto:${mail}?subject=Contact from The Himalayans&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
      <h2>Contact Us</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={input}
      />

      <input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ ...input, height: 100 }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <a href={waLink} target="_blank" style={btnGreen}>
          WhatsApp
        </a>
        <a href={mailLink} style={btnBlue}>
          Email
        </a>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
};

const btnGreen = {
  flex: 1,
  background: "green",
  color: "#fff",
  textAlign: "center",
  padding: 10,
  textDecoration: "none",
};

const btnBlue = {
  flex: 1,
  background: "blue",
  color: "#fff",
  textAlign: "center",
  padding: 10,
  textDecoration: "none",
};

export default Contact;
