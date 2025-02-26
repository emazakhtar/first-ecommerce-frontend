import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import App from "./App";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "445187668823-nch4gt1eorfsf5hergsie4o6qcqr7eil.apps.googleusercontent.com";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_LEFT,
  timeout: 1000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
          <App />
        </Provider>
      </AlertProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
