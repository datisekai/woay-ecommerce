// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import config from ".";



const firebaseConfig = {
    apiKey: config.firebaseKey,
    authDomain: "woay-ecommerce.firebaseapp.com",
    projectId: "woay-ecommerce",
    storageBucket: "woay-ecommerce.appspot.com",
    messagingSenderId: "725712479818",
    appId: "1:725712479818:web:60149e70742ba943be28b3",
    measurementId: "G-1DXB6D2R48"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)