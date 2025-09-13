import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAXGUhz5qTkNWZDLmeSpTZyTg4qI30M28s",
  authDomain: "authentication-abeb9.firebaseapp.com",
  projectId: "authentication-abeb9",
  storageBucket: "authentication-abeb9.firebasestorage.app",
  messagingSenderId: "897221888572",
  appId: "1:897221888572:web:f96e26409cdb1b2ddc1139",
  measurementId: "G-MR0X76Z8DN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);