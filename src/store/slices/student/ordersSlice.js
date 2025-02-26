import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const fetchOrderHistoryAsync = CreateApiAsyncThunk(
  "GET/orders/fetchOrderHistoryAsync",
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
  totalOrders:null,
  totalPages:1,
  currentPage:1,
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
        console.log(action.payload,'action.payload')
        state.isLoading["fetchOrderHistoryAsync"] = false;
        state.orderHistory = action.payload?.data?.orders || [];
        state.currentPage=action.payload?.data?.currentPage;
        state.totalOrders=action.payload?.data?.totalOrders;
        state.totalPages=action.payload?.data?.totalPages;
      })
      .addCase(fetchOrderHistoryAsync.rejected, (state, action) => {
        state.isLoading["fetchOrderHistoryAsync"] = false;
        state.error["fetchOrderHistoryAsync"] = action.error?.message;
      });
  },
});

export default ordersSlice.reducer;
