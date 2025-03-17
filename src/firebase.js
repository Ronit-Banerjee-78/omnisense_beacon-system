

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCKfTqQ9oiXdb8LMtREG_9Qurt7OBAIfjM",
  authDomain: "electricsensor-e432a.firebaseapp.com",
  databaseURL: "https://electricsensor-e432a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "electricsensor-e432a",
  storageBucket: "electricsensor-e432a.firebasestorage.app",
  messagingSenderId: "408581622472",
  appId: "1:408581622472:web:1acd0fb45fa69b6c9533fd",
  measurementId: "G-PFY7KKSTEC"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
