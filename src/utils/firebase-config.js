
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-yF779CcgsVzy6pdO7DuX2i0YY1tqFCY",
  authDomain: "react-netflix-clone-a096f.firebaseapp.com",
  projectId: "react-netflix-clone-a096f",
  storageBucket: "react-netflix-clone-a096f.appspot.com",
  messagingSenderId: "475666654203",
  appId: "1:475666654203:web:5889c6dda595f0ed3ee15e",
  measurementId: "G-N73EYMJB79"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);