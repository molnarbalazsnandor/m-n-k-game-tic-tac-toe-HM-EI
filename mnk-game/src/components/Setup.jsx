import React, { useEffect } from 'react';
import { Avatar, Button } from '@mui/material/';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

function Setup() {
  const { googleSignIn, logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <div>Setup</div>
      {user && (
        <>
          <Avatar src={user.photoURL} alt="Profile Picture" sx={{ width: 200, height: 200, marginBottom: 2 }} />
          <Button onClick={handleSignOut} variant="contained">
            Sign Out
          </Button>
          <Link to="/">
              <Button variant="contained">
                Start the game!
              </Button>
            </Link>
        </>
      )}
    </>
  );
}

export default Setup;
