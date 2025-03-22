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
  api.get(`/auth/logout`)
);

export const userLoginForAdmin = CreateApiAsyncThunk(
  "GET/user/userLoginForAdmin",
  (userId) => api.get(`/auth/admin-usertoken?userId=${userId}`)
);

export const resendVerificationEmailAsync = CreateApiAsyncThunk(
  "user/resendVerificationEmailAsync",
  (email) => api.post("/auth/resendverificationemail", { email })
);

const initialState = {
  authUser: null,
  isAuthenticated: false,
  isLoading: {},
  successMessage: null,
  error: {},
};

export const instructorRegister = CreateApiAsyncThunk(
  "user/instructorRegister",
  (data) => api.post(`/auth/register`, data)
);

export const forgotPasswordAsync = CreateApiAsyncThunk(
  "user/forgotPasswordAsync",
  (email) => api.post(`/forgotpassword`, { email })
);

export const resetPasswordAsync = CreateApiAsyncThunk(
  "user/resetPasswordAsync",
  ({ token, newPassword, confirmPassword }) =>
    api.post(`/forgotpassword/${token}`, { newPassword, confirmPassword })
);

export const verifyEmailAsync = CreateApiAsyncThunk(
  "user/verifyEmailAsync",
  (token) => api.get(`/auth/verify-email/${token}`)
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.authUser = null;
      localStorage.setItem("isAdmin", JSON.stringify(false));
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
        console.log();
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
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.isLoading["forgotPasswordAsync"] = true;
        state.error["forgotPasswordAsync"] = null;
        state.successMessage = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.isLoading["forgotPasswordAsync"] = false;
        state.successMessage = action.payload?.message;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.isLoading["forgotPasswordAsync"] = false;
        state.error["forgotPasswordAsync"] =
          action.payload?.message || "Something went wrong";
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.isLoading["resetPasswordAsync"] = true;
        state.error["resetPasswordAsync"] = null;
        state.successMessage = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.isLoading["resetPasswordAsync"] = false;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.isLoading["resetPasswordAsync"] = false;
        state.error["resetPasswordAsync"] =
          action.payload?.message || "Something went wrong";
      })
      // user login for admin access
      .addCase(userLoginForAdmin.pending, (state) => {
        state.isLoading["userLoginForAdmin"] = true;
      })
      .addCase(userLoginForAdmin.fulfilled, (state, action) => {
        state.isLoading["userLoginForAdmin"] = false;
      })
      .addCase(userLoginForAdmin.rejected, (state) => {
        state.isLoading["userLoginForAdmin"] = false;
        state.isAuthenticated = false;
      })

      .addCase(verifyEmailAsync.pending, (state) => {
        state.isLoading["verifyEmailAsync"] = true;
        state.error["verifyEmailAsync"] = null;
        state.successMessage = null;
      })
      .addCase(verifyEmailAsync.fulfilled, (state, action) => {
        state.isLoading["verifyEmailAsync"] = false;
        state.successMessage = action.payload?.message;
      })
      .addCase(verifyEmailAsync.rejected, (state, action) => {
        state.isLoading["verifyEmailAsync"] = false;
        state.error["verifyEmailAsync"] =
          action.payload?.message || "Something went wrong";
      })

      .addCase(resendVerificationEmailAsync.pending, (state) => {
        state.isLoading["resendVerificationEmailAsync"] = true;
        state.error["resendVerificationEmailAsync"] = null;
        state.successMessage = null;
      })
      .addCase(resendVerificationEmailAsync.fulfilled, (state, action) => {
        state.isLoading["resendVerificationEmailAsync"] = false;
        state.successMessage = action.payload?.message;
      })
      .addCase(resendVerificationEmailAsync.rejected, (state, action) => {
        state.isLoading["resendVerificationEmailAsync"] = false;
        state.error["resendVerificationEmailAsync"] =
          action.payload?.message || "Something went wrong";
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
