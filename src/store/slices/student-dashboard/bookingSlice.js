import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

// Async thunks for booking actions
export const fetchBookingsAsync = CreateApiAsyncThunk(
  "booking/fetchBookingsAsync",
  ({ status = "Scheduled", startDate, endDate }) =>
    api.get(`/api/bookings`, {
      params: { status, startDate, endDate },
    })
);

// Initial state for bookings
const initialState = {
  bookings: [],
  isLoading: {},
  error: {},
};

const bookingSlice = createSlice({
  name: "student/booking",
  initialState,
  reducers: {
    clearError: (state, action) => {
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
      // Fetch bookings
      .addCase(fetchBookingsAsync.pending, (state) => {
        state.isLoading["fetchBookingsAsync"] = true;
      })
      .addCase(fetchBookingsAsync.fulfilled, (state, action) => {
        state.isLoading["fetchBookingsAsync"] = false;
        state.bookings = action.payload?.data || [];
      })
      .addCase(fetchBookingsAsync.rejected, (state, action) => {
        state.isLoading["fetchBookingsAsync"] = false;
        state.error["fetchBookingsAsync"] = action.payload;
      });
  },
});

export const { clearError } = bookingSlice.actions;

export default bookingSlice.reducer;
