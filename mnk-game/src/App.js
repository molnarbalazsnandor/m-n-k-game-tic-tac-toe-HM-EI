import React, { useState } from "react";
import Square from "./components/Square";
import "./App.css";
import { calculateWinner } from "./calculateWinner";

const App = () => {
  const [size, setSize] = useState(10);
  const [target, setTarget] = useState(6);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(size ** 2).fill(null));
  const [moveHistory, setMoveHistory] = useState([]);

  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares, size, target)) {
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

  const winner = calculateWinner(squares, size, target);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
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
        <div key={row} className="board-row">
          {squaresRow}
        </div>
      );
    }

    return board;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">{renderBoard()}</div>
      <div className="buttons">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleStepBack} disabled={moveHistory.length === 0}>
          Step Back
        </button>
      </div>
    </>
  );
};

export default App;
