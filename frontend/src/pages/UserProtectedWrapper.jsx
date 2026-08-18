import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

function UserProtectedWrapper({ children }) {
  const token = localStorage.getItem('token')
  const { user, setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => {
        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoading(false);
        }

      })
      .catch(error => {
        localStorage.removeItem('token');
        setIsLoading(false);
      });
  }, [token, setUser]);
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper