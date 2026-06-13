import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams(); // URL से आईडी पकड़ने के लिए

  const blogData = {
    "jyotirlinga": { title: "12 Jyotirlinga Name with Photos", content: "Jyotirlinga is a Hindu shrine dedicated to Lord Shiva...", img: "https://images.unsplash.com/photo-1583937107767-f31f9b3ec763?w=800" },
    "shakti-peeth": { title: "51 Shakti Peeth List", content: "Once Sati Mata's father Daksha Prajapati organized a Yagya...", img: "https://images.unsplash.com/photo-1599666433231-0570077c5c16?w=800" },
    "yatradham-benefits": { title: "The Himalayans.in से फायदे", content: "YatraDham.org एक बड़ा ऑनलाइन प्लेटफॉर्म है...", img: "https://images.unsplash.com/photo-1544644181-1484b3fdf362?w=800" }
  };

  const blog = blogData[id];

  useEffect(() => {
    // Disqus लोड करने का लॉजिक
    const disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = id;
    };
    
    (function() { 
      var d = document, s = d.createElement('script');
      s.src = 'https://the-himalayans.disqus.com/embed.js'; // यहाँ अपना Disqus shortname अपडेट करें
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, [id]);

  if (!blog) return <div style={{ padding: "50px", textAlign: "center" }}>Blog not found!</div>;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "auto" }}>
      <img src={blog.img} alt={blog.title} style={{ width: "100%", borderRadius: "12px" }} />
      <h1 style={{ marginTop: "20px" }}>{blog.title}</h1>
      <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>{blog.content}</p>
      
      {/* यहीं Disqus कमेंट सेक्शन लोड होगा */}
      <div style={{ marginTop: "50px" }}>
        <h3>Comments</h3>
        <div id="disqus_thread"></div>
      </div>
    </div>
  );
}