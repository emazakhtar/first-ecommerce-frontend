import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkUser,
  createUser,
  loginUser,
  resetPassword,
  resetPasswordRequest,
  signOut,
} from "./authAPI";

const initialState = {
  LoggedInUserToken: null,
  status: "idle",
  checkUserInitialized: "false",
  error: null,
  checkedUser: false,
  emailSent: null,
  resetPasswordStatus: null,
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
    try {
      const response = await checkUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "auth/signOut",
  async (rejectWithValue) => {
    try {
      const response = await signOut();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// export const verifyTokenAsync = createAsyncThunk(
//   "auth/verifyToken",
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await verifyToken(token);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
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
        state.checkUserInitialized = true;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.checkedUser = true;
        state.checkUserInitialized = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = null;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.emailSent = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.emailSent = null;
        state.resetPasswordStatus = action.payload;
      });
  },
});

export const { logOutUser } = authSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.LoggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectCheckedUser = (state) => state.auth.checkedUser;
export const selectEmailSent = (state) => state.auth.emailSent;
export const selectResetPasswordStatus = (state) =>
  state.auth.resetPasswordStatus;
export const selectAuthStatus = (state) => state.auth.status;
export const selectcheckedUserInitialized = (state) =>
  state.auth.checkUserInitialized;

export default authSlice.reducer;
