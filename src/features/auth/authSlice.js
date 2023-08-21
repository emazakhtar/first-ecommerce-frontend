import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./authAPI";

const initialState = {
  LoggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async ({ email, password, address, role }) => {
    const response = await createUser({ email, password, address, role });
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
export const signOutAsync = createAsyncThunk("auth/signOut", async (userId) => {
  const response = await signOut(userId);
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logOutUser: (state) => {
      state.LoggedInUser = null;
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
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = null;
      });
  },
});

export const { logOutUser } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.LoggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
