import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // ✅ LOGIC UPDATE: Firebase login ke baad localStorage mein user save karein
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName || email.split("@")[0]
      }));

      // ✅ ADMIN SYNC: Firestore ki 'users' collection mein bhi data save karein taaki Admin Dashboard mein dikhe
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || email.split("@")[0],
        lastLogin: new Date().toISOString()
      }, { merge: true });
      
      console.log("Login successful:", user);
      setMessage("Login successful!");

      // डैशबोर्ड या होम पेज पर भेजें (आप चाहें तो यहाँ "/" या "/dashboard" रख सकते हैं)
      setTimeout(() => {
        navigate("/");
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
        type="email"
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