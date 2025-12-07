import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setMsg(res.data.message || "Login successful!");

      if (res.data.user?._id) {
        localStorage.setItem("userId", res.data.user._id);
      }
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/dashboard");
    } catch (err) {
      setMsg("Login failed!");
    }
  };

  return (
    <div className="hs-center-wrapper">
      <div className="hs-form-card">
        <h2 className="hs-form-title">Welcome back 👋</h2>
        <p className="hs-form-description">
          Login to manage your trips, saved stays and bookings.
        </p>

        <form onSubmit={handleSubmit}>
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
            Log in
          </button>
        </form>

        {msg && (
          <p style={{ marginTop: 10, fontSize: 13, color: "#4b5563" }}>{msg}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
