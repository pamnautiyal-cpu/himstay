import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDInqFYNEz1qSEjXqpGbPmKIQdqwHrICqU",
  authDomain: "thehimalayans-in.firebaseapp.com",
  projectId: "thehimalayans-in",
  storageBucket: "thehimalayans-in.appspot.com",
  messagingSenderId: "1011898592154",
  appId: "1:1011898592154:web:d053a25558430f870a6823",
  measurementId: "G-3LCR1GSFJ0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);