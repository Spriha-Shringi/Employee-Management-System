import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext=createContext()

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null)
    // setLocalStorage()
    useEffect(()=>{
        setLocalStorage()
        const {employees, admin} = getLocalStorage()//const?
        setUserData({employees, admin})
    },[])
        
    
  return (
    <div>
        <AuthContext.Provider value={userData}>
            {children}
             {/* why not by default?*/}
            {/* //not working? */}
        </AuthContext.Provider>
      
    </div>
  )
}

export default AuthProvider
