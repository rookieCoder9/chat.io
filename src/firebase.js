import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyD_xm6XPOpEtd_LcEFkE3e5qym9CvCh-Zo",
  authDomain: "chatio-f3da7.firebaseapp.com",
  projectId: "chatio-f3da7",
  storageBucket: "chatio-f3da7.appspot.com",
  messagingSenderId: "336254981216",
  appId: "1:336254981216:web:6dfa46920c6af9d95d5f05",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage=getStorage();
export const db=getFirestore();
