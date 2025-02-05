import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

const initialState = {
  authUser: {
    name: "Arjun",
    role: "instructor",
  },
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(instructorRegister.pending, (state) => {
        state.isLoading["instructorRegister"] = true;
      })
      .addCase(instructorRegister.fulfilled, (state) => {
        state.isLoading["instructorRegister"] = false;
      })
      .addCase(instructorRegister.rejected, (state) => {
        state.isLoading["instructorRegister"] = false;
      });
  },
});

export default userSlice.reducer;
