import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDJUrj9TfWSyTB2S7qwp52QALGeL8iGTL4",
    authDomain: "klops-45d5f.firebaseapp.com",
    projectId: "klops-45d5f",
    storageBucket: "klops-45d5f.appspot.com",
    messagingSenderId: "385204185900",
    appId: "1:385204185900:web:bf37afb6bfbffb6cbf5a89",
    measurementId: "G-TKKY1FTL49"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = getAuth();
const user = NULL;

import { getAuth, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
        // ...

        const db = firebase.firestore();

        db.collection("usageData").doc(user)
            .withConverter(userConverter)
            .set(new User(email_in, currentUsage = 0, usageAllTime = 0, usageToday = 0)).then((docRef) => {
                window.location.href = '../index.html';
            });

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

deleteUser(user).then(() => {
    // User deleted.
}).catch((error) => {
    // An error ocurred
    // ...
});