import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsersOrders, loadUsersInfo, updateUser } from "./usersAPI";

const initialState = {
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
        state.LoggedInUserInfo.orders = action.payload;
      });
  },
});

export const { resetUserInfo } = usersSlice.actions;

export const selectLoggedInUserInfo = (state) => state.user.LoggedInUserInfo;
export const selectUserOrders = (state) => state.user.LoggedInUserInfo.orders;
export const selectUserStatus = (state) => state.user.status;

export default usersSlice.reducer;
