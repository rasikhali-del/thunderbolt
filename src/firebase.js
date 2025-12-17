import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "thunderbolts-cricket.firebaseapp.com",
  projectId: "thunderbolts-cricket",
  storageBucket: "thunderbolts-cricket.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firebase services
export { db, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot };
export default app;
