// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYzQBz6uW118XViVqZZwaDyHxl22XINWY",
  authDomain: "myweb-71e9f.firebaseapp.com",
  projectId: "myweb-71e9f",
  storageBucket: "myweb-71e9f.firebasestorage.app",
  messagingSenderId: "352911692841",
  appId: "1:352911692841:web:acae613e0200acee473838",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); // Store the Firebase app instance
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

// Export the app instance along with other modules
export { firebaseApp, auth, googleProvider, db };
