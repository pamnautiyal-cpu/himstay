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
      textAlign: "center", 
      padding: "20px", 
      marginTop: "-40px", // हीरो सेक्शन के थोड़ा करीब लाने के लिए
      marginBottom: "20px",
      fontSize: "18px", 
      fontWeight: "bold",
      color: "#006ce4" // इसे थोड़ा डार्क और साफ नीले रंग में किया है
    }}>
      Live Visitors: <span>{visitCount}</span>
    </div>
  );
}