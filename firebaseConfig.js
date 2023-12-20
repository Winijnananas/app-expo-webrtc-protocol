// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSxkIXQ6C6tFVzvx_FFUcEd-dCRtE7U3I",
  authDomain: "app-rtc-d7a32.firebaseapp.com",
  databaseURL: "https://app-rtc-d7a32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "app-rtc-d7a32",
  storageBucket: "app-rtc-d7a32.appspot.com",
  messagingSenderId: "438996640885",
  appId: "1:438996640885:web:b4eb02614e78461bea843c",
  measurementId: "G-X8D08NLP23"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firesotre_db = getFirestore(app); // Change variable name to avoid conflicts