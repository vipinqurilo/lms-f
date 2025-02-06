import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const getAllWithdraws = CreateApiAsyncThunk(
  "GET/teacher/getAllWithdraws",
  () => api.get(`/api/course/admin/get`)
);

export const withdrawSlice = createSlice({
  name: "widthdraw",
  initialState: {
    withdraws: [],
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    // extra reducers here

    builder
      .addCase(getAllWithdraws.pending, (state, action) => {
        state.isLoading["getAllWithdraws"] = true;
      })
      .addCase(getAllWithdraws.fulfilled, (state, action) => {
        state.isLoading["getAllWithdraws"] = false;
        state.withdraws = action.payload;
      })
      .addCase(getAllWithdraws.rejected, (state, action) => {
        state.isLoading["getAllWithdraws"] = false``;
        state.error["getAllWithdraws"] = action.payload;
      });
  },
});

export default courseSlice.reducer;
