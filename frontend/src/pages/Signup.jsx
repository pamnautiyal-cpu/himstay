import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userData = {
        uid: user.uid,
        email: user.email,
        name: "User"
      };

      if (userDocSnap.exists()) {
        userData = userDocSnap.data();
      }

      localStorage.setItem("user", JSON.stringify(userData));

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Invalid credentials or user not found!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "30px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ marginBottom: "20px", color: "#1e293b", textAlign: "center" }}>Login</h2>

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Email Address</label>
      <input 
        type="email" 
        placeholder="e.g. user@gmail.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", margin: "6px 0 14px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
      />

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Password</label>
      <input 
        type="password" 
        placeholder="Enter your password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", margin: "6px 0 20px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
      />

      <button 
        onClick={handleLogin}
        disabled={loading}
        style={{ width: "100%", padding: "14px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "15px", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}