import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export default function BlogDetail() {
  const { id } = useParams();
  
  const blogData = {
    "jyotirlinga": { title: "12 Jyotirlinga Name with Photos", content: "Jyotirlinga is a Hindu shrine dedicated to Lord Shiva...", img: "https://images.unsplash.com/photo-1583937107767-f31f9b3ec763?w=800", comments: [] },
    "shakti-peeth": { title: "51 Shakti Peeth List", content: "Once Sati Mata's father...", img: "https://images.unsplash.com/photo-1599666433231-0570077c5c16?w=800", comments: [] },
    "yatradham-benefits": { title: "The Himalayans.in से फायदे", content: "YatraDham.org एक बड़ा ऑनलाइन प्लेटफॉर्म है...", img: "https://images.unsplash.com/photo-1544644181-1484b3fdf362?w=800", comments: [] }
  };

  // यहाँ सुरक्षा जोड़ दी है: अगर Firebase में डेटा नहीं है, तो लोकल डेटा ही रहेगा
  const [blog, setBlog] = useState(blogData[id] || null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data());
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const postComment = async () => {
    if (!comment.trim()) return alert("Comment khali hai!");
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, {
      comments: arrayUnion({ text: comment, date: new Date().toLocaleDateString() })
    });
    setComment("");
    window.location.reload(); 
  };

  // अगर डेटा लोड हो चुका है और फिर भी ब्लॉग नहीं मिला (यानी न Firebase में है न लोकल में)
  if (!loading && !blog) return <div style={{ padding: "50px", textAlign: "center" }}>Blog nahi mila!</div>;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "auto" }}>
      {/* अगर लोडिंग हो रही है तो ये दिखाएं, ताकि खाली पेज न दिखे */}
      {loading ? (
        <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>
      ) : (
        <>
          <Helmet>
            <title>{blog.title} | The Himalayans</title>
            <meta name="description" content={blog.content ? blog.content.substring(0, 160) : "Read our latest blog on The Himalayans."} />
          </Helmet>

          <img src={blog.img} alt={blog.title} style={{ width: "100%", borderRadius: "12px" }} />
          <h1 style={{ marginTop: "20px" }}>{blog.title}</h1>
          <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>{blog.content}</p>
          
          <div style={{ marginTop: "40px", borderTop: "2px solid #f0f0f0", paddingTop: "30px" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>Comments</h3>
            <textarea 
                placeholder="Apna vichar likhein..."
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                style={{ width: "100%", height: "100px", padding: "15px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "16px", marginBottom: "15px", boxSizing: "border-box" }}
            />
            <button onClick={postComment} style={{ padding: "12px 25px", background: "#f97316", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                Post Comment
            </button>
            
            <div style={{ marginTop: "30px" }}>
                {blog.comments?.map((c, i) => (
                    <div key={i} style={{ background: "#ffffff", padding: "15px", marginBottom: "15px", borderRadius: "10px", border: "1px solid #f0f0f0", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                      <p style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#333" }}>{c.text}</p>
                      <small style={{ color: "#999", fontSize: "12px" }}>{c.date}</small>
                    </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}