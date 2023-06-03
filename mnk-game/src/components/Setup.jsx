import React from "react";
import {
  Avatar,
  Button,
  Slider,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material/";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SwiperComponent from "./SwiperComponent";
import "./Setup.css";

function Setup({
  size,
  setSize,
  player1Name,
  setPlayer1Name,
  player2Name,
  setPlayer2Name,
  player1Token,
  setplayer1Token,
  player2Token,
  setplayer2Token,
}) {
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
    <Card className="setup-card">
      <CardContent className="user-card-content">
        <Typography variant="h4" className="setup-text">
          Setup
        </Typography>
        <CardMedia
          component="img"
          className="red-ribbon"
          image={require("../images/redribbon1.png")}
          alt="Red ribbon"
        />
        <Avatar
          className="google-avatar"
          src={user.photoURL}
          alt="Profile image"
        />
        <CardMedia
          component="img"
          className="wanted-icon"
          image={require("../images/wanted.png")}
          alt="Wanted"
        />
        <Typography variant="h4" className="howdy-text">
          Howdy, {user?.displayName}!
        </Typography>
        <Button
          onClick={handleSignOut}
          variant="contained"
          className="sign-out-button"
        >
          Sign Out
        </Button>
      </CardContent>
      <CardContent className="setup-card-content">
        <Typography id="board-size-label" gutterBottom>
          Board Size: {size}x{size}
        </Typography>
        <Slider
          className="board-size-label"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          min={5}
          max={40}
          step={1}
          marks
        />
        <TextField
          label="Player 1 name"
          variant="outlined"
          onChange={(e) => setPlayer1Name(e.target.value)}
        />
        <SwiperComponent
          playerToken={player1Token}
          setplayerToken={setplayer1Token}
          playerIndex={0}
        />
        <Typography id="player-1-token" gutterBottom>
          Player 1 token
        </Typography>
        <TextField
          label="Player 2 name"
          variant="outlined"
          onChange={(e) => setPlayer2Name(e.target.value)}
        />
        <SwiperComponent
          playerToken={player2Token}
          setplayerToken={setplayer2Token}
          playerIndex={1}
        />
        <Typography id="player-2-token" gutterBottom>
          Player 2 token
        </Typography>
        <Button
          variant="contained"
          disabled={
            player1Token === player2Token || player1Name === player2Name
          }
          onClick={() => navigate("/")}
        >
          Start the game!
        </Button>
      </CardContent>
    </Card>
  );
}

export default Setup;
