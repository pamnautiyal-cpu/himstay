import React, { useEffect, useState } from "react";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // सुनिश्चित करें कि firebase.js से db एक्सपोर्ट हो रहा है

export default function VisitorCounter() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const docRef = doc(db, "site_stats", "visitor_data");

    // पेज लोड होते ही विजिटर बढ़ाएं
    updateDoc(docRef, { total_visits: increment(1) });

    // रीयल-टाइम में डेटा सुनें
    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setVisitCount(doc.data().total_visits);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "10px", color: "#666", fontSize: "14px" }}>
      Total Visits: <strong>{visitCount}</strong>
    </div>
  );
}