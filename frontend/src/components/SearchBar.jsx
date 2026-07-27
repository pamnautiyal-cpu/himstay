import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Search() {
  const [listings, setListings] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";
  const city = searchParams.get("city") || "All";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  const filteredResults = listings.filter((item) => {
    const matchesCity = city === "All" || item.location?.toLowerCase() === city.toLowerCase();
    const matchesQuery = query === "" || 
      item.name?.toLowerCase().includes(query) || 
      item.location?.toLowerCase().includes(query) ||
      item.type?.toLowerCase().includes(query);

    return matchesCity && matchesQuery;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "30px auto", padding: "20px" }}>
      <button 
        onClick={() => navigate("/")} 
        style={{ marginBottom: "20px", padding: "8px 16px", background: "#cbd5e1", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
      >
        ← Back to Home
      </button>

      <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px", color: "#1e293b" }}>
        Search Results for "{query || city}"
      </h1>

      {filteredResults.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
          {filteredResults.map((h) => (
            <div 
              key={h.id} 
              onClick={() => navigate(`/details/${h.type}/${h.id}`)} 
              style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "0.3s" }}
            >
              <img src={h.image} alt={h.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "18px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "5px" }}>{h.name}</h3>
                <p style={{ fontSize: "14px", color: "#64748b" }}>📍 {h.location}</p>
                <p style={{ fontSize: "14px", color: "#0ea5e9", fontWeight: "600", marginTop: "8px" }}>₹ {h.price} / night</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "22px", color: "#334155", marginBottom: "10px" }}>Sorry, this page is not open / No results found</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>We couldn't find any listings matching your search. Try searching for another location or keyword.</p>
        </div>
      )}
    </div>
  );
}