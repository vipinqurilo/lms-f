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
      });
  },
});

export default bookingSlice.reducer;
