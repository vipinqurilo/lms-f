import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

// Async thunks for booking actions
export const fetchAvailabilityAsync = CreateApiAsyncThunk(
  "availability/fetchAvailabilityAsync",
  () => api.get(`/api/profile/availability-calendar`)
);

export const updateAvailabilityAsync = CreateApiAsyncThunk(
  "availability/updateAvailabilityAsync",
  (availabilityData) =>
    api.put("/api/profile/availability-calendar", {
      availability: availabilityData,
    })
);
// Initial state for bookings
const initialState = {
  availability: [],
  isLoading: {},
  error: {},
};

const availabilitySlice = createSlice({
  name: "instructor/availability",
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
      .addCase(fetchAvailabilityAsync.pending, (state) => {
        state.isLoading["fetchBookingsAsync"] = true;
      })
      .addCase(fetchAvailabilityAsync.fulfilled, (state, action) => {
        state.isLoading["fetchAvailabilityAsync"] = false;
        state.availability = action.payload?.data || [];
      })
      .addCase(fetchAvailabilityAsync.rejected, (state, action) => {
        state.isLoading["fetchAvailabilityAsync"] = false;
        state.error["fetchAvailabilityAsync"] = action.payload;
      })
      .addCase(updateAvailabilityAsync.pending, (state) => {
        state.isLoading["updateAvailabilityAsync"] = true;
      })
      .addCase(updateAvailabilityAsync.fulfilled, (state, action) => {
        state.isLoading["updateAvailabilityAsync"] = false;
      })
      .addCase(updateAvailabilityAsync.rejected, (state, action) => {
        state.isLoading["updateAvailabilityAsync"] = false;
        state.error["updateAvailabilityAsync"] = action.payload;
      });
  },
});

export const { clearError } = availabilitySlice.actions;

export default availabilitySlice.reducer;
