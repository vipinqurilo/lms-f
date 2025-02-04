import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

export const userRegisterAsync = CreateApiAsyncThunk(
  "user/userRegisterAsync",
  (userData) => api.post(`/api/auth/register`, userData)
);

export const userLoginAsync = CreateApiAsyncThunk(
  "user/userLoginAsync",
  (userData) => api.post(`/api/auth/login`, userData)
);

const initialState = {
  authUser: {},
  isLoading: {},
  error: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterAsync.pending, (state, action) => {
        state.isLoading["userRegisterAsync"] = true;
      })
      .addCase(userRegisterAsync.fulfilled, (state, action) => {
        state.isLoading["userRegisterAsync"] = false;
        state.authUser = action.payload?.data;
      })
      .addCase(userRegisterAsync.rejected, (state, action) => {
        state.isLoading["userRegisterAsync"] = false;
        state.error["userRegisterAsync"] = action.payload;
      })
      .addCase(userLoginAsync.pending, (state, action) => {
        state.isLoading["userLoginAsync"] = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.isLoading["userLoginAsync"] = false;
        state.authUser = action.payload?.data;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.isLoading["userLoginAsync"] = false;
        state.error["userLoginAsync"] = action.payload;
      });
  },
});

export default userSlice.reducer;
