import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authAPI";

const initialState = {
  LoggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const response = await createUser({ email, password });
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (data) => {
    const response = await checkUser(data);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.LoggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
