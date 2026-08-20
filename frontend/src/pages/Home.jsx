import React, { useState,useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import LocationSearchPanel from '../components/LocationSearchPanel'

function Home() {
  const [pickup, setPickup] = useState('')
  const [destination,setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler=(e)=>{
    e.preventDefault()
  }
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        padding:24
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])


  return (
    <div className='h-screen relative'>
      <img className='w-16 h-6 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
      <div className='h-screen w-screen'>
        {/* temporory image */}
        <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHM2OploYt2xBiIvEmsGRD-9oVSZpasSTIb0E1vGB2hIbzHYF4adCj-PgS&s=10" alt="uber-map" />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-800 rounded-full" ></div>
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e)=>{
              setPickup(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Add a pick-up location' />
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={destination}
            onChange={(e)=>{
              setDestination(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg  w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0 overflow-hidden'>
            <LocationSearchPanel/>
        </div>
      </div>
      
    </div>
  )
}

export default Home