import { initializeApp } from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth } from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore } from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDj2u3t9HRBBIM-i4FlwUJd3KVvVKfPdxY",
    authDomain: "new-project-8d049.firebaseapp.com",
    projectId: "new-project-8d049",
    storageBucket: "new-project-8d049.firebasestorage.app",
    messagingSenderId: "771272337600",
    appId: "1:771272337600:web:43442e9396312722a42525",
    measurementId: "G-8QP0ZN4JN5"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
