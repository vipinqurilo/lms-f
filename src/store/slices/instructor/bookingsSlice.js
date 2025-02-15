import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  isLoading: {},
  error: {},
};

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
  ({ bookingId, link }) =>
    api.put(`/bookings/${bookingId}/confirm`, { meetingLink: link })
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

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get bookings details
      .addCase(getBookings.pending, (state) => {
        state.isLoading["getBookings"] = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading["getBookings"] = false;
        state.bookings = action.payload?.data;
        state.totalPages = action.payload?.totalPages;
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
          if (booking._id === action.payload?.booking?._id) {
            return action.payload?.booking;
          } else {
            return booking;
          }
        });
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isLoading["confirmBooking"] = false;
        state.error["confirmBooking"] = action.payload;
      })
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

export default bookingSlice.reducer;
