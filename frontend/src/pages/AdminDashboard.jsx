import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; // storage इम्पोर्ट किया है

export default function AdminDashboard() {
  const [blog, setBlog] = useState({ id: "", title: "", content: "" });
  const [imageFile, setImageFile] = useState(null); // फाइल के लिए नया स्टेट
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");

  // पासवर्ड लॉजिक वैसा ही है (पुराना सुरक्षित है)
  const handleLogin = () => {
    if (password === "040788") {
      setIsAuth(true);
    } else {
      alert("Galat Password!");
    }
  };

  const saveBlog = async () => {
    if (!blog.id || !blog.title || !imageFile) return alert("ID, Title aur Image file zaruri hai!");
    
    try {
      // 1. नई फाइल को Firebase Storage में अपलोड करें
      const storageRef = ref(storage, `blog_images/${blog.id}`);
      await uploadBytes(storageRef, imageFile);
      
      // 2. अपलोड की गई इमेज का URL निकालें
      const url = await getDownloadURL(storageRef);

      // 3. Firestore में डेटा सेव करें (पुराना स्ट्रक्चर बरकरार है)
      await setDoc(doc(db, "blogs", blog.id), {
        title: blog.title,
        content: blog.content,
        img: url, // यहाँ URL सेव होगा
        comments: [] 
      });

      alert("Blog successfully upload ho gaya!");
      setBlog({ id: "", title: "", content: "" });
      setImageFile(null);
    } catch (e) {
      alert("Error aayi: " + e.message);
    }
  };

  // लॉगिन स्क्रीन
  if (!isAuth) {
    return (
      <div style={{ padding: "100px", textAlign: "center", maxWidth: "400px", margin: "auto" }}>
        <h2>Admin Access</h2>
        <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
        <button onClick={handleLogin} style={{ padding: "10px 20px", background: "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Login</button>
      </div>
    );
  }

  // ब्लॉग फॉर्म
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Panel - New Blog</h1>
      <input placeholder="Blog ID" value={blog.id} onChange={(e) => setBlog({...blog, id: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <input placeholder="Title" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <textarea placeholder="Content" value={blog.content} onChange={(e) => setBlog({...blog, content: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0", height: "150px" }} />
      
      {/* फाइल अपलोड बटन */}
      <label>Select Image:</label>
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ display: "block", margin: "10px 0" }} />
      
      <button onClick={saveBlog} style={{ padding: "10px 20px", background: "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Post Blog</button>
    </div>
  );
}