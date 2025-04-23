// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCblJTxInEHxLF_kUrWUkjITA2FkYUY7Bw",
	authDomain: "fix-das-d45db.firebaseapp.com",
	projectId: "fix-das-d45db",
	storageBucket: "fix-das-d45db.firebasestorage.app",
	messagingSenderId: "492462328994",
	appId: "1:492462328994:web:c2ff3f34b3fd59077c9bfb",
	measurementId: "G-LSTTGCEXKZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
