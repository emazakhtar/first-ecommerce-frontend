import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAlert } from "react-alert";

import {
  addToCart,
  fetchAllCart,
  removeAllFromCart,
  removeItemsFromCart,
  updateCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addToCart(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchAllCartAsync = createAsyncThunk(
  "cart/fetchAllCart",
  async () => {
    const response = await fetchAllCart();
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (updateData) => {
    const response = await updateCart(updateData);
    return response.data;
  }
);
export const removeItemsFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (item) => {
    const response = await removeItemsFromCart(item);
    return response.data;
  }
);
export const removeAllFromCartAsync = createAsyncThunk(
  "cart/removeAllFromCart",
  async () => {
    const response = await removeAllFromCart();
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchAllCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[itemIndex] = action.payload;
      })
      .addCase(removeItemsFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const removedItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(removedItemIndex, 1);
      })
      .addCase(removeAllFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAllFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;

export const selectCart = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
