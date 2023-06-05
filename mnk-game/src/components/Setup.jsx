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
  <div></div>;
  return (
    <Card className="setup-card">
      <div className="nail nail-top-left"></div>
      <div className="nail nail-top-right"></div>
      <div className="nail nail-bottom-left"></div>
      <div className="nail nail-bottom-right"></div>
      <CardContent className="setup-card-header">
        <CardMedia
          component="img"
          className="setting"
          image={require("../images/setting.png")}
          alt="Setting"
        />
        <Typography variant="h4" className="setup-text">
          Setup
        </Typography>
        <CardMedia
          component="img"
          className="setting"
          image={require("../images/setting.png")}
          alt="Setting"
        />
        <CardMedia
          component="img"
          className="red-ribbon"
          image={require("../images/redribbon1.png")}
          alt="Red ribbon"
        />
      </CardContent>
      <CardContent className="user-card-content">
        <div className="user-picture">
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
        </div>
        <div className="user-admin">
          <Typography variant="h2" className="email-text">
            {user?.email}
          </Typography>
          <Button
            onClick={handleSignOut}
            variant="contained"
            className="sign-out-button"
          >
            Sign Out
          </Button>
        </div>
        <Typography variant="h4" className="howdy-text">
          Howdy, {user?.displayName}!
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        className="decorative-line-one"
        image={require("../images/decorative-line1.png")}
        alt="Decorative line 1"
      />
      <CardContent className="setup-card-content">
        <Typography className="board-size-label" gutterBottom>
          Board Size: {size}x{size}
        </Typography>
        <Slider
          className="board-size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          min={5}
          max={15}
          step={1}
          marks
        />
        <div className="player-settings">
          <div className="player-one-settings">
            <TextField
              label="Player 1 name"
              className="player-one-name"
              variant="outlined"
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            <SwiperComponent
              className="player-one-token"
              playerToken={player1Token}
              setplayerToken={setplayer1Token}
              playerIndex={0}
            />
            <Typography
              id="player-1-token"
              gutterBottom
              className="player-typography"
            >
              Player 1 token
            </Typography>
          </div>
          <div className="player-two-settings">
            <TextField
              label="Player 2 name"
              className="player-two-name"
              variant="outlined"
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
            <SwiperComponent
              className="player-two-token"
              playerToken={player2Token}
              setplayerToken={setplayer2Token}
              playerIndex={1}
            />
            <Typography
              id="player-2-token"
              gutterBottom
              className="player-typography"
            >
              Player 2 token
            </Typography>
          </div>
        </div>
        <Button
          variant="contained"
          className="start-button"
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
