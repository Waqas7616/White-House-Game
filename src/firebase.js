// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQQoedt3vi9WnKUyZm9FGwO2FtR5_oNAg",
  authDomain: "president-f5603.firebaseapp.com",
  projectId: "president-f5603",
  storageBucket: "president-f5603.appspot.com",
  messagingSenderId: "164528008533",
  appId: "1:164528008533:web:cda0dc5bf98069f55c93dc",
  measurementId: "G-QEQJ0BYC1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
