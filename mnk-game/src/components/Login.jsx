import React from 'react'
import {GoogleButton} from "react-google-button"
import {UserAuth} from "../context/AuthContext"
import { Avatar, Button} from '@mui/material/';

function Login() {
  const {googleSignIn, logOut, user} = UserAuth();
  

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn()
    } catch (error){
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try{
      await logOut()
    } catch (error){
      console.log(error)
    }
  }
  return (
    <>
    {user ? 
      <>
        <Avatar src={user.photoURL} alt="Profile Picture" sx={{ width: 200, height: 200, marginBottom: 2 }} />
        <Button onClick={handleSignOut} variant="contained" >
                Sign Out</Button>
      </>:
        <GoogleButton onClick={()=> {handleGoogleSignIn()}}>Sign in with Google</GoogleButton> }
    </>
  )
}

export default Login