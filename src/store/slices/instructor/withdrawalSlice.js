import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawals: [
    {
      method: "PayPal",
      email: "te****t@example.com",
      requestedOn: "March 20, 2024",
      time: "10:30 AM",
      amount: "100",
      status: "Pending",
      reason: "Verification in progress",
    },
    {
      method: "Bank Transfer",
      email: "jo****e@example.com",
      requestedOn: "March 18, 2024",
      time: "02:15 PM",
      amount: "250",
      status: "Success",
      reason: "Funds successfully transferred to the bank account",
    },
    {
      method: "E-Check",
      email: "ec****k@example.com",
      requestedOn: "March 17, 2024",
      time: "09:45 AM",
      amount: "500",
      status: "Cancelled",
      reason: "Insufficient funds in the account",
    },
    {
      method: "PayPal",
      email: "pa****l@example.com",
      requestedOn: "March 22, 2024",
      time: "04:10 PM",
      amount: "75",
      status: "Pending",
      reason: "Awaiting approval from the finance team",
    },
    {
      method: "Bank Transfer",
      email: "bt****r@example.com",
      requestedOn: "March 19, 2024",
      time: "11:00 AM",
      amount: "200",
      status: "Success",
      reason: "Transaction processed successfully",
    },
    {
      method: "E-Check",
      email: "ch****k@example.com",
      requestedOn: "March 21, 2024",
      time: "03:20 PM",
      amount: "150",
      status: "Cancelled",
      reason: "Bank account details mismatch",
    },
  ],
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
