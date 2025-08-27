import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      return res.data;
    } catch (error) {
      console.log("Error Signing Up", error);

      return rejectWithValue(error.response?.data || "Failed to Signup");
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      return res.data;
    } catch (error) {
      console.log("Error logging in:", error);
      return rejectWithValue(error.response?.data || "Failed to Login");
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.get("/api/auth/logout");
      return null;
    } catch (error) {
      console.log("Error in loging out:", error);
      return rejectWithValue(error.response?.data || "Failed to logout");
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { ...res.data, token };
    } catch (error) {
      console.log("Error in Google login:", error);
      return rejectWithValue(
        error.response?.data || "Failed to Login with Google"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: JSON.parse(localStorage.getItem("authUser")) || null,
    isLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isSigningUp = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authUser = null;
        state.isSigningUp = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authUser = null;
        state.isLoggingIn = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
        state.isLoggingOut = false;
        localStorage.removeItem("authUser");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.error = action.payload;
      });
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.authUser = null;
        state.isLoggingIn = false;
        state.error = action.payload;
      });
  },
});
export default authSlice.reducer;
