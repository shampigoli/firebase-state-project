// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClzZve4_6pjO4mA-qZ7lRrxxKYhyIGC2g",
  authDomain: "relator-clone-bffe4.firebaseapp.com",
  projectId: "relator-clone-bffe4",
  storageBucket: "relator-clone-bffe4.appspot.com",
  messagingSenderId: "100643574785",
  appId: "1:100643574785:web:2ad3677bc4f0e3c3cf1c00"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db =getFirestore() 