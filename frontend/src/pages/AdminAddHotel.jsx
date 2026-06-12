import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AdminAddHotel() {
  const [form, setForm] = useState({
    name: "", city: "", price: "", rating: "", description: "",
  });
  const [imageFile, setImageFile] = useState(null); // File ke liye alag state
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // FormData use karna zaroori hai jab file upload karte hain
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post(`${BACKEND_URL}/api/hotels/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setLoading(false);
      setForm({ name: "", city: "", price: "", rating: "", description: "" });
      setImageFile(null);
    } catch (err) {
      alert("Error adding hotel: " + err.message);
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 60, maxWidth: 700, margin: "0 auto" }}>
      <h1>Add New Hotel (Admin)</h1>
      {success && <p style={{ color: "green" }}>✅ Hotel added successfully!</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <input name="name" placeholder="Hotel Name" value={form.name} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="rating" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} />
        
        {/* Image URL ki jagah File input */}
        <input type="file" onChange={handleFileChange} accept="image/*" required />
        
        <textarea name="description" placeholder="Description" rows={4} value={form.description} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Hotel"}
        </button>
      </form>
    </div>
  );
}