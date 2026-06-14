import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminDashboard() {
  const [blog, setBlog] = useState({ id: "", title: "", content: "", img: "" });
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");

  // पासवर्ड चेक करने का फंक्शन
  const handleLogin = () => {
    if (password === "admin123") { // यहाँ अपना पासवर्ड रखें
      setIsAuth(true);
    } else {
      alert("Galat Password!");
    }
  };

  const saveBlog = async () => {
    if (!blog.id || !blog.title) return alert("ID aur Title zaruri hai!");
    try {
      await setDoc(doc(db, "blogs", blog.id), {
        title: blog.title,
        content: blog.content,
        img: blog.img,
        comments: [] 
      });
      alert("Blog successfully upload ho gaya!");
      setBlog({ id: "", title: "", content: "", img: "" });
    } catch (e) {
      alert("Error aayi: " + e.message);
    }
  };

  // 1. अगर ऑथेंटिकेटेड नहीं है, तो लॉगिन स्क्रीन दिखाएं
  if (!isAuth) {
    return (
      <div style={{ padding: "100px", textAlign: "center", maxWidth: "400px", margin: "auto" }}>
        <h2>Admin Access</h2>
        <input 
          type="password" 
          placeholder="Enter Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button onClick={handleLogin} style={{ padding: "10px 20px", background: "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Login
        </button>
      </div>
    );
  }

  // 2. लॉगिन होने के बाद ब्लॉग पोस्टिंग फॉर्म दिखाएं
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Panel - New Blog</h1>
      <input placeholder="Blog ID (e.g. kedarnath-yatra)" value={blog.id} onChange={(e) => setBlog({...blog, id: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <input placeholder="Title" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <textarea placeholder="Content" value={blog.content} onChange={(e) => setBlog({...blog, content: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0", height: "150px" }} />
      <input placeholder="Image URL" value={blog.img} onChange={(e) => setBlog({...blog, img: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <button onClick={saveBlog} style={{ padding: "10px 20px", background: "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Post Blog</button>
    </div>
  );
}