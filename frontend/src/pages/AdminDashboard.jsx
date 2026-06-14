import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

export default function AdminDashboard() {
  const [blog, setBlog] = useState({ id: "", title: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const [pendingHotels, setPendingHotels] = useState([]);
  const [activeHotels, setActiveHotels] = useState([]); // ✅ Active प्रॉपर्टीज़ के लिए

  useEffect(() => {
    if (isAuth) {
      // पेंडिंग होटल्स फेच करें
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/pending`)
        .then((res) => setPendingHotels(res.data))
        .catch((err) => console.error(err));

      // अप्रूव्ड होटल्स फेच करें (Manage के लिए)
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/`)
        .then((res) => setActiveHotels(res.data.filter(h => h.isApproved)))
        .catch((err) => console.error(err));
    }
  }, [isAuth]);

  const approveHotel = async (id) => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/approve/${id}`);
    alert("Property Approved!");
    window.location.reload(); // पेज रिफ्रेश ताकि लिस्ट अपडेट हो जाए
  };

  const deleteHotel = async (id) => {
    if (window.confirm("क्या आप वाकई इस प्रॉपर्टी को डिलीट करना चाहते हैं?")) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/${id}`);
      alert("Property deleted!");
      window.location.reload();
    }
  };

  const handleLogin = () => {
    if (password === "040788") {
      setIsAuth(true);
    } else {
      alert("Galat Password!");
    }
  };

  const saveBlog = async () => {
    if (!blog.id || !blog.title || !imageFile) {
      return alert("ID, Title aur Image file zaruri hai!");
    }
    
    setUploading(true);
    try {
      const storageRef = ref(storage, `blog_images/${blog.id}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);

      await setDoc(doc(db, "blogs", blog.id), {
        title: blog.title,
        content: blog.content,
        img: url,
        comments: [] 
      });

      alert("Blog successfully upload ho gaya!");
      setBlog({ id: "", title: "", content: "" });
      setImageFile(null);
    } catch (e) {
      console.error("Firebase Error: ", e);
      alert("Error aayi: " + e.message);
    } finally {
      setUploading(false);
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
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      {/* BLOG SECTION */}
      <h1>Admin Panel - New Blog</h1>
      <input placeholder="Blog ID" value={blog.id} onChange={(e) => setBlog({...blog, id: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <input placeholder="Title" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <textarea placeholder="Content" value={blog.content} onChange={(e) => setBlog({...blog, content: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0", height: "150px" }} />
      <label>Select Image:</label>
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ display: "block", margin: "10px 0" }} />
      <button onClick={saveBlog} disabled={uploading} style={{ padding: "10px 20px", background: uploading ? "#ccc" : "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: uploading ? "not-allowed" : "pointer" }}>
        {uploading ? "Uploading..." : "Post Blog"}
      </button>

      <hr style={{ margin: "50px 0" }} />

      {/* PENDING HOTELS */}
      <h1>Pending Property Approvals</h1>
      {pendingHotels.map(hotel => (
        <div key={hotel._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px", borderRadius: "8px" }}>
          <h3>{hotel.name}</h3>
          <p>{hotel.city} - ₹{hotel.price}</p>
          <button onClick={() => approveHotel(hotel._id)} style={{ background: "green", color: "white", padding: "8px" }}>Approve</button>
        </div>
      ))}

      <hr style={{ margin: "50px 0" }} />

      {/* ACTIVE HOTELS (DELETE SECTION) */}
      <h1>Manage Active Properties</h1>
      {activeHotels.map(hotel => (
        <div key={hotel._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
          <span>{hotel.name}</span>
          <button onClick={() => deleteHotel(hotel._id)} style={{ background: "red", color: "white", padding: "8px" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}