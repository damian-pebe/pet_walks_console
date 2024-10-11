// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuYcj4a1Jx1On89ZMH3x8UHPB6-rmxdjQ",
    authDomain: "petwalks-ef2a9.firebaseapp.com",
    projectId: "petwalks-ef2a9",
    storageBucket: "petwalks-ef2a9.appspot.com",
    messagingSenderId: "72556658495",
    appId: "1:72556658495:web:b677d9975e7b4fd4cf9d8a",
    measurementId: "G-SQ7QND68X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };  // Export auth and analytics if needed
