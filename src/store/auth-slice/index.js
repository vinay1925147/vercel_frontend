import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    formData,
    { withCredentials: true }
  );
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logoutUser", async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-cache,no-store,must-revalidate , proxy-revalidate",
      },
    }
  );
  console.log(response.data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUser can be used to set user directly (e.g. from persisted state)
    setUser: (state, action) => {
      state.user = action.payload ?? null;
      state.isAuthenticated = !!action.payload;
    },
    // optional: clear auth
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        // After registration you might still want the user to login, so keep unauthenticated
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.user = action.payload?.success ? action.payload.user : null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload?.success;
        state.user = action.payload?.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload?.success;
        state.user = action.payload?.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});
export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
