// src/GoogleOAuth.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUserGoogleOAuthAsync } from "../authSlice";

const GoogleOAuth = ({ setUser }) => {
  const dispatch = useDispatch();

  // Called when Google sign-in is successful.
  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      dispatch(loginUserGoogleOAuthAsync(credential));
      console.log(credential);
      // const { credential } = credentialResponse; // Google returns a JWT credential
      // // Send the credential to your backend for verification
      // const response = await axios.post(
      //   "http://localhost:8081/auth/google", // Update to your production URL when deploying
      //   { token: credential },
      //   { withCredentials: true } // Ensure cookies are sent/received
      // );
      // // Update your application state with user info from the backend
      // setUser(response.data.user);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // Called if Google sign-in fails
  const handleError = () => {
    console.log("Google Sign-In was unsuccessful. Please try again later.");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleOAuth;
