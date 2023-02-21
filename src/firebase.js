// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
<<<<<<< HEAD
    apiKey: "AIzaSyD0oDYmCBG4qkKsayg-r0OZd3ZYyzh1l1s",
    authDomain: "your-brand-stories.firebaseapp.com",
    projectId: "your-brand-stories",
    storageBucket: "your-brand-stories.appspot.com",
    messagingSenderId: "692939033521",
    appId: "1:692939033521:web:5540cfb65ed868edc48b90"
=======
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
>>>>>>> 69264f80c29837b683bfded370bfe5c3bddc3b0d
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();