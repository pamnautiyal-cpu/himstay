import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ यह ज़रूरी है

const firebaseConfig = {
  // यहाँ अपना वो कोड पेस्ट करें जो Firebase ने आपको दिया था
  apiKey: "YOUR_API_KEY",
  authDomain: "thehimalayans-in.firebaseapp.com",
  projectId: "thehimalayans-in",
  storageBucket: "thehimalayans-in.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

// पुराना डेटाबेस वाला कोड सुरक्षित है
export const db = getFirestore(app);

// यह नया स्टोरेज वाला कोड है जो फाइल अपलोड के लिए चाहिए
export const storage = getStorage(app);