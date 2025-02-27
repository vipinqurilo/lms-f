import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/store/api/api";

const initialState = {
  earning: [
    {
      id: 1,
      type: "course",
      courseName: "React for Beginners",
      price: 199,
      enrolledStudents: 120,
      revenue: 23880,
    },
    {
      id: 2,
      type: "course",
      courseName: "Advanced JavaScript",
      price: 249,
      enrolledStudents: 80,
      revenue: 19920,
    },
    {
      id: 3,
      type: "booking",
      serviceName: "One-on-One Mentorship",
      price: 50,
      bookings: 30,
      revenue: 1500,
    },
    {
      id: 4,
      type: "booking",
      serviceName: "Career Guidance Session",
      price: 75,
      bookings: 20,
      revenue: 1500,
    },
  ],
  totalPages: 5,
  isLoading: {},
  error: {},
};

export const fetchAllEarning = CreateApiAsyncThunk(
  "earning/fetchAllEarning",
  (formData) => {
    const query = Object?.keys(formData)
      ?.map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`https://example.com/?${query}`);
  }
);

const earningSlice = createSlice({
  name: "earning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add the fetchAllEarning reducer here
      .addCase(fetchAllEarning.pending, (state, action) => {
        state.isLoading["fetchAllEarning"] = true;
      })
      .addCase(fetchAllEarning.fulfilled, (state, action) => {
        state.isLoading["fetchAllEarning"] = false;
        state.earning = action.payload.data;
      })
      .addCase(fetchAllEarning.rejected, (state, action) => {
        state.isLoading["fetchAllEarning"] = false;
        state.error["fetchAllEarning"] = action.payload;
      });
  },
});

export default earningSlice.reducer;
