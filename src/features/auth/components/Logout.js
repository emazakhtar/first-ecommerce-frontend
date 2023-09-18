import React, { useEffect } from "react";
import { selectLoggedInUserToken, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Logout() {
  const user = useSelector(selectLoggedInUserToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutAsync());
    // dispatch(resetUserInfo());
  }, [dispatch, user]);

  return <div>{!user && <Navigate to="/login"></Navigate>}</div>;
}

export default Logout;
