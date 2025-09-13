// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXGUhz5qTkNWZDLmeSpTZyTg4qI30M28s",
  authDomain: "authentication-abeb9.firebaseapp.com",
  projectId: "authentication-abeb9",
  storageBucket: "authentication-abeb9.firebasestorage.app",
  messagingSenderId: "897221888572",
  appId: "1:897221888572:web:f96e26409cdb1b2ddc1139",
  measurementId: "G-MR0X76Z8DN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);