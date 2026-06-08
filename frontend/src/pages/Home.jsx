import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h1>🏔 Home</h1>

      <button
        onClick={() => navigate("/hotels")}
        style={{
          padding: 12,
          background: "#0ea5e9",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Go to Hotels
      </button>
    </div>
  );
}