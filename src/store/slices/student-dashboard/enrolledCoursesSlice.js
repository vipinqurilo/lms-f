import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Thunk to fetch enrolled courses
export const fetchEnrolledCoursesAsync = CreateApiAsyncThunk(
  "GET/enrolledCourses/fetchEnrolledCoursesAsync",
  async () => {
    const response = await api.get(`/order`);
    return response.data; // Assuming the course data is in the "data" property
  }
);  

const initialState = {
  data: [],
  isLoading: {},
  error: {},
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchEnrolledCoursesAsync
      .addCase(fetchEnrolledCoursesAsync.pending, (state) => {
        state.isLoading["fetchEnrolledCoursesAsync"] = true;
      })
      .addCase(fetchEnrolledCoursesAsync.fulfilled, (state, action) => {
        state.isLoading["fetchEnrolledCoursesAsync"] = false;
        state.data = action.payload;
      })
      .addCase(fetchEnrolledCoursesAsync.rejected, (state, action) => {
        state.isLoading["fetchEnrolledCoursesAsync"] = false;
        state.error["fetchEnrolledCoursesAsync"] = action.error;
      });
  },
});

export default enrolledCoursesSlice.reducer;
