import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

// Async thunks for booking actions
export const fetchBookingsAsync = CreateApiAsyncThunk(
  "booking/fetchBookingsAsync",
  ({ status, startDate, endDate, keyword, page = 1, limit = 10 }) =>
    api.get(`/api/bookings`, {
      params: { status, startDate, endDate, keyword, page, limit },
    })
);
export const createBookingAsync = CreateApiAsyncThunk(
  "booking/createBookingAsync",
  (bookingData) => api.post("/api/bookings", bookingData)
);
// Initial state for bookings
const initialState = {
  bookings: [],

  isLoading: {},
  error: {},
  totalPages: 1,
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
        state.totalPages = action.payload?.totalPages || 1;
      })
      .addCase(fetchBookingsAsync.rejected, (state, action) => {
        state.isLoading["fetchBookingsAsync"] = false;
        state.error["fetchBookingsAsync"] = action.payload;
      })
      .addCase(createBookingAsync.pending, (state) => {
        state.isLoading["createBookingAsync"] = true;
      })
      .addCase(createBookingAsync.fulfilled, (state, action) => {
        state.isLoading["createBookingAsync"] = false;
      })
      .addCase(createBookingAsync.rejected, (state, action) => {
        state.isLoading["createBookingAsync"] = false;
        state.error["createBookingAsync"] = action.payload;
      });
  },
});

export const { clearError } = bookingSlice.actions;

export default bookingSlice.reducer;
