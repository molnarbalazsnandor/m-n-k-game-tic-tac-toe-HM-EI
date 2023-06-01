import React, { useEffect } from 'react'
import {GoogleButton} from "react-google-button"
import {UserAuth} from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';

function Login() {
  const {googleSignIn, logOut, user} = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn()
    } catch (error){
      console.log(error)
    }
  }


  useEffect( () => {
    if(user){
      navigate("/setup")
    }
  },[user])

  return (
    <>
      <GoogleButton onClick={()=> {handleGoogleSignIn()}}>Sign in with Google</GoogleButton> 
    </>
  )
}

export default Login