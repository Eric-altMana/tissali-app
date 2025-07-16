
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);


{/* 

  apiKey: "AIzaSyAwhJxQLxpRZ-T6hpkv9qSkzbgGoRCb7B0",
  authDomain: "tissali-app.firebaseapp.com",
  projectId: "tissali-app",
  storageBucket: "tissali-app.firebasestorage.app",
  messagingSenderId: "363310207199",
  appId: "1:363310207199:web:339c18371b7bb3d5e1d96a"

*/}