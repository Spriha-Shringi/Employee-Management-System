// src/firebase-config.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAR4T8wijiAZShlWqvCJqcnsfdjXnAm8co",
  authDomain: "workflowx-f87b7.firebaseapp.com",
  projectId: "workflowx-f87b7",
  storageBucket: "workflowx-f87b7.firebasestorage.app",
  messagingSenderId: "558369024818",
  appId: "1:558369024818:web:1118d87cbf638ce63e852b",
  measurementId: "G-7K05SX29V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;