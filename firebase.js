// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, 
  authDomain: "web3-twitter-orbit.firebaseapp.com",
  projectId: "web3-twitter-orbit",
  storageBucket: "web3-twitter-orbit.appspot.com",
  messagingSenderId: "815042048009",
  appId: "1:815042048009:web:a910e16e680475e495c8d8",
  measurementId: "G-G3D00YSFLN",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };