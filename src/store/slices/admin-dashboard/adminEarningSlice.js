import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminCourseEarning: [],
  adminTutionEarning: [],
  totalPages: 0,
  isLoading: {},
  error: {},
};

console.log(api, "api", CreateApiAsyncThunk, "CreateApiAsyncThunk");

export const fetchAllCourseEarningForAdmin = CreateApiAsyncThunk(
  "GET/earning/fetchAllCourseEarningForAdmin",
  (formData) => {
    const query = Object?.keys(formData)
      ?.map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/sales/course-purchases/?${query}`);
  }
);
export const fetchAllTutionEarningForAdmin = CreateApiAsyncThunk(
  "GET/earning/fetchAllTutionEarningForAdmin",
  (formData) => {
    const query = Object?.keys(formData)
      ?.map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/sales/tution-sessions/?${query}`);
  }
);

const adminEarningSlice = createSlice({
  name: "adminEarning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add the fetchAllCoursesEarning reducer here
      .addCase(fetchAllCourseEarningForAdmin.pending, (state) => {
        state.isLoading["fetchAllCourseEarningForAdmin"] = true;
      })
      .addCase(fetchAllCourseEarningForAdmin.fulfilled, (state, action) => {
        state.isLoading["fetchAllCourseEarningForAdmin"] = false;
        state.adminCourseEarning = action.payload?.data || []; // Ensure it's always an array
        state.totalPages = action.payload?.totalPages || 0;
      })
      .addCase(fetchAllCourseEarningForAdmin.rejected, (state, action) => {
        state.isLoading["fetchAllCourseEarningForAdmin"] = false;
        state.error["fetchAllCourseEarningForAdmin"] = action.payload;
      })
      // Add the fetchAllTutionEarningForAdmin reducer here
      .addCase(fetchAllTutionEarningForAdmin.pending, (state) => {
        state.isLoading["fetchAllTutionEarningForAdmin"] = true;
      })
      .addCase(fetchAllTutionEarningForAdmin.fulfilled, (state, action) => {
        state.isLoading["fetchAllTutionEarningForAdmin"] = false;
        state.adminTutionEarning = action.payload?.data || [];
      })
      .addCase(fetchAllTutionEarningForAdmin.rejected, (state, action) => {
        state.isLoading["fetchAllTutionEarningForAdmin"] = false;
        state.error["fetchAllTutionEarningForAdmin"] = action.payload;
      });
  },
});

export default adminEarningSlice.reducer;
