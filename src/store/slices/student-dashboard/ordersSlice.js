import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const fetchOrderHistoryAsync = CreateApiAsyncThunk(
  "orders/fetchOrderHistoryAsync",
  () => api.get(`/order`)
);

const initialState = {
  orderHistory: [],
  isLoading: {},
  error: {},
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistoryAsync.pending, (state) => {
        state.isLoading["fetchOrderHistoryAsync"] = true;
      })
      .addCase(fetchOrderHistoryAsync.fulfilled, (state, action) => {
        state.isLoading["fetchOrderHistoryAsync"] = false;
        state.orderHistory = action.payload?.data || [];
      })
      .addCase(fetchOrderHistoryAsync.rejected, (state, action) => {
        state.isLoading["fetchOrderHistoryAsync"] = false;
        state.error["fetchOrderHistoryAsync"] = action.error?.message;
      });
  },
});

export default ordersSlice.reducer;
