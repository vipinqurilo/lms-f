import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const fetchEnrolledCoursesAsync = CreateApiAsyncThunk(
  "GET/enrolledCourses/fetchEnrolledCoursesAsync",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/students/enrolled-courses?${query}`);
  }
);

const initialState = {
  data: [],
  totalPages: 0,
  isLoading: {},
  error: {},
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledCoursesAsync.pending, (state) => {
        state.isLoading["fetchEnrolledCoursesAsync"] = true;
      })
      .addCase(fetchEnrolledCoursesAsync.fulfilled, (state, action) => {
        state.isLoading["fetchEnrolledCoursesAsync"] = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchEnrolledCoursesAsync.rejected, (state, action) => {
        state.isLoading["fetchEnrolledCoursesAsync"] = false;
        state.error["fetchEnrolledCoursesAsync"] = action.error;
      });
  },
});

export default enrolledCoursesSlice.reducer;
