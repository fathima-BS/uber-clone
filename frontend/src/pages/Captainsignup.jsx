import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios'

function Captainsignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const {captain,setCaptain}=useContext(CaptainDataContext);
  const navigate=useNavigate()
    
    const submitHandler=async(e)=>{
      e.preventDefault();
      const captainData={
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password,
        vehicle:{
          color:vehicleColor,
          plate:vehiclePlate,
          capacity:vehicleCapacity,
          vehicleType:vehicleType
        }
      }

      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
      if(response.status===201){
        const data=response.data;
        setCaptain(data.captain);
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    }
  return (
    <div className='p-5 h-screen flex flex-col justify-between' >
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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

          <h3 className='text-lg font-medium mb-2'>Vehicle details</h3>
          <div className='grid grid-cols-2 gap-3 mb-5'>
            <input
              value={vehicleColor}
              onChange={(e)=> setVehicleColor(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 text-lg placeholder:text-base w-full'
              type='text'
              placeholder='Vehicle color'
            />
            <input
              value={vehiclePlate}
              onChange={(e)=> setVehiclePlate(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 text-lg placeholder:text-base w-full'
              type='text'
              placeholder='Vehicle plate'
            />
            <input
              value={vehicleCapacity}
              onChange={(e)=> setVehicleCapacity(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 text-lg placeholder:text-base w-full'
              type='number'
              min='1'
              placeholder='Vehicle capacity'
            />
            <select
              value={vehicleType}
              onChange={(e)=> setVehicleType(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 text-lg placeholder:text-base w-full'
              required
            >
              <option value='' disabled>Select vehicle type</option>
              <option value='car'>Car</option>
              <option value='auto'>Auto</option>
              <option value='motorcycle'>Motorcycle</option>
            </select>
          </div>

          <button className='bg-[#111] mb-3 rounded px-4 py-2 w-full text-white font-semibold text-lg'>Create Captain Account</button>
        </form>
        <p className='text-center'>already have an account? <Link to='/captain-login' className='text-blue-600' > login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default Captainsignup