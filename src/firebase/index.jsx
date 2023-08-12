// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSfzYWeC6iZci9GsC3pPMM7wSpmN7frxQ",
  authDomain: "todos-app-6e2a7.firebaseapp.com",
  projectId: "todos-app-6e2a7",
  storageBucket: "todos-app-6e2a7.appspot.com",
  messagingSenderId: "633647813251",
  appId: "1:633647813251:web:2297afd946468d9d1181b6",
  // apiKey: "AIzaSyD2oP_cPLU6VDqc9-qKpo0J4tFa7vU2Wqg",
  // authDomain: "todo-app-221ac.firebaseapp.com",
  // projectId: "todo-app-221ac",
  // storageBucket: "todo-app-221ac.appspot.com",
  // messagingSenderId: "106308845668",
  // appId: "1:106308845668:web:7dbec57f8b58e0e59b5f71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
