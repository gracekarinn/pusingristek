// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzwWEMNWfCKPQa0NtRwGMZRimoaFk2xQI",
  authDomain: "ristek-finance-tracker.firebaseapp.com",
  projectId: "ristek-finance-tracker",
  storageBucket: "ristek-finance-tracker.appspot.com",
  messagingSenderId: "243158407703",
  appId: "1:243158407703:web:2d2f3f8f58dbe4852d5a52",
  measurementId: "G-ZHKS33PR02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}