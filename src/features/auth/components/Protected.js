import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
}

export default Protected;
