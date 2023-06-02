import React, { useState, useEffect } from "react";
import Square from "./Square";
import "./Board.css";
import { calculateWinner } from "./../calculateWinner";
import { Button, Grid, Typography } from "@mui/material/";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Board = ({
  size,
  goal,
  player1Name,
  player2Name,
  player1Image,
  player2Image,
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
      nextSquares[i] = player1Image;
    } else {
      nextSquares[i] = player2Image;
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
    status = "Winner: " + (winner === player1Image ? player2Name : player1Name);
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
    <>
      <div className="status">
        <Typography id="board-status" gutterBottom>
          {winner
            ? "Winner: " + (winner === player2Image ? player2Name : player1Name)
            : "Next player: " + (xIsNext ? player1Name : player2Name)}
        </Typography>
        <img
          src={require(`../images/${
            winner || (xIsNext ? player1Image : player2Image)
          }`)}
          alt={`${player1Image}`}
          style={{ width: "30px" }}
        />
      </div>
      <div className="board">{renderBoard()}</div>
      <div className="buttons">
        <Button
          variant="contained"
          onClick={handleReset}
          disabled={moveHistory.length < 1}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={handleStepBack}
          disabled={moveHistory.length < 2}
        >
          Step Back
        </Button>
        <Button variant="contained" onClick={() => navigate("/setup")}>
          Go to setup
        </Button>
      </div>
    </>
  );
};

export default Board;
