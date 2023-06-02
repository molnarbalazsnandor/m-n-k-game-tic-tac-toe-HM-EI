import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;
