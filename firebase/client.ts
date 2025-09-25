// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvh57VLScpbykFB0KUAhFj3t0AziN_VU8",
  authDomain: "ai-interview-20dd7.firebaseapp.com",
  projectId: "ai-interview-20dd7",
  storageBucket: "ai-interview-20dd7.firebasestorage.app",
  messagingSenderId: "1047150804056",
  appId: "1:1047150804056:web:73f05aa7de555f88061e2d",
  measurementId: "G-KNJYF9RVKX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);