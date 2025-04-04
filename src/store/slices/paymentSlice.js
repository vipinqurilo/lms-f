import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

const initialState = {
  clientSecret: null,
  courseSessionURL: null,
  payfastCheckoutData: null,
  isLoading: {},
  error: {},
};

export const createPaymentIntent = CreateApiAsyncThunk(
  "payment/createPaymentIntent",
  (data) => api.post("/stripe/create-payment-intent", data)
);

export const createPaymentCourse = CreateApiAsyncThunk(
  "payment/createPaymentCourse",
  (data) => api.post("/payment/stripe/course", data)
);

export const createPayfastBookingCheckout = CreateApiAsyncThunk(
  "payment/createPayfastBookingCheckout",
  (data) => api.post("/payment/payfast/booking", data)
);

export const createOrderPayfast = CreateApiAsyncThunk("courses/createOrderPayfast", (data) =>
  api.post(`/payment/payfast/course`, data)
);


export const createPayfastCourseCheckout = CreateApiAsyncThunk(
  "payment/createPayfastCourseCheckout",
  (data) => api.post("/payment/payfast/course", data)
);

export const verifyPayfastPayment = CreateApiAsyncThunk(
  "GET/payment/verifyPayfastPayment",
  (paymentId) => api.post(`/payment/payfast/verify`, {paymentId})
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
    clearPayfastCheckoutData: (state) => {
      state.payfastCheckoutData = null;
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
      })
      .addCase(createPaymentCourse.pending, (state) => {
        state.isLoading["createPaymentCourse"] = true;
      })
      .addCase(createPaymentCourse.fulfilled, (state, action) => {
        state.isLoading["createPaymentCourse"] = false;
        state.courseSessionURL = action.payload?.sessionId;
      })
      .addCase(createPaymentCourse.rejected, (state, action) => {
        state.isLoading["createPaymentCourse"] = false;
        state.error["createPaymentCourse"] = action.payload;
      })
      // PayFast booking checkout
      .addCase(createPayfastBookingCheckout.pending, (state) => {
        state.isLoading["createPayfastBookingCheckout"] = true;
        state.payfastCheckoutData = null; // Clear previous data
      })
      .addCase(createPayfastBookingCheckout.fulfilled, (state, action) => {
        state.isLoading["createPayfastBookingCheckout"] = false;
        
        // Log the full response for debugging
        console.log("Full PayFast response:", action.payload);
        
        // Check if we have a valid response with data
        if (action.payload?.success && action.payload?.data) {
          // Store the entire response data
          state.payfastCheckoutData = action.payload;
          console.log("PayFast checkout data set:", state.payfastCheckoutData);
        } else {
          // Log error and clear the checkout data
          console.error("Invalid response structure from PayFast API:", action.payload);
          state.error["createPayfastBookingCheckout"] = "Invalid response from server";
          state.payfastCheckoutData = null;
        }
      })
      .addCase(createPayfastBookingCheckout.rejected, (state, action) => {
        state.isLoading["createPayfastBookingCheckout"] = false;
        state.error["createPayfastBookingCheckout"] = action.payload;
        console.error("PayFast booking checkout error:", action.payload);
      })
      .addCase(createOrderPayfast.pending, (state) => {
        state.isLoading["createOrderPayfast"] = true;
      })
      .addCase(createOrderPayfast.fulfilled, (state, action) => {
        state.isLoading["createOrderPayfast"] = false;
        state.payfastCheckoutData = action.payload;
      })
      .addCase(createOrderPayfast.rejected, (state, action) => {
        state.isLoading["createOrderPayfast"] = false;
        state.error["createOrderPayfast"] = action.payload;
        console.error("PayFast booking checkout error:", action.payload);
      })
      // PayFast course checkout
      .addCase(createPayfastCourseCheckout.pending, (state) => {
        state.isLoading["createPayfastCourseCheckout"] = true;
        state.payfastCheckoutData = null; // Clear previous data
      })
      .addCase(createPayfastCourseCheckout.fulfilled, (state, action) => {
        state.isLoading["createPayfastCourseCheckout"] = false;
        
        // Log the full response for debugging
        console.log("Full PayFast Course response:", action.payload);
        
        // Check if we have a valid response with data
        if (action.payload?.success && action.payload?.data) {
          // Store the entire response data
          state.payfastCheckoutData = action.payload;
          console.log("PayFast course checkout data set:", state.payfastCheckoutData);
        } else {
          // Log error and clear the checkout data
          console.error("Invalid response structure from PayFast API for course:", action.payload);
          state.error["createPayfastCourseCheckout"] = "Invalid response from server";
          state.payfastCheckoutData = null;
        }
      })
      .addCase(createPayfastCourseCheckout.rejected, (state, action) => {
        state.isLoading["createPayfastCourseCheckout"] = false;
        state.error["createPayfastCourseCheckout"] = action.payload;
        console.error("PayFast course checkout error:", action.payload);
      })
      // Verify PayFast payment
      .addCase(verifyPayfastPayment.pending, (state) => {
        state.isLoading["verifyPayfastPayment"] = true;
        state.error["verifyPayfastPayment"] = null;
      })
      .addCase(verifyPayfastPayment.fulfilled, (state, action) => {
        state.isLoading["verifyPayfastPayment"] = false;
        // Clear any previous errors
        state.error["verifyPayfastPayment"] = null;
      })
      .addCase(verifyPayfastPayment.rejected, (state, action) => {
        state.isLoading["verifyPayfastPayment"] = false;
        state.error["verifyPayfastPayment"] = action.payload;
        console.error("PayFast verification error:", action.payload);
      });
  },
});

export const { clearPaymentError, clearPayfastCheckoutData } = paymentSlice.actions;
export default paymentSlice.reducer;
