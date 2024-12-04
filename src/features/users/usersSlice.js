import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUsersOrders,
  fetchAllUsersReturns,
  loadUsersInfo,
  updateUser,
} from "./usersAPI";

const initialState = {
  userReturns: [],
  LoggedInUserInfo: null,
  status: "idle",
  error: null,
};

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    const response = await updateUser(data);
    return response.data;
  }
);
export const loadUsersInfoAsync = createAsyncThunk(
  "user/loadUsersInfo",
  async () => {
    const response = await loadUsersInfo();
    return response.data;
  }
);
export const fetchAllUsersOrdersAsync = createAsyncThunk(
  "user/fetchAllUsersOrders",
  async () => {
    const response = await fetchAllUsersOrders();
    return response.data;
  }
);
export const fetchAllUsersReturnsAsync = createAsyncThunk(
  "user/fetchAllUsersReturns",
  async ({ email }) => {
    const response = await fetchAllUsersReturns(email);
    return response.data;
  }
);
export const usersSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    resetUserInfo: (state) => {
      state.LoggedInUserInfo = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserInfo = action.payload;
      })
      .addCase(loadUsersInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUsersInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserInfo = action.payload;
      })
      .addCase(fetchAllUsersOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsersOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (!state.LoggedInUserInfo) {
          state.LoggedInUserInfo = {}; // Initialize it as an empty object if it's null
        }

        // Now you can safely assign orders
        state.LoggedInUserInfo.orders = action.payload;
      })
      .addCase(fetchAllUsersReturnsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsersReturnsAsync.fulfilled, (state, action) => {
        console.log("reached here");
        state.status = "idle";
        state.userReturns = action.payload;
      })
      .addCase(fetchAllUsersReturnsAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { resetUserInfo } = usersSlice.actions;

export const selectLoggedInUserInfo = (state) => state.user.LoggedInUserInfo;
export const selectUserOrders = (state) =>
  state.user.LoggedInUserInfo !== null && state.user.LoggedInUserInfo.orders;
export const selectUserStatus = (state) => state.user.status;
export const selectUserReturns = (state) => state.user.userReturns;

export default usersSlice.reducer;
