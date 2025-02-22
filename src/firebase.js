// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blogging-app-a3e64.firebaseapp.com",
  projectId: "blogging-app-a3e64",
  storageBucket: "blogging-app-a3e64.firebasestorage.app",
  messagingSenderId: "1041813933864",
  appId: "1:1041813933864:web:7c3468f3229fe17c090a1d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);