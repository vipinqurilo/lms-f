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
  bookings: [
    {
      date: "12 May 2025",
      student: "John Doe",
      instructor: "Jane Smith",
      timeSlot: "30 minutes",
      status: "Confirmed",
    },
    {
      date: "14 May 2025",
      student: "Alice Brown",
      instructor: "Mark Wilson",
      timeSlot: "60 minutes",
      status: "Pending",
    },
    {
      date: "15 May 2025",
      student: "Emma Green",
      instructor: "Chris Taylor",
      timeSlot: "45 minutes",
      status: "Completed",
    },
    {
      date: "16 May 2025",
      student: "Michael Scott",
      instructor: "Jim Halpert",
      timeSlot: "15 minutes",
      status: "Confirmed",
    },
    {
      date: "17 May 2025",
      student: "Dwight Schrute",
      instructor: "Pam Beesly",
      timeSlot: "30 minutes",
      status: "Pending",
    },
    {
      date: "18 May 2025",
      student: "Angela Martin",
      instructor: "Oscar Martinez",
      timeSlot: "60 minutes",
      status: "Completed",
    },
    {
      date: "19 May 2025",
      student: "Kevin Malone",
      instructor: "Stanley Hudson",
      timeSlot: "45 minutes",
      status: "Confirmed",
    },
    {
      date: "20 May 2025",
      student: "Toby Flenderson",
      instructor: "Ryan Howard",
      timeSlot: "15 minutes",
      status: "Pending",
    },
    {
      date: "21 May 2025",
      student: "Meredith Palmer",
      instructor: "Creed Bratton",
      timeSlot: "30 minutes",
      status: "Completed",
    },
    {
      date: "22 May 2025",
      student: "Kelly Kapoor",
      instructor: "Darryl Philbin",
      timeSlot: "60 minutes",
      status: "Confirmed",
    },
  ],
  isLoading: {},
  error: {},
};

export const getBookigs = CreateApiAsyncThunk(
  "booking/getBookigs",
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
      .addCase(getBookigs.pending, (state) => {
        state.isLoading["getBookigs"] = true;
      })
      .addCase(getBookigs.fulfilled, (state, action) => {
        state.isLoading["getBookigs"] = false;
        // state.bookings = action.payload.data;
      })
      .addCase(getBookigs.rejected, (state, action) => {
        state.isLoading["getBookigs"] = false;
        state.error["getBookigs"] = action.payload;
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
