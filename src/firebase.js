// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5NkczMvZ-7YlQUvQCAGyKgj4UQwFXcsI",
    authDomain: "e-commerce-5ea17.firebaseapp.com",
    projectId: "e-commerce-5ea17",
    storageBucket: "e-commerce-5ea17.appspot.com",
    messagingSenderId: "1095080120717",
    appId: "1:1095080120717:web:45048b566d3c734c05adc4",
};

// Initialize Firebase
export const firebase = getFirestore(initializeApp(firebaseConfig));
