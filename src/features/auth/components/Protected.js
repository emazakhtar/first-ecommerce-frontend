import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthStatus,
  selectCheckedUser,
  selectcheckedUserInitialized,
  selectLoggedInUserToken,
} from "../authSlice";
import { Navigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUserToken);
  const checkedUserInitialized = useSelector(selectcheckedUserInitialized);
  const authStatus = useSelector(selectAuthStatus);
  const checkedUser = useSelector(selectCheckedUser);
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(checkUserAsync());
  //   }
  // }, [dispatch, user]);
  if (user) {
    return children;
  } else if (!user && checkedUser === true) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else {
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      {/* Loader component */}
      <Grid
        className="loader"
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>;
  }
}

export default Protected;
