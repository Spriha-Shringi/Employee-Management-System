import React, { useContext, useState } from 'react'
import Login from './components/Auth/Login'
import { useEffect } from 'react'//??use
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  
  const [user, setUser]= useState(null)
  // useEffect(()=>{
  //   setLocalStorage()
  //    getLocalStorage()
  //    console.log('a')
  // },)
  const authData=useContext(AuthContext)
  console.log(authData)//2 baar, in video 1 baar?

  const handleLogin=(email,password)=>{
       if(email=='admin@me.com' && password =='123'){
               setUser('admin')
              //  console.log(user)//??
       }
       else if(authData && authData.employees.find((e)=>email==e.email && password ==e.password)){
               setUser('employee')
              //  console.log(user)//??
       }
       else{
        alert("Invalid Credentials")
       }
  }
  
  // handleLogin('admin@me.com',123)
  return (
    <>
    {!user? <Login handleLogin={handleLogin}/>: ''}
      {user =='admin' ? <AdminDashboard/> : <EmployeeDashboard/>}
      {/* <EmployeeDashboard/> */}
      {/* <AdminDashboard/> */}
    </>
  )
}

export default App
