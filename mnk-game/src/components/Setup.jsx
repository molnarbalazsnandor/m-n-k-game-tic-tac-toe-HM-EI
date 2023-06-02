import React, { useEffect, useState } from 'react';
import { Avatar, Button, Slider, Typography, TextField } from '@mui/material/';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SwiperComponent from './SwiperComponent';


function Setup({ size, setSize, player1Name, setPlayer1Name, player2Name, setPlayer2Name, player1Image, setPlayer1Image, player2Image, setPlayer2Image}) {

  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div>Setup</div>
      {user && (
        <>
          <Avatar src={user.photoURL} alt="Profile image" sx={{ width: 200, height: 200, marginBottom: 2 }} />
          <p>Howdy, {user?.displayName}!</p>
          <Button onClick={handleSignOut} variant="contained">
            Sign Out
          </Button>
          <Typography id="board-size-label" gutterBottom>
            Board Size: {size}x{size}
          </Typography>
          <Slider
            aria-labelledby="board-size-label"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            min={5}
            max={40}
            step={1}
            marks
            sx={{
              width: 300,
              color: '#1976d2', 
              '& .MuiSlider-thumb': {
                backgroundColor: '#1976d2', 
              },
              '& .MuiSlider-mark': {
                backgroundColor: '#1976d2', 
              },
              '& .MuiSlider-markLabel': {
                color: '#1976d2', 
              },
            }}
          />
          <TextField id="outlined-basic" label="Player 1 name" variant="outlined" 
          onChange={(e) => setPlayer1Name(e.target.value)}/>
          <SwiperComponent player1Image={player1Image}
            setPlayer1Image={setPlayer1Image}/>
          <TextField id="outlined-basic" label="Player 2 name" variant="outlined" 
          onChange={(e) => setPlayer2Name(e.target.value)}/>
            <Button variant="contained"
              disabled={player1Image === player2Image || player1Name === player2Name}
              onClick={() => navigate('/')}>
              Start the game!
            </Button>
        </>
      )}
    </>
  );
}

export default Setup;
