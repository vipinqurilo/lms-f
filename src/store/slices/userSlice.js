import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

export const userRegisterAsync = CreateApiAsyncThunk(
  "user/userRegisterAsync",
  (userData) => api.post(`/auth/register`, userData)
);

export const userLoginAsync = CreateApiAsyncThunk(
  "user/userLoginAsync",
  (userData) => api.post(`/auth/login`, userData)
);

export const verifyLoggedInUser = CreateApiAsyncThunk(
  "GET/user/verifyLoggedInUser",
  () => api.post(`/auth/verify-token`)
);

export const logout = CreateApiAsyncThunk("user/logout", () =>
  api.post(`/auth/logout`)
);

const initialState = {
  authUser: null,
  isAuthenticated: false,
  isLoading: {},
  error: {},
};

export const instructorRegister = CreateApiAsyncThunk(
  "user/instructorRegister",
  (data) => api.post(`/auth/register`, data)
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.authUser = null;
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userRegisterAsync.pending, (state, action) => {
        state.isLoading["userRegisterAsync"] = true;
      })
      .addCase(userRegisterAsync.fulfilled, (state, action) => {
        state.isLoading["userRegisterAsync"] = false;
        state.authUser = action.payload?.data;
        state.isAuthenticated =
          action.payload?.status === "error" ? false : true;
      })
      .addCase(userRegisterAsync.rejected, (state, action) => {
        state.isLoading["userRegisterAsync"] = false;
        state.authUser = action.payload?.data;
        
        state.isAuthenticated =
          action.payload?.status === "error" ? false : true;
      })
      .addCase(userLoginAsync.pending, (state, action) => {
        state.isLoading["userLoginAsync"] = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.isLoading["userLoginAsync"] = false;
        state.authUser = action.payload?.data;
        console.log()
        state.isAuthenticated =
          action.payload?.status === "error" ? false : true;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.isLoading["userLoginAsync"] = false;
        state.error["userLoginAsync"] = action.payload;
        state.isAuthenticated = false;
      })

      .addCase(instructorRegister.pending, (state) => {
        state.isLoading["instructorRegister"] = true;
      })
      .addCase(instructorRegister.fulfilled, (state, action) => {
        state.isLoading["instructorRegister"] = false;
        state.authUser = action.payload?.data;
        state.isAuthenticated =
          action.payload?.status === "error" ? false : true;
      })
      .addCase(instructorRegister.rejected, (state) => {
        state.isLoading["instructorRegister"] = false;
      })
      .addCase(verifyLoggedInUser.pending, (state) => {
        state.isLoading["verifyLoggedInUser"] = true;
      })
      .addCase(verifyLoggedInUser.fulfilled, (state, action) => {
        state.isLoading["verifyLoggedInUser"] = false;
        state.authUser = action.payload.data ? action.payload.data : {};
        state.isAuthenticated =
          action.payload?.status === "error" ? false : true;
      })
      .addCase(verifyLoggedInUser.rejected, (state) => {
        state.isLoading["verifyLoggedInUser"] = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading["logout"] = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading["logout"] = false;
        state.authUser = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading["logout"] = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;