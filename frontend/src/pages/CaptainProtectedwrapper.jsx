import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainProtectedwrapper({children}) {
    const token=localStorage.getItem('token');
    const {captain,setCaptain} = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true)

    if(!token){
        return <Navigate to='/captain-login'/>
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(response=>{
      if(response.status===200){
        setCaptain(response.data.captain)
        setIsLoading(false)
      }
    }).catch(err=>{
      return <Navigate to='/captain-login'/>
    })

    if(isLoading){
      return(
        <div>Loading...</div>
      )
    }
  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedwrapper