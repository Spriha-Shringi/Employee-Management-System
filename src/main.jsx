import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAR4T8wijiAZShlWqvCJqcnsfdjXnAm8co",
  authDomain: "workflowx-f87b7.firebaseapp.com",
  projectId: "workflowx-f87b7",
  storageBucket: "workflowx-f87b7.firebasestorage.app",
  messagingSenderId: "558369024818",
  appId: "1:558369024818:web:1118d87cbf638ce63e852b",
  measurementId: "G-7K05SX29V8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);


localStorage.clear()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)