import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'//ReactDOM...react-dom?
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'


localStorage.clear()//why not always working or commented out?
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
    
  </StrictMode>,
)
