import React from 'react'
import Login from '../components/Login.jsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user);


  useEffect(()=>{
    if(isAuthenticated) {
      navigate("/")
    }

  },[])


  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage