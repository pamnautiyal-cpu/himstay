import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://himstay.onrender.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      setStatus("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong ❌");
    }
  };

  return (
    <div style={{ padding: "120px 20px", maxWidth: 500, margin: "auto" }}>
      <h2 style={{ marginBottom: 20 }}>Contact Us</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
          style={{ width: "100%", padding: 12, marginBottom: 10 }}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
          style={{ width: "100%", padding: 12, marginBottom: 10 }}
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          required
          rows={4}
          style={{ width: "100%", padding: 12, marginBottom: 14 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 14,
            background: "#2563eb",
            color: "#fff",
            border: "none",
          }}
        >
          Send Message
        </button>
      </form>

      <p style={{ marginTop: 12 }}>{status}</p>
    </div>
  );
}

export default Contact;
