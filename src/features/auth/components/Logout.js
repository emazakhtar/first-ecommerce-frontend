import React, { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetUserInfo } from "../../users/usersSlice";

function Logout() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutAsync(user.id));
    dispatch(resetUserInfo());
  }, [dispatch, user]);

  return <div>{!user && <Navigate to="/login"></Navigate>}</div>;
}

export default Logout;
