import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminDashboard() {
  const [blog, setBlog] = useState({ id: "", title: "", content: "", img: "" });

  const saveBlog = async () => {
    if (!blog.id || !blog.title) return alert("ID aur Title zaruri hai!");
    try {
      await setDoc(doc(db, "blogs", blog.id), {
        title: blog.title,
        content: blog.content,
        img: blog.img,
        comments: [] // खाली कमेंट्स एरे के साथ शुरू करें
      });
      alert("Blog successfully upload ho gaya!");
      setBlog({ id: "", title: "", content: "", img: "" });
    } catch (e) {
      alert("Error aayi: " + e.message);
    }
  };

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