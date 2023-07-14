import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { server } from '../server';

const ActivationPage = () => {

  const {url} = useParams();
  const [error, setError] = useState(false);
  
  
  useEffect(() => {
    const decodedJwtKey = url.replace(/!/g, '.');

    if(decodedJwtKey){
      const activationEmail = async () =>{
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token: decodedJwtKey
          });

          console.log(res.data.message);

        }catch (err){
          console.log(err.response.data.message);
          setError(true)
        }
      }
      activationEmail();
    }
  },[])

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {
        error? 
          <p>
            Your token is expired
          </p>
          :
          <p>
            Your Account has been created sucessfully!
          </p>
      }

    </div>
  )
}

export default ActivationPage