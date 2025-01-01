import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState({ employees: [], admin: [] })
    
    useEffect(() => {
        setLocalStorage()
        const data = getLocalStorage()
        setUserData(data)
    }, [])
    
    return (
        <AuthContext.Provider value={[userData, setUserData]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
// import React, { createContext, useEffect, useState } from 'react'
// import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

// export const AuthContext=createContext()

// const AuthProvider = ({children}) => {
//     const [userData, setUserData] = useState(null)
//     // setLocalStorage()
//     useEffect(()=>{
//         setLocalStorage()
//         const {employees} = getLocalStorage()//const?
//         setUserData({employees})
//     },[])
        
    
//   return (
//     <div>
//         <AuthContext.Provider value={[userData,setUserData]}>
//             {children}
//              {/* why not by default?*/}
//             {/* //not working? */}
//         </AuthContext.Provider>
      
//     </div>
//   )
// }

// export default AuthProvider
// import React, { createContext, useEffect, useState } from 'react';
// import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         setLocalStorage();
//         const { employees, admin } = getLocalStorage();
//         setUserData({ employees, admin });
//     }, []);

//     return (
//         <AuthContext.Provider value={{ userData, setUserData }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


