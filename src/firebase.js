// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0oDYmCBG4qkKsayg-r0OZd3ZYyzh1l1s",
  authDomain: "your-brand-stories.firebaseapp.com",
  projectId: "your-brand-stories",
  storageBucket: "your-brand-stories.appspot.com",
  messagingSenderId: "692939033521",
  appId: "1:692939033521:web:5540cfb65ed868edc48b90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();