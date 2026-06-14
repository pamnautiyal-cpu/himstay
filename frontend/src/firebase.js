import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  // अपना ओरिजिनल कॉन्फ़िगरेशन यहाँ रखें
  apiKey: "YOUR_API_KEY",
  authDomain: "thehimalayans-in.firebaseapp.com",
  projectId: "thehimalayans-in",
  storageBucket: "thehimalayans-in.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ हमने यहाँ 'export' जोड़ दिया है