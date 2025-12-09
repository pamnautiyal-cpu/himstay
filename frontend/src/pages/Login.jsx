// frontend/src/pages/Login.jsx
import { useState } from "react";
import { loginUser } from "../api/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      console.log("Login response:", res.data);

      if (res.data && res.data.token) {
        // ✅ token mila = login success
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: res.data.token,
            user: res.data.user,
          })
        );
        setMsg("Login successful!");
      } else {
        // ✅ Backend ne koi message diya hoga, use dikha do
        setMsg(res.data?.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg("Login failed! Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ padding: "10px", margin: "5px", width: "250px" }}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ padding: "10px", margin: "5px", width: "250px" }}
          required
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            background: "#ff3d00",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}
    </div>
  );
}

export default Login;
