// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjmsXFDKByU5hodYzwrxmV6bgp0PW-CWk",
  authDomain: "authentication-fe7ec.firebaseapp.com",
  projectId: "authentication-fe7ec",
  storageBucket: "authentication-fe7ec.firebasestorage.app",
  messagingSenderId: "387106670583",
  appId: "1:387106670583:web:f52833d1deb566fd3350f2",
  measurementId: "G-610Z6GGHMN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);