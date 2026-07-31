import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; 
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    // 1. सभी फील्ड्स चेक करें
    if (!name || !email || !password || !phone) {
      return alert("Please fill all fields including mobile number!");
    }

    // 2. सख्त ईमेल वैलिडेशन (यह .comf या किसी भी गलत डोमेन को रोक देगा)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return alert("Please enter a valid and real email address (e.g., user@gmail.com)!");
    }

    // 3. सटीक 10-डिजिट मोबाइल नंबर चेक
    if (phone.length !== 10) {
      return alert("Mobile number must be exactly 10 digits!");
    }

    // 4. पासवर्ड की लंबाई चेक (कम से कम 6 अक्षर)
    if (password.length < 6) {
      return alert("Password must be at least 6 characters long!");
    }

    setLoading(true);
    try {
      // 1. Firebase Authentication में यूजर बनाएं
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore की 'users' कलेक्शन में डेटा सेव करें
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString()
      });

      // 3. localStorage में सेशन सेव करें
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: name,
        phone: phone
      }));

      alert("Account created successfully!");
      navigate("/"); 
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Password Reset Handler
  const handleForgotPassword = async () => {
    if (!email) {
      return alert("Please enter your registered email address first to reset password.");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link has been sent to your Gmail!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "30px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ marginBottom: "20px", color: "#1e293b", textAlign: "center" }}>Create Your Account</h2>

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Full Name</label>
      <input 
        placeholder="e.g. Ramesh Singh" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", margin: "6px 0 14px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
      />

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Valid Email (Gmail)</label>
      <input 
        type="email" 
        placeholder="e.g. user@gmail.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", margin: "6px 0 14px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
      />

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Mobile Number</label>
      <input 
        type="tel" 
        placeholder="e.g. 9876543210" 
        maxLength="10"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} 
        style={{ width: "100%", margin: "6px 0 14px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
      />

      <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Password</label>
      <input 
        type="password" 
        placeholder="At least 6 characters" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", margin: "6px 0 6px 0", padding: "12px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
      />

      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <span 
          onClick={handleForgotPassword}
          style={{ fontSize: "12px", color: "#0284c7", cursor: "pointer", fontWeight: "600" }}
        >
          Forgot Password?
        </span>
      </div>

      <button 
        onClick={handleSignup}
        disabled={loading}
        style={{ width: "100%", padding: "14px", background: "#0ea5e9", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "15px", boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)" }}
      >
        {loading ? "Creating Account..." : "Sign up"}
      </button>
    </div>
  );
}