import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // 'db' इम्पोर्ट करना जरूरी है
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore के लिए

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !name) return alert("Please fill all fields");
    
    try {
      // 1. Firebase Authentication में यूजर बनाएं
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore की 'users' कलेक्शन में यूजर का डेटा सेव करें (ताकि Admin Panel में दिखे)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date().toISOString()
      });

      // 3. localStorage में भी सेशन सेव करें (ताकि ListProperty आदि काम करे)
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: name
      }));

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
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", margin: 8, padding: 10, boxSizing: "border-box" }} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", margin: 8, padding: 10, boxSizing: "border-box" }} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
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