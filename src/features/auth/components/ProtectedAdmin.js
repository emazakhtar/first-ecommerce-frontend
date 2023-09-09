import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../authSlice";
import { selectLoggedInUserInfo } from "../../users/usersSlice";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUserToken);
  const userInfo = useSelector(selectLoggedInUserInfo);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && userInfo && userInfo.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default ProtectedAdmin;
