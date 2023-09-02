import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser, signOut } from "./authAPI";

const initialState = {
  LoggedInUserToken: null,
  status: "idle",
  error: null,
  checkedUser: false,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (
    { email, password, name, address, order, role },
    { rejectWithValue }
  ) => {
    try {
      const response = await createUser({
        email,
        password,
        name,
        address,
        order,
        role,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (rejectWithValue) => {
    console.log("yhhhbhbb");
    try {
      const response = await checkUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
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
      state.LoggedInUserToken = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = action.payload;
        state.checkedUser = true;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.checkedUser = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = null;
      });
  },
});

export const { logOutUser } = authSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.LoggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectCheckedUser = (state) => state.auth.checkedUser;

export default authSlice.reducer;
