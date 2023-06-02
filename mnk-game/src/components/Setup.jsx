import React, { useEffect, useState } from 'react';
import { Avatar, Button, Slider, Typography, TextField } from '@mui/material/';
import { UserAuth } from '../context/AuthContext';
import { Link } from "react-router-dom"

function Setup({ size, setSize, goal, setGoal, player1, setPlayer1, player2, setPlayer2}) {
  const { logOut, user } = UserAuth();

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
          <Avatar src={user.photoURL} alt="Profile Picture" sx={{ width: 200, height: 200, marginBottom: 2 }} />
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
          onChange={(e) => setPlayer1(e.target.value)}/>
          <TextField id="outlined-basic" label="Player 2 name" variant="outlined" 
          onChange={(e) => setPlayer2(e.target.value)}/>
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
