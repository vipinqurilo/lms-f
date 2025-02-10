import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWQiOiI2NzkyMjE1YWVjOTlhMTA4ZDQzMzYxOTEiLCJpYXQiOjE3Mzg2NDY4MDN9.8sgatuSVPhKF_vwLw9jYy1pFae5jsw8pgnVCJVWV_Uw";

const api = axios.create({
  baseURL: "https://56kjq9dz-8000.inc1.devtunnels.ms/api",
  headers: {
    Authorization: token && `Bearer ${token}`,
  },
});

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
