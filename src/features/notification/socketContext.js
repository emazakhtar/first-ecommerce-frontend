// frontend/src/socketContext.js

import React, { createContext } from "react";
import { io } from "socket.io-client";

// Create a single socket connection to the backend.
// Ensure the URL matches your backend server (port 3000 in this case).
const socket = io("http://localhost:8081");

// Create and export the context with the socket instance.
export const SocketContext = createContext(socket);
