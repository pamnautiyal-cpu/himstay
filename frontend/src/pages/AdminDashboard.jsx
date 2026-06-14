import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

export default function AdminDashboard() {
  const [blog, setBlog] = useState({ id: "", title: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false); // बटन को क्लिक होने से रोकने के लिए ताकि डबल सबमिट न हो

  const handleLogin = () => {
    if (password === "040788") {
      setIsAuth(true);
    } else {
      alert("Galat Password!");
    }
  };

  const saveBlog = async () => {
    // 1. Validation check
    if (!blog.id || !blog.title || !imageFile) {
      return alert("ID, Title aur Image file zaruri hai!");
    }
    
    setUploading(true); // बटन डिसेबल करें

    try {
      // 2. Storage Upload
      const storageRef = ref(storage, `blog_images/${blog.id}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);

      // 3. Firestore Save
      await setDoc(doc(db, "blogs", blog.id), {
        title: blog.title,
        content: blog.content,
        img: url,
        comments: [] 
      });

      alert("Blog successfully upload ho gaya!");
      setBlog({ id: "", title: "", content: "" });
      setImageFile(null);
      // फाइल इनपुट को क्लियर करने के लिए जरूरी है कि ब्राउज़र रिफ्रेश हो या स्टेट हैंडल हो
    } catch (e) {
      console.error("Firebase Error: ", e);
      alert("Error aayi: " + e.message);
    } finally {
      setUploading(false); // बटन वापस इनेबल करें
    }
  };

  if (!isAuth) {
    return (
      <div style={{ padding: "100px", textAlign: "center", maxWidth: "400px", margin: "auto" }}>
        <h2>Admin Access</h2>
        <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
        <button onClick={handleLogin} style={{ padding: "10px 20px", background: "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Panel - New Blog</h1>
      <input placeholder="Blog ID" value={blog.id} onChange={(e) => setBlog({...blog, id: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <input placeholder="Title" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <textarea placeholder="Content" value={blog.content} onChange={(e) => setBlog({...blog, content: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0", height: "150px" }} />
      
      <label>Select Image:</label>
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ display: "block", margin: "10px 0" }} />
      
      <button 
        onClick={saveBlog} 
        disabled={uploading} // बटन क्लिक न हो जब अपलोडिंग चल रही हो
        style={{ padding: "10px 20px", background: uploading ? "#ccc" : "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: uploading ? "not-allowed" : "pointer" }}
      >
        {uploading ? "Uploading..." : "Post Blog"}
      </button>
    </div>
  );
}