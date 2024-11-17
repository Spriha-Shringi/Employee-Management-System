import React, {useState} from 'react'


const Login = () => {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')

  const submitH =(e)=>{
    e.preventDefault()
    console.log("email is", email)
    console.log("password is", password)
    setEmail("")
    setPassword("")
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='border-2 rounded-xl border-red-600 p-20'>
          <form onSubmit={(e)=>{
            submitH(e);
          }}
          className='flex flex-col items-center justify-center'>
            <input 
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            required className='text-white outline-none bg-transparent border-2 border-jungleGreen text-xl py-3 px-5 rounded-full placeholder:text-white' type="email" placeholder='Enter your email'/>
            <input 
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}required className='text-white outline-none bg-transparent border-2 border-jungleGreen text-xl py-3 px-5 rounded-full placeholder:text-white' type="password" placeholder='Enter password'/>
            <button className='mt-5 text-white border-red-500 outline-none bg-transparent border-2 bg-jungleGreen text-xl py-3 px-5 rounded-full placeholder:text-white'>Log in</button>
          </form>
      </div>
    </div>
  )
}

export default Login
