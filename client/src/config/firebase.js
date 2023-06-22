// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "woay-ecommerce.firebaseapp.com",
    projectId: "woay-ecommerce",
    storageBucket: "woay-ecommerce.appspot.com",
    messagingSenderId: "725712479818",
    appId: "1:725712479818:web:60149e70742ba943be28b3",
    measurementId: "G-1DXB6D2R48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();