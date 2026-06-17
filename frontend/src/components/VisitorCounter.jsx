import React, { useEffect, useState } from "react";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function VisitorCounter() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const docRef = doc(db, "site_stats", "visitor_data");
    updateDoc(docRef, { total_visits: increment(1) });
    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setVisitCount(doc.data().total_visits);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "8px", 
      fontSize: "13px", 
      color: "#475569" 
    }}>
      {/* यह छोटा सा गोला रीयल-टाइम GIF जैसा फील देगा */}
      <span style={{ 
        height: "8px", 
        width: "8px", 
        backgroundColor: "#22c55e", 
        borderRadius: "50%", 
        display: "inline-block",
        animation: "pulse 1.5s infinite"
      }}></span>
      
      <span>Visitors: <strong>{visitCount}</strong></span>

      {/* Pulsing Animation स्टाइल */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
      `}</style>
    </div>
  );
}