import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

// Async thunks for booking actions
export const fetchBookingsAsync = CreateApiAsyncThunk(
  "GET/booking/fetchBookingsAsync",
  ({ status, startDate, endDate, search, page = 1, limit = 10, teacherId }) =>
    api.get(`/bookings`, {
      params: { status,
         startDate, endDate,
          search, page, limit,
         teacherId 
        
        },
    })
);

export const fetchBookingsByTutorIdAsync = CreateApiAsyncThunk(
  "GET/booking/fetchBookingsByTutorIdAsync",
  (teacherId) => api.get(`/bookings/`, { params: { teacherId } })
);

export const createBookingAsync = CreateApiAsyncThunk(
  "booking/createBookingAsync",
  (sessionId) => api.post("/bookings", sessionId)
);
export const createBookingPayment = CreateApiAsyncThunk(
  "booking/createBookingPayment",
  (bookingData) => api.post("/payment/stripe/booking", bookingData)
);
export const rescheduleResponseAsync = CreateApiAsyncThunk(
  "booking/rescheduleResponseAsync",
  ({ bookingId, action }) =>
    api.put(`/bookings/${bookingId}/reschedule-response`, { action })
);
// Initial state for bookings
const initialState = {
  bookings: [],
  bookingsByTutorId: [],
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
      })
      .addCase(createBookingPayment.pending, (state) => {
        state.isLoading["createBookingPayment"] = true;
      })
      .addCase(createBookingPayment.fulfilled, (state, action) => {
        state.isLoading["createBookingPayment"] = false;
      })
      .addCase(createBookingPayment.rejected, (state, action) => {
        state.isLoading["createBookingPayment"] = false;
        state.error["createBookingPayment"] = action.payload;
      })
      .addCase(fetchBookingsByTutorIdAsync.pending, (state) => {
        state.isLoading["fetchBookingsByTutorIdAsync"] = true;
      })
      .addCase(fetchBookingsByTutorIdAsync.fulfilled, (state, action) => {
        state.isLoading["fetchBookingsByTutorIdAsync"] = false;
        state.bookingsByTutorId = action.payload?.data || [];
      })
      .addCase(fetchBookingsByTutorIdAsync.rejected, (state, action) => {
        state.isLoading["fetchBookingsByTutorIdAsync"] = false;
        state.error["fetchBookingsByTutorIdAsync"] = action.payload;
      })
      .addCase(rescheduleResponseAsync.pending, (state) => {
        state.isLoading["rescheduleResponseAsync"] = true;
      })
      .addCase(rescheduleResponseAsync.fulfilled, (state, action) => {
        state.isLoading["rescheduleResponseAsync"] = false;
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload.data._id
            ? action.payload.data
            : booking
        );
      })
      .addCase(rescheduleResponseAsync.rejected, (state, action) => {
        state.isLoading["rescheduleResponseAsync"] = false;
        state.error["rescheduleResponseAsync"] = action.payload;
      });
  },
});

export const { clearError } = bookingSlice.actions;

export default bookingSlice.reducer;
