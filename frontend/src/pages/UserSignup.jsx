import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

function UserSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userData, setUserData] = useState({});
  
  const navigate=useNavigate();
  const {user,setUser}=useContext(UserDataContext);

  const submitHandler=async(e)=>{
    e.preventDefault();
    const userdata={
      fullname:{
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password
    }
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,userdata);
    if(response.status===201){
      const data=response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }


    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-5 h-screen flex flex-col justify-between' >
      <div>
        <img className='w-15 mb-20 block' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>

          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-3'>
            <input
            value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value);
            }}
          className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 text-lg placeholder:text-base' required type="text" placeholder='first name'
          />
          <input
          value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value);
            }}
          className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 text-lg placeholder:text-base' required type="text" placeholder='last name'
          />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
          value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
          className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
          value={password}
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="password" placeholder='password'
          />
          <button className='bg-[#111] mb-3 rounded px-4 py-2 w-full text-white font-semibold text-lg'>Signup</button>
        </form>
        <p className='text-center'>already have an account? <Link to='/login' className='text-blue-600' > login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignup