import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawals: [],
  totalPages: null,
  balance: null,
  isLoading: {},
  error: {},
};

export const getWallet = CreateApiAsyncThunk("GET/withdrawal/getWallet", () =>
  api.get(`/wallet`)
);

export const getWithDrawals = CreateApiAsyncThunk(
  "GET/withdrawal/getWithDrawals",
  (data) => {
    const query = Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join("&");
    return api.get(`/withdrawals?${query}`);
  }
);

export const requestWithdrawal = CreateApiAsyncThunk(
  "withdrawal/requestWithdrawal",
  (data) => api.post(`/withdrawals/request`, data)
);

export const updateWithdrawalStatus = CreateApiAsyncThunk(
  "withdrawal/updateWithdrawalStatus",
  ({ id, data }) => api.put(`/withdrawals/${id}/action`, data)
);

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWallet.pending, (state) => {
        state.isLoading["getWallet"] = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.isLoading["getWallet"] = false;
        state.balance = action.payload?.data?.balance;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.isLoading["getWallet"] = false;
        state.error["getWallet"] = action.payload;
      })
      // get withdrawals
      .addCase(getWithDrawals.pending, (state) => {
        state.isLoading["getWithDrawals"] = true;
      })
      .addCase(getWithDrawals.fulfilled, (state, action) => {
        state.isLoading["getWithDrawals"] = false;
        state.withdrawals = action.payload?.data;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(getWithDrawals.rejected, (state, action) => {
        state.isLoading["getWithDrawals"] = false;
        state.error["getWithDrawals"] = action.payload;
      })
      // request withdrawals
      .addCase(requestWithdrawal.pending, (state) => {
        state.isLoading["requestWithdrawal"] = true;
      })
      .addCase(requestWithdrawal.fulfilled, (state, action) => {
        state.isLoading["requestWithdrawal"] = false;
        const request = action.payload?.data;
        state.withdrawals = [...state.withdrawals, request];
      })
      .addCase(requestWithdrawal.rejected, (state, action) => {
        state.isLoading["requestWithdrawal"] = false;
        state.error["requestWithdrawal"] = action.payload;
      })
      // status update withdrawals
      .addCase(updateWithdrawalStatus.pending, (state) => {
        state.isLoading["updateWithdrawalStatus"] = true;
      })
      .addCase(updateWithdrawalStatus.fulfilled, (state, action) => {
        state.isLoading["updateWithdrawalStatus"] = false;
      })
      .addCase(updateWithdrawalStatus.rejected, (state, action) => {
        state.isLoading["updateWithdrawalStatus"] = false;
        state.error["updateWithdrawalStatus"] = action.payload;
      });
  },
});

export default withdrawalSlice.reducer;
