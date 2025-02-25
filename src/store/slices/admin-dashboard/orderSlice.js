import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const fetchAllOrders = CreateApiAsyncThunk(
  "GET/orders/fetchAllOrders",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/order?${query}`);
  }
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
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading["fetchAllOrders"] = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading["fetchAllOrders"] = false;
        state.orderHistory = action.payload?.data || [];
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading["fetchAllOrders"] = false;
        state.error["fetchAllOrders"] = action.error?.message;
      });
  },
});

export default ordersSlice.reducer;
