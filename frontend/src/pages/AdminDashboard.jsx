import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; // collection, getDocs जोड़ दिया
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

export default function AdminDashboard() {
  const [blog, setBlog] = useState({ id: "", title: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const [pendingHotels, setPendingHotels] = useState([]);
  const [activeHotels, setActiveHotels] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]); // नया स्टेट

  useEffect(() => {
    if (isAuth) {
      // 1. पेंडिंग होटल्स
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/pending`)
        .then((res) => setPendingHotels(res.data))
        .catch((err) => console.error(err));

      // 2. अप्रूव्ड होटल्स
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/`)
        .then((res) => setActiveHotels(res.data.filter(h => h.isApproved)))
        .catch((err) => console.error(err));

      // 3. Firebase से Registered Users लाएं
      const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        setRegisteredUsers(querySnapshot.docs.map(doc => doc.data()));
      };
      fetchUsers();
    }
  }, [isAuth]);

  // ... (approveHotel, deleteHotel, handleLogin, saveBlog फंक्शन्स वही रहेंगे)
  const approveHotel = async (id) => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/approve/${id}`);
    alert("Property Approved!");
    window.location.reload();
  };

  const deleteHotel = async (id) => {
    if (window.confirm("क्या आप वाकई इस प्रॉपर्टी को डिलीट करना चाहते हैं?")) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/${id}`);
      alert("Property deleted!");
      window.location.reload();
    }
  };

  const handleLogin = () => {
    if (password === "040788") setIsAuth(true);
    else alert("Galat Password!");
  };

  const saveBlog = async () => {
    if (!blog.id || !blog.title || !imageFile) return alert("ID, Title aur Image file zaruri hai!");
    setUploading(true);
    try {
      const storageRef = ref(storage, `blog_images/${blog.id}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      await setDoc(doc(db, "blogs", blog.id), { title: blog.title, content: blog.content, img: url, comments: [] });
      alert("Blog successfully upload ho gaya!");
      setBlog({ id: "", title: "", content: "" }); setImageFile(null);
    } catch (e) { alert("Error: " + e.message); } finally { setUploading(false); }
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
      {/* ... (ब्लॉग इनपुट फील्ड्स वही रहेंगी) */}
      <input placeholder="Blog ID" value={blog.id} onChange={(e) => setBlog({...blog, id: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <input placeholder="Title" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0" }} />
      <textarea placeholder="Content" value={blog.content} onChange={(e) => setBlog({...blog, content: e.target.value})} style={{ display: "block", width: "100%", padding: "10px", margin: "10px 0", height: "150px" }} />
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ display: "block", margin: "10px 0" }} />
      <button onClick={saveBlog} disabled={uploading} style={{ padding: "10px 20px", background: "#f97316", color: "white", border: "none", borderRadius: "5px" }}>{uploading ? "Uploading..." : "Post Blog"}</button>

      <hr style={{ margin: "50px 0" }} />

      {/* NEW: REGISTERED USERS */}
      <h1>Registered Members ({registeredUsers.length})</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
        <thead><tr style={{ background: "#f1f1f1" }}><th style={thStyle}>Name</th><th style={thStyle}>Email</th></tr></thead>
        <tbody>
          {registeredUsers.map((u, i) => (<tr key={i}><td style={tdStyle}>{u.name}</td><td style={tdStyle}>{u.email}</td></tr>))}
        </tbody>
      </table>

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

      {/* ACTIVE HOTELS */}
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

const thStyle = { padding: "10px", border: "1px solid #ddd", textAlign: "left" };
const tdStyle = { padding: "10px", border: "1px solid #ddd" };