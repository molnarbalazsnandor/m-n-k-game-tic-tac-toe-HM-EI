import React, { useState, useEffect } from "react";
import Square from "./Square";
import "./Board.css";
import { calculateWinner } from "./../calculateWinner";
import { Avatar, Button, Grid } from '@mui/material/';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

const Board = ({ size, goal, player1, player2 }) => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(size ** 2).fill(null));
  const [moveHistory, setMoveHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares, size, goal)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMoveHistory((prevHistory) => [...prevHistory, nextSquares]);
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
    status = "Winner: " + (winner === "X" ? player1 : player2);
  } else {
    status = "Next player: " + (xIsNext ? player1 : player2);
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
      <div className="status">{status}</div>
      <div className="board">{renderBoard()}</div>
      <div className="buttons">
        <Button variant="contained" onClick={handleReset} disabled={moveHistory.length < 1}>Reset</Button >
        <Button variant="contained" onClick={handleStepBack} disabled={moveHistory.length < 2}>
          Step Back
        </Button>
        <Link to="/setup">
          <Button variant="contained">
            Go to setup
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Board;
