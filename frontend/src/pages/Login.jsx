import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 🎯 Dynamic Redirect Target (List Property page agar vahan se aaye hain)
  const redirectTo = location.state?.from || "/list-property";

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setMessage("Please enter both email and password!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // LocalStorage mein User Info Save karein
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName || email.split("@")[0]
      }));

      // Firestore mein Admin Sync
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || email.split("@")[0],
        lastLogin: new Date().toISOString()
      }, { merge: true });
      
      setMessage("Login successful!");

      // Redirection to target page
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 800);
      
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Invalid credentials or user not found!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "30px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ marginBottom: "20px", color: "#1e293b", textAlign: "center" }}>Login to Your Account</h2>

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", display: "block", textAlign: "left" }}>Email Address</label>
      <input
        type="email"
        placeholder="e.g. user@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", margin: "6px 0 14px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }}
      />

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", display: "block", textAlign: "left" }}>Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", margin: "6px 0 14px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          background: "#0ea5e9",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "15px",
          marginTop: "10px",
          boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)"
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {message && <p style={{ marginTop: 15, color: message.includes("successful") ? "green" : "red", fontSize: "14px" }}>{message}</p>}

      {/* Switch to Signup Option */}
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#64748b" }}>
        Don't have an account?{" "}
        <span 
          onClick={() => navigate("/signup", { state: { from: redirectTo } })} 
          style={{ color: "#0ea5e9", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}
        >
          Sign Up Here
        </span>
      </div>
    </div>
  );
};

export default Login;