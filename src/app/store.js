import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/ordersSlice";
import userReducer from "../features/users/usersSlice";
import reviewReducer from "../features/review/reviewSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    review: reviewReducer,
  },
});
