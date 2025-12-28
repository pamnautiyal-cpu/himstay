import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

export default function AdminAddHotel() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    price: "",
    rating: "",
    image: "",
    description: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${BACKEND_URL}/api/hotels/add`, form)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setForm({
          name: "",
          city: "",
          price: "",
          rating: "",
          image: "",
          description: "",
        });
      })
      .catch((err) => {
        alert("Error adding hotel");
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <div style={{ padding: 60, maxWidth: 700, margin: "0 auto" }}>
      <h1>Add New Hotel (Admin)</h1>

      {success && (
        <p style={{ color: "green", marginBottom: 20 }}>
          ✅ Hotel added successfully
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: 16,
          background: "#fff",
          padding: 30,
          borderRadius: 16,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        <input name="name" placeholder="Hotel Name" value={form.name} onChange={handleChange} required />
        <input name="city" placeholder="City (Mussoorie)" value={form.city} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price per night" value={form.price} onChange={handleChange} required />
        <input name="rating" type="number" step="0.1" placeholder="Rating (4.5)" value={form.rating} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" rows={4} value={form.description} onChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 16,
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Add Hotel"}
        </button>
      </form>
    </div>
  );
}
