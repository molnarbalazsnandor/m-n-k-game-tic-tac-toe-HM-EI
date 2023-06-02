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
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");

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
                  player1={player1}
                  player2={player2}
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
                  player1={player1}
                  setPlayer1={setPlayer1}
                  player2={player2}
                  setPlayer2={setPlayer2}
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
