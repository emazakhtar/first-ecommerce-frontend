import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});
