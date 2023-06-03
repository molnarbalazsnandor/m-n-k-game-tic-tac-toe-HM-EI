import React, { useEffect } from "react";
import "./Login.css";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardHeader,
} from "@mui/material/";
import rewardFont from "../fonts/reward.ttf";
import frederickaFont from "../fonts/fredericka.ttf";

const Login = () => {
  const { googleSignIn, logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/setup");
    }
  }, [user]);

  return (
    <Card className="login-card">
      <CardContent className="card-content">
        <Typography
          variant="h4"
          className="welcome-text"
          style={{ fontFamily: "Reward Font" }}
        >
          Welcome to the MNK Saloon!
        </Typography>
        <CardMedia
          component="img"
          className="tic-tac-toe-icon left"
          image={require("../images/tic-tac-toe.png")}
          alt="tic-tac-toe"
        />
        <CardMedia
          component="img"
          className="tic-tac-toe-icon right"
          image={require("../images/tic-tac-toe.png")}
          alt="tic-tac-toe"
        />
        <CardMedia
          component="img"
          className="red-ribbon"
          image={require("../images/redribbon1.png")}
          alt="Red ribbon"
        />
      </CardContent>
      <CardMedia
        component="img"
        sx={{ height: "auto", width: 200 }}
        image={require("../images/saloon.png")}
        alt="Saloon door"
      />

      <CardContent className="info-card">
        <Typography
          variant="body1"
          className="info-text"
          style={{ fontFamily: "Fredericka the Great" }}
        >
          Hold on there Partner! <br></br>You must introduce yourself before you
          can enter the Saloon!
        </Typography>
        <Button
          className="google-button"
          onClick={() => {
            handleGoogleSignIn();
          }}
        >
          Sign in with Google
          <CardMedia
            component="img"
            className="google-button-icon"
            image={require("../images/google.png")}
            alt="google icon"
            sx={{ height: "auto", width: 20 }}
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Login;
