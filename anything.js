import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getFirestore, getDocs, getDoc, collection, doc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, deleteUser, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const firebaseConfig = {
    apiKey: "AIzaSyDJUrj9TfWSyTB2S7qwp52QALGeL8iGTL4",
    authDomain: "klops-45d5f.firebaseapp.com",
    projectId: "klops-45d5f",
    storageBucket: "klops-45d5f.appspot.com",
    messagingSenderId: "385204185900",
    appId: "1:385204185900:web:bf37afb6bfbffb6cbf5a89",
    measurementId: "G-TKKY1FTL49"
};