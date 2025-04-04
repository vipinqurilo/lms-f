import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

// Initial state for bookings
const initialState = {
  bookings: [],
  bookingsByTutorId: [],
  isLoading: {},
  error: {},
  totalPages: 1,
  bookingData: null,
  checkoutUrl: null,
};

// ======= SHARED ACTIONS =======

// Common fetch bookings action for all user types
export const fetchBookingsAsync = CreateApiAsyncThunk(
  "GET/booking/fetchBookingsAsync",
  ({ status, startDate, endDate, search, page = 1, limit = 10, teacherId }) => {
    const params = { status, startDate, endDate, search, page, limit };
    
    if (teacherId && teacherId !== "all") {
      params.teacherId = teacherId;
    }
    
    return api.get(`/bookings`, { params });
  }
);

// ======= STUDENT ACTIONS =======

export const fetchBookingsByTutorIdAsync = CreateApiAsyncThunk(
  "GET/booking/fetchBookingsByTutorIdAsync",  
  ({ teacherId, startDate, endDate }) =>
    api.get(`/bookings/teacher/`, {
      params: { teacherId, startDate, endDate },
    })
);

export const createBookingAsync = CreateApiAsyncThunk(
  "booking/createBookingAsync",
  ({sessionId, mode}) => api.post("/bookings", {sessionId, mode})
);

export const createBookingPayment = CreateApiAsyncThunk(
  "booking/createBookingPayment",
  (bookingData) => api.post("/payment/stripe/booking", bookingData)
);

export const rescheduleResponseAsync = CreateApiAsyncThunk(
  "booking/rescheduleResponseAsync",
  ({ bookingId, action, reason }) =>
    api.put(`/bookings/${bookingId}/reschedule-response`, { action, reason })
);

// ======= INSTRUCTOR ACTIONS =======

export const getBookings = CreateApiAsyncThunk(
  "GET/booking/getBookings",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/bookings?${query}`);
  }
);

export const confirmBooking = CreateApiAsyncThunk(
  "booking/confirmBooking",
  ({ bookingId, link, meetingPlatform }) =>
    api.put(`/bookings/${bookingId}/confirm`, { meetingLink: link, meetingPlatform })
);

export const updateBooking = CreateApiAsyncThunk(
  "booking/updateBooking",
  ({ bookingId, link }) =>
    api.put(`/bookings/${bookingId}/meetingInfo`, { meetingLink: link })
);

export const cancelBooking = CreateApiAsyncThunk(
  "booking/cancelBooking",
  ({ bookingId, reason }) =>
    api.put(`/bookings/${bookingId}/cancel`, { cancellationReason: reason })
);

export const rescheduleBooking = CreateApiAsyncThunk(
  "booking/rescheduleBooking",
  ({ bookingId, newTime, reason }) =>
    api.put(`/bookings/${bookingId}/reschedule-request`, {
      newTime,
      reason,
    })
);

export const updateAvailabilityCalender = CreateApiAsyncThunk(
  "booking/updateAvailabilityCalender",
  (data) => api.put(`/profile/availability-calender`, data)
);

// ======= ADMIN ACTIONS =======
// Any admin-specific actions would go here

const bookingSlice = createSlice({
  name: "booking",
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
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    clearBookingData: (state) => {
      state.bookingData = null;
      state.checkoutUrl = null;
    },
    setCheckoutUrl: (state, action) => {
      state.checkoutUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======= SHARED ACTIONS HANDLERS =======
      
      // fetchBookingsAsync (common fetch action)
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
      
      // ======= STUDENT ACTIONS HANDLERS =======
      
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
        state.checkoutUrl = action.payload?.url || null;
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
      })
      
      // ======= INSTRUCTOR ACTIONS HANDLERS =======
      
      // get bookings details (instructor)
      .addCase(getBookings.pending, (state) => {
        state.isLoading["getBookings"] = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading["getBookings"] = false;
        state.bookings = action.payload?.data || [];
        state.totalPages = action.payload?.totalPages || 1;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading["getBookings"] = false;
        state.error["getBookings"] = action.payload;
      })
      
      // availability calender update
      .addCase(updateAvailabilityCalender.pending, (state) => {
        state.isLoading["updateAvailabilityCalender"] = true;
      })
      .addCase(updateAvailabilityCalender.fulfilled, (state, action) => {
        state.isLoading["updateAvailabilityCalender"] = false;
      })
      .addCase(updateAvailabilityCalender.rejected, (state, action) => {
        state.isLoading["updateAvailabilityCalender"] = false;
        state.error["updateAvailabilityCalender"] = action.payload;
      })
      
      // confirm booking
      .addCase(confirmBooking.pending, (state) => {
        state.isLoading["confirmBooking"] = true;
        state.error["confirmBooking"] = null;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.isLoading["confirmBooking"] = false;
        state.error["confirmBooking"] = null;
        state.bookings = state.bookings.map((booking) => {
          if (booking._id === action.payload?.data?._id) {
            return action.payload?.data
          } else {
            return booking;
          }
        });
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isLoading["confirmBooking"] = false;
        state.error["confirmBooking"] = action.payload;
      })
      
      // update booking
      .addCase(updateBooking.pending, (state) => {
        state.isLoading["updateBooking"] = true;
        state.error["updateBooking"] = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isLoading["updateBooking"] = false;
        state.error["updateBooking"] = null;
        state.bookings = state.bookings.map((booking) => {
          if (booking._id === action.payload?.data?._id) {
            return action.payload?.data;
          } else {
            return booking;
          }
        });
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading["updateBooking"] = false;
        state.error["updateBooking"] = action.payload;
      })
      
      // cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading["cancelBooking"] = true;
        state.error["cancelBooking"] = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading["cancelBooking"] = false;
        state.error["cancelBooking"] = null;
        state.bookings = state.bookings.map((booking) => {
          if (booking._id === action.payload?.data?._id) {
            return action.payload?.data;
          } else {
            return booking;
          }
        });
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.isLoading["cancelBooking"] = false;
        state.error["cancelBooking"] = action.payload;
      })
      
      // reschedule booking
      .addCase(rescheduleBooking.pending, (state) => {
        state.isLoading["rescheduleBooking"] = true;
        state.error["rescheduleBooking"] = null;
      })
      .addCase(rescheduleBooking.fulfilled, (state, action) => {
        state.isLoading["rescheduleBooking"] = false;
        state.error["rescheduleBooking"] = null;
        state.bookings = state.bookings.map((booking) => {
          if (booking._id === action.payload?.data?._id) {
            return action.payload?.data;
          } else {
            return booking;
          }
        });
      })
      .addCase(rescheduleBooking.rejected, (state, action) => {
        state.isLoading["rescheduleBooking"] = false;
        state.error["rescheduleBooking"] = action.payload;
      });
  },
});

export const { clearError, setBookingData, clearBookingData, setCheckoutUrl } = bookingSlice.actions;

export default bookingSlice.reducer; 