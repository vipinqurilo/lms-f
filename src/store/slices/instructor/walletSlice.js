import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  totalPages: null,
  isLoading: {},
  error: {},
};

export const getWalletDetails = CreateApiAsyncThunk(
  "GET/wallet/getWalletDetails",
  (data) => {
    const query = Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join("&");
    return api.get(`/wallet/transactions?${query}`);
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWalletDetails.pending, (state) => {
        state.isLoading["getWalletDetails"] = true;
      })
      .addCase(getWalletDetails.fulfilled, (state, action) => {
        state.isLoading["getWalletDetails"] = false;
        state.transactions = action.payload.data;
        state.totalPages = action.payload.data?.totalPages;
      })
      .addCase(getWalletDetails.rejected, (state, action) => {
        state.isLoading["getWalletDetails"] = false;
        state.error["getWalletDetails"] = action.payload;
      });
  },
});

export default walletSlice.reducer;
