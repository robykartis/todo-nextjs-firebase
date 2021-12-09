/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMKVD2ymxM4xjHK1a-TUjRo5JzQr9wQGo",
  authDomain: "nextjs-firebase-c99fe.firebaseapp.com",
  projectId: "nextjs-firebase-c99fe",
  storageBucket: "nextjs-firebase-c99fe.appspot.com",
  messagingSenderId: "803653694293",
  appId: "1:803653694293:web:80edfa9e782e033bfb35dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
