import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isCollapsed: false,
  isLoading: {},
  error: {},
};

export const getCardStats = CreateApiAsyncThunk("GET/dashboard/getCardStats", () =>
  api.get(`/tutors/dashboard`)
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleIsCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardStats.pending, (state) => {
        state.isLoading["getCardStats"] = true;
      })
      .addCase(getCardStats.fulfilled, (state, action) => {
        state.isLoading["getCardStats"] = false;
        state.data = action.payload.data;
      })
      .addCase(getCardStats.rejected, (state) => {
        state.isLoading["getCardStats"] = false;
      });
  },
});

export const { toggleIsCollapsed } = dashboardSlice.actions;
export default dashboardSlice.reducer;
