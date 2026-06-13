import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export default function BlogDetail() {
  const { id } = useParams();
  
  const blogData = {
    "jyotirlinga": { title: "12 Jyotirlinga Name with Photos", content: "Jyotirlinga is a Hindu shrine dedicated to Lord Shiva...", img: "https://images.unsplash.com/photo-1583937107767-f31f9b3ec763?w=800", comments: [] },
    "shakti-peeth": { title: "51 Shakti Peeth List", content: "Once Sati Mata's father...", img: "https://images.unsplash.com/photo-1599666433231-0570077c5c16?w=800", comments: [] },
    "yatradham-benefits": { title: "The Himalayans.in से फायदे", content: "YatraDham.org एक बड़ा ऑनलाइन प्लेटफॉर्म है...", img: "https://images.unsplash.com/photo-1544644181-1484b3fdf362?w=800", comments: [] }
  };

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

  if (!blog) return <div style={{ padding: "50px", textAlign: "center" }}>Blog nahi mila!</div>;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "auto" }}>
      <img src={blog.img} alt={blog.title} style={{ width: "100%", borderRadius: "12px" }} />
      <h1>{blog.title}</h1>
      <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>{blog.content}</p>
      
      {/* Firebase Comments */}
      <div style={{ marginTop: "50px", borderTop: "2px solid #eee", paddingTop: "20px" }}>
        <h3>Comments</h3>
        <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            style={{ width: "100%", padding: "10px" }} 
            placeholder="Apna comment likhein..."
        />
        <button onClick={postComment} style={{ marginTop: "10px" }}>Post Comment</button>
        
        <div style={{ marginTop: "20px" }}>
            {blog.comments?.map((c, i) => (
                <p key={i} style={{ background: "#f9f9f9", padding: "10px" }}>{c.text}</p>
            ))}
        </div>
      </div>
    </div>
  );
}