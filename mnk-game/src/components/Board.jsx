import React, { useState, useEffect } from "react";
import Square from "./Square";
import { calculateWinner } from "./../calculateWinner";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material/";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Board.css";

const Board = ({
  size,
  goal,
  player1Name,
  setPlayer1Name,
  player2Name,
  setPlayer2Name,
  player1Token,
  setplayer1Token,
  player2Token,
  setplayer2Token,
}) => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(size ** 2).fill(null));
  const [moveHistory, setMoveHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares, size, goal)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = player1Token;
    } else {
      nextSquares[i] = player2Token;
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMoveHistory((prevHistory) => [...prevHistory, nextSquares]);
    console.log(squares);
  }

  function handleReset() {
    setSquares(Array(size ** 2).fill(null));
    setMoveHistory([]);
    setXIsNext(true);
  }

  function handleStepBack() {
    if (moveHistory.length > 1) {
      const prevHistory = moveHistory.slice(0, moveHistory.length - 1);
      const prevSquares = prevHistory[prevHistory.length - 1];
      setSquares(prevSquares);
      setMoveHistory(prevHistory);
      setXIsNext((prevXIsNext) => !prevXIsNext);
    }
  }

  const winner = calculateWinner(squares, size, goal);
  let status;
  if (winner) {
    status = "Winner: " + (winner === player1Token ? player2Name : player1Name);
  } else {
    status = "Next player: " + (xIsNext ? player1Name : player2Name);
  }

  function renderBoard() {
    const board = [];

    for (let row = 0; row < size; row++) {
      const squaresRow = [];

      for (let col = 0; col < size; col++) {
        const index = row * size + col;
        squaresRow.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleSquareClick(index)}
          />
        );
      }

      board.push(
        <Grid key={row} container spacing={1} className="board-row">
          {squaresRow}
        </Grid>
      );
    }

    return board;
  }

  return (
    <Card className="board-card">
      <div className="nail nail-top-left"></div>
      <div className="nail nail-top-right"></div>
      <div className="nail nail-bottom-left"></div>
      <div className="nail nail-bottom-right"></div>
      <CardContent
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 2.5vw)`,
          gridTemplateRows: `repeat(${size}, 2.5vw)`,
          gap: "0",
          width: `${size * 2.5}vw`,
          height: `${size * 2.5}vw`,
        }}
      >
        {renderBoard()}
      </CardContent>
      <CardContent className="game-properties">
        <CardContent className="status-header">
          <CardMedia
            component="img"
            className="status-token"
            src={require(`../images/tokens/${
              winner || (xIsNext ? player1Token : player2Token)
            }`)}
            alt={`${player1Token}`}
          />
          <Typography
            className={`board-status ${winner ? "winner" : ""}`}
            gutterBottom
          >
            {winner
              ? "Winner: " +
                (winner === player1Token ? player1Name : player2Name) +
                " !"
              : "Next player: " + (xIsNext ? player1Name : player2Name)}
          </Typography>
          <CardMedia
            component="img"
            className="status-token"
            src={require(`../images/tokens/${
              winner || (xIsNext ? player1Token : player2Token)
            }`)}
            alt={`${player1Token}`}
          />
          <CardMedia
            component="img"
            className="red-ribbon"
            image={require("../images/redribbon1.png")}
            alt="Red ribbon"
          />
        </CardContent>
        <CardContent className="buttons">
          <CardMedia
            component="img"
            className="decorative-line-two top"
            image={require("../images/decorative-line2.png")}
            alt="Decorative line 1"
          />
          <Button
            variant="contained"
            onClick={handleReset}
            className="button"
            disabled={moveHistory.length < 1}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleStepBack}
            className="button"
            disabled={moveHistory.length < 2}
          >
            Step Back
          </Button>
          <Button
            variant="contained"
            className="button"
            onClick={() => {
              navigate("/setup");
              setPlayer1Name("Player 1");
              setPlayer2Name("Player 2");
              setplayer1Token("image1.png");
              setplayer2Token("image2.png");
            }}
          >
            Go to setup
          </Button>
          <CardMedia
            component="img"
            className="decorative-line-two bottom"
            image={require("../images/decorative-line2.png")}
            alt="Decorative line 1"
          />
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default Board;
