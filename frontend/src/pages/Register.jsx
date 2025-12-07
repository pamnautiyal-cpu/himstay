import { useState } from "react";
import { registerUser } from "../api/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    setMsg(res.data.message || "Registered");
  };

  return (
    <div className="hs-center-wrapper">
      <div className="hs-form-card">
        <h2 className="hs-form-title">Create your HimStay ID</h2>
        <p className="hs-form-description">
          One account to manage all your hill-station trips and stays.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="hs-form-field">
            <label className="hs-label">Full name</label>
            <input
              className="hs-input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="hs-form-field">
            <label className="hs-label">Email</label>
            <input
              className="hs-input"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="hs-form-field">
            <label className="hs-label">Password</label>
            <input
              className="hs-input"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="hs-btn-primary" style={{ width: "100%", marginTop: 6 }}>
            Sign up
          </button>
        </form>

        {msg && (
          <p style={{ marginTop: 10, fontSize: 13, color: "#4b5563" }}>{msg}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
