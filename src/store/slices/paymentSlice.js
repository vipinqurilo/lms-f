import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

const initialState = {
  clientSecret: null,
  isLoading: {},
  error: {},
};

export const createPaymentIntent = CreateApiAsyncThunk(
  "payment/createPaymentIntent",
  (data) => api.post('/stripe/create-payment-intent', data)
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {   
    clearPaymentError: (state, action) => {
      const errorKey = action.payload;
      if (errorKey) {
        delete state.error[errorKey];
      } else {
        state.error = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.isLoading["createPaymentIntent"] = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.isLoading["createPaymentIntent"] = false;
        state.clientSecret = action.payload?.data?.clientSecret;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isLoading["createPaymentIntent"] = false;
        state.error["createPaymentIntent"] = action.payload;
      });
  },
});

export const { clearPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;
