import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

function CaptainLogin() {
  const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const {captain,setCaptain}=useContext(CaptainDataContext);
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
      e.preventDefault();
      CaptainData={
        email:email,
        password:password
      }

      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,CaptainData);
      if(response.status===200){
        const data=response.data;
        setCaptain(data.captain);
        localStorage.setItem('token',data.token);
        navigate('/captain-home');
      }

      setEmail('');
      setPassword('');
    }
  return (
    <div className='p-5 h-screen flex flex-col justify-between' >
      <div>
        <img className='w-20 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password'
          />
          <button className='bg-[#111] mb-3 rounded px-4 py-2 w-full text-white font-semibold text-lg'>Login</button>
        </form>
        <p className='text-center'>Join a feet? <Link to='/captain-signup' className='text-blue-600' >Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center mb-7 rounded px-4 py-2 w-full text-white font-semibold text-lg'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin