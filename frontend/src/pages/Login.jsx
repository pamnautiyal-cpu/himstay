import React, { useState } from "react";
import { loginUser } from "../api/api";
   // <-- Correct API import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      console.log("Login response:", res.data);

      if (res.data.token) {
        // Save token & user
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setMessage("Login successful!");

        // Redirect to dashboard after 1 second
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setMessage("Login failed!");
      }
    } catch (err) {
      console.log("Login error:", err);
      setMessage("Invalid credentials!");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, width: 250, marginTop: 20 }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 10, width: 250, marginTop: 10 }}
      />
      <br />

      <button
        onClick={handleLogin}
        style={{
          marginTop: 20,
          padding: "10px 30px",
          background: "red",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
};

export default Login;
