import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawals: [],
  withdrawalMethds: {},
  balance: null,
  isLoading: {},
  error: {},
};

export const getWallet = CreateApiAsyncThunk("GET/withdrawal/getWallet", () =>
  api.get(`/wallet`)
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
      });
  },
});

// export const { handleSelectedwithdrawal } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
