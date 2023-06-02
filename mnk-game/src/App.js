import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import Login from "./components/Login";
import Setup from "./components/Setup";
import Protected from "./components/Protected";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [size, setSize] = useState(10);
  const [goal, setGoal] = useState(5);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [player1Image, setPlayer1Image] = useState("image1.png");
  const [player2Image, setPlayer2Image] = useState("image2.png");

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Board
                  size={size}
                  goal={goal}
                  player1Name={player1Name}
                  player2Name={player2Name}
                  player1Image={player1Image}
                  player2Image={player2Image}
                />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/setup"
            element={
              <Protected>
                <Setup
                  size={size}
                  setSize={setSize}
                  player1Name={player1Name}
                  setPlayer1Name={setPlayer1Name}
                  player2Name={player2Name}
                  setPlayer2Name={setPlayer2Name}
                  player1Image={player1Image}
                  setPlayer1Image={setPlayer1Image}
                  player2Image={player2Image}
                  setPlayer2Image={setPlayer2Image}
                />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
