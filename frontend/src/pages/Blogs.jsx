import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // सर्च के लिए स्टेट

  const allBlogs = [
    { id: "jyotirlinga", title: "12 Jyotirlinga Name with Photos", category: "EVENTS", img: "https://images.unsplash.com/photo-1583937107767-f31f9b3ec763?w=500" },
    { id: "shakti-peeth", title: "51 Shakti Peeth List", category: "EVENTS", img: "https://images.unsplash.com/photo-1599666433231-0570077c5c16?w=500" },
    { id: "yatradham-benefits", title: "The Himalayans.in से फायदे", category: "EVENTS", img: "https://images.unsplash.com/photo-1544644181-1484b3fdf362?w=500" },
  ];

  // सर्च फिल्टर लगाने का लॉजिक
  const filteredBlogs = allBlogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "auto" }}>
      <h1>All Blogs & News</h1>
      
      {/* सर्च बार */}
      <input 
        type="text" 
        placeholder="Search blogs..." 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "100%", maxWidth: "400px", borderRadius: "5px", border: "1px solid #ddd", marginBottom: "20px" }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", marginTop: "10px" }}>
        {filteredBlogs.map((blog, index) => (
          <div 
            key={index} 
            onClick={() => navigate(`/blog/${blog.id}`)}
            style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "15px", cursor: "pointer", transition: "transform 0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            <p style={{ color: "#f97316", fontSize: "12px", fontWeight: "bold", marginTop: "10px" }}>{blog.category}</p>
            <h3 style={{ marginTop: "5px" }}>{blog.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}