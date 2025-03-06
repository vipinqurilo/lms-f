import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: {},
  error: {},
};

export const getCardStats = CreateApiAsyncThunk(
  "GET/dashboard/getCardStats",
  () => api.get(`/admin/dashboard`)
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCardStats.pending, (state) => {
        state.isLoading["getCardStats"] = true;
      })
      .addCase(getCardStats.fulfilled, (state, action) => {
        state.isLoading["getCardStats"] = false;
        state.data = action.payload.data;
      })
      .addCase(getCardStats.rejected, (state, action) => {
        state.isLoading["getCardStats"] = false;
        state.error["getCardStats"] = action.payload;
      });
  },
});

export default adminDashboardSlice.reducer;
