import React from "react";

export default function Blogs() {
  const allBlogs = [
    { title: "12 Jyotirlinga Name with Photos", category: "EVENTS", img: "https://images.unsplash.com/photo-1583937107767-f31f9b3ec763?w=500" },
    { title: "51 Shakti Peeth List", category: "EVENTS", img: "https://images.unsplash.com/photo-1599666433231-0570077c5c16?w=500" },
    { title: "The Himalayans.in से फायदे", category: "EVENTS", img: "https://images.unsplash.com/photo-1544644181-1484b3fdf362?w=500" },
    // यहाँ आप और भी ब्लॉग्स जोड़ सकते हैं
  ];

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "auto" }}>
      <h1>All Blogs & News</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", marginTop: "30px" }}>
        {allBlogs.map((blog, index) => (
          <div key={index} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "15px" }}>
            <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            <h3 style={{ marginTop: "10px" }}>{blog.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}