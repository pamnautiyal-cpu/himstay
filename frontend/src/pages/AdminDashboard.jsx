import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
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
  const [registeredUsers, setRegisteredUsers] = useState([]); 
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (isAuth) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/pending`)
        .then((res) => setPendingHotels(res.data))
        .catch((err) => console.error(err));

      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/`)
        .then((res) => setActiveHotels(res.data.filter(h => h.isApproved)))
        .catch((err) => console.error(err));

      const fetchUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          setRegisteredUsers(querySnapshot.docs.map(doc => doc.data()));
        } catch (err) { console.error("Error fetching users:", err); }
      };
      fetchUsers();
    }
  }, [isAuth]);

  const approveHotel = async (id) => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/approve/${id}`);
    alert("Property Approved & Live successfully!");
    window.location.reload();
  };

  const deleteHotel = async (id) => {
    if (window.confirm("क्या आप वाकई इस प्रॉपर्टी को रिजेक्ट/डिलीट करना चाहते हैं?")) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/${id}`);
      alert("Property rejected and deleted successfully!");
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
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {/* MOBILE MENU */}
      <div className="admin-mobile-menu" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("all")} style={tabBtnStyle}>All</button>
        <button onClick={() => setActiveTab("blogs")} style={tabBtnStyle}>Blogs</button>
        <button onClick={() => setActiveTab("users")} style={tabBtnStyle}>Users</button>
        <button onClick={() => setActiveTab("hotels")} style={tabBtnStyle}>Hotels</button>
      </div>

      {/* BLOG SECTION */}
      {(activeTab === "all" || activeTab === "blogs") && (
        <>
          <h1>Admin Panel - New Blog</h1>
          <input placeholder="Blog ID" value={blog.id} onChange={(e) => setBlog({...blog, id: e.target.value})} style={inputStyle} />
          <input placeholder="Title" value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})} style={inputStyle} />
          <textarea placeholder="Content" value={blog.content} onChange={(e) => setBlog({...blog, content: e.target.value})} style={{...inputStyle, height: "150px"}} />
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ display: "block", margin: "10px 0" }} />
          <button onClick={saveBlog} disabled={uploading} style={btnStyle}>{uploading ? "Uploading..." : "Post Blog"}</button>
          <hr style={{ margin: "50px 0" }} />
        </>
      )}
      
      {/* USERS SECTION */}
      {(activeTab === "all" || activeTab === "users") && (
        <div className="responsive-table-wrap">
          <h1>Registered Members ({registeredUsers.length})</h1>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
            <thead><tr style={{ background: "#f1f1f1" }}><th style={thStyle}>Name</th><th style={thStyle}>Email</th></tr></thead>
            <tbody>
              {registeredUsers.map((u, i) => (<tr key={i}><td style={tdStyle}>{u.name}</td><td style={tdStyle}>{u.email}</td></tr>))}
            </tbody>
          </table>
          <hr style={{ margin: "50px 0" }} />
        </div>
      )}
      
      {/* HOTELS SECTION */}
      {(activeTab === "all" || activeTab === "hotels") && (
        <>
          <h1>Pending Property Approvals</h1>
          {pendingHotels.length === 0 ? (
            <p style={{ color: "#64748b" }}>No pending properties to review.</p>
          ) : (
            pendingHotels.map(hotel => (
              <div key={hotel._id} style={{ border: "1px solid #cbd5e1", padding: "20px", marginBottom: "20px", borderRadius: "8px", background: "#fff" }}>
                
                {/* यूजर द्वारा अपलोड की गई तस्वीरें */}
                {hotel.images && hotel.images.length > 0 && (
                  <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "15px", paddingBottom: "5px" }}>
                    {hotel.images.map((img, index) => (
                      <img 
                        key={index} 
                        src={img} 
                        alt="Property Preview" 
                        style={{ width: "100px", height: "70px", objectFit: "cover", borderRadius: "6px", border: "1px solid #cbd5e1" }} 
                      />
                    ))}
                  </div>
                )}

                <h3 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>{hotel.name}</h3>
                <p style={{ margin: "5px 0", color: "#475569" }}><b>Location:</b> {hotel.city}, {hotel.state}</p>
                <p style={{ margin: "5px 0", color: "#475569" }}><b>Price:</b> ₹{hotel.price} / night</p>
                <p style={{ margin: "5px 0", color: "#475569" }}><b>Description:</b> {hotel.description || "No description provided."}</p>
                <p style={{ margin: "5px 0 15px 0", color: "#475569" }}><b>Contact/Owner:</b> {hotel.phone || hotel.email || "N/A"}</p>

                {/* एक्शन बटन: Approve और Reject/Delete */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    onClick={() => approveHotel(hotel._id)} 
                    style={{ background: "#16a34a", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Approve & Make Live
                  </button>

                  <button 
                    onClick={() => deleteHotel(hotel._id)} 
                    style={{ background: "#dc2626", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Reject / Delete
                  </button>
                </div>
              </div>
            ))
          )}

          <h1 style={{ marginTop: "40px" }}>Manage Active Properties</h1>
          {activeHotels.map(hotel => (
            <div key={hotel._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
              <span><b>{hotel.name}</b> ({hotel.city} - ₹{hotel.price})</span>
              <button onClick={() => deleteHotel(hotel._id)} style={{ background: "#dc2626", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const inputStyle = { display: "block", width: "100%", padding: "10px", margin: "10px 0" };
const thStyle = { padding: "10px", border: "1px solid #ddd", textAlign: "left" };
const tdStyle = { padding: "10px", border: "1px solid #ddd" };
const btnStyle = { padding: "10px 20px", background: "#f97316", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };
const tabBtnStyle = { padding: "8px 16px", background: "#e2e8f0", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };