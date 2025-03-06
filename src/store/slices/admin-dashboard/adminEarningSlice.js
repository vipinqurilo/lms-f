import { api } from "../../api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminCourseEarning: [],
  adminTutionEarning: [],
  totalPages: 0,
  isLoading: {},
  error: {},
};

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
      .addCase(fetchAllCourseEarningForAdmin.pending, (state, action) => {
        state.isLoading["fetchAllCourseEarningForAdmin"] = true;
      })
      .addCase(fetchAllCourseEarningForAdmin.fulfilled, (state, action) => {
        state.isLoading["fetchAllCourseEarningForAdmin"] = false;
        state.adminCourseEarning = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllCourseEarningForAdmin.rejected, (state, action) => {
        state.isLoading["fetchAllCourseEarningForAdmin"] = false;
        state.error["fetchAllCourseEarningForAdmin"] = action.payload;
      })
      // Add the fetchAllTutionEarningForAdmin reducer here
      .addCase(fetchAllTutionEarningForAdmin.pending, (state, action) => {
        state.isLoading["fetchAllTutionEarningForAdmin"] = true;
      })
      .addCase(fetchAllTutionEarningForAdmin.fulfilled, (state, action) => {
        state.isLoading["fetchAllTutionEarningForAdmin"] = false;
        state.adminTutionEarning = action.payload.data;
      })
      .addCase(fetchAllTutionEarningForAdmin.rejected, (state, action) => {
        state.isLoading["fetchAllTutionEarningForAdmin"] = false;
        state.error["fetchAllTutionEarningForAdmin"] = action.payload;
      });
  },
});

export default adminEarningSlice.reducer;
