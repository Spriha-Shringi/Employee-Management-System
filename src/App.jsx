import React, { useContext, useState } from 'react'
import Login from './components/Auth/Login'
import { useEffect } from 'react'//??use
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  
  const [user, setUser]= useState(null)
  const [loggedInUserData, setloggedInUserData]= useState(null)
  // useEffect(()=>{
  //   setLocalStorage()
  //    getLocalStorage()
  //   //  console.log('a')
  // },[])//[] meaning?
  
  const authData=useContext(AuthContext)
  // console.log(authData)//2 baar, in video 1 baar?
//  useEffect(() => {
//   //  if(authData)//if ke baad brackets zaruri hain?
//     const loggedInUser=localStorage.getItem("loggedInUser")
//     // if(loggedInUser)
//       // setUser(loggedInUser.role)
//  }, [authData]);...???
 

  const handleLogin=(email,password)=>{
       if(email=='admin@me.com' && password =='123'){
               setUser('admin')
              //  localStorage.setItem("loggedInUser",JSON.stringigy({role: 'admin'}))//opeming the page still but not in employee
              localStorage.setItem("loggedInUser",JSON.stringify({role: 'admin'}))//" "   ''  ?
              //  console.log(user)//??
       }
       else if(authData && authData.employees.find((e)=>email==e.email && e.password ==password)){
        const employee = authData.employees.find((e) => email == e.email && e.password == password);
        localStorage.setItem("loggedInUser",JSON.stringify({role: 'employee'}))
               setUser('employee')
               setloggedInUserData(employee)
              //  console.log(user)//??
       }
       else{
        alert("Invalid Credentials")
       }
  }
  
  // handleLogin('admin@me.com',123)
  return (
    <>
    {/* {!user? <Login handleLogin={handleLogin}/>: ''} */}
    {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard data={loggedInUserData} />
      )}
    {/* {user =='admin' ? <AdminDashboard/> : <EmployeeDashboard data={loggedInUserData} />} */}
      {/* {user =='admin' ? (<AdminDashboard/>) : (user='employee' ? (<EmployeeDashboard data={loggedInUserData}/>):null)} */}
      {/* <EmployeeDashboard/> */}
      {/* <AdminDashboard/> */}
    </>
  )
}

export default App
