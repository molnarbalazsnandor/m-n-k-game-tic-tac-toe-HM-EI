import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import Login from "./components/Login";
import Setup from "./components/Setup";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
