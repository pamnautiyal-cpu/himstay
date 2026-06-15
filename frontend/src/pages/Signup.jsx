import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // पेज बदलने के लिए
import { auth } from "../firebase"; // अपना firebase पाथ चेक कर लें
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) return alert("Please fill all fields");
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/"); // साइनअप के बाद होम पेज पर भेजें
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", padding: "20px" }}>
      <h2>Create your account</h2>

      <input 
        placeholder="Full Name" 
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", margin: 8, padding: 10, boxSizing: "border-box" }} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", margin: 8, padding: 10, boxSizing: "border-box" }} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", margin: 8, padding: 10, boxSizing: "border-box" }} 
      />

      <button 
        onClick={handleSignup}
        style={{ width: "100%", padding: 12, marginTop: 12, background: "#006ce4", color: "white", border: "none", cursor: "pointer" }}
      >
        Sign up
      </button>
    </div>
  );
}