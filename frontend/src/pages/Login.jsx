import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Firebase इम्पोर्ट किया
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth फंक्शन

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // API कॉल के बजाय Firebase Auth का उपयोग
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      console.log("Login successful:", userCredential.user);

      setMessage("Login successful!");

      // डैशबोर्ड पर भेजें
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      
    } catch (err) {
      console.log("Login error:", err);
      setMessage("Invalid credentials or user not found!");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        type="email" // 'text' से बदलकर 'email' कर दिया ताकि सही इनपुट मिले
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