import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";

export const fetchCategories = CreateApiAsyncThunk(
  "GET/courses/fetchCategories",
  () => api.get(`api/category/filter`, data)
);

export const fetchCoursesAsync = CreateApiAsyncThunk(
  "GET/courses/fetchCoursesAsync",
  () => api.get(`/api/course/admin/get`)
);

export const wishlistAsync = CreateApiAsyncThunk(
  "courses/wishlistAsync",
  (data) => api.post(`/api/wishlist`, data)
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    categories: [],
    courses: [],
    wishlist: [],
    isLoading: {},
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading["fetchCategories"] = true;
        state.error["fetchCategories"] = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading["fetchCategories"] = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading["fetchCategories"] = false;
        state.error["fetchCategories"] = action.error.message;
      })
      .addCase(wishlistAsync.pending, (state, action) => {
        state.isLoading["wishlistAsync"] = true;
      })
      .addCase(wishlistAsync.fulfilled, (state, action) => {
        state.isLoading["wishlistAsync"] = false;
        state.wishlist = action.payload?.data;
      })
      .addCase(wishlistAsync.rejected, (state, action) => {
        state.isLoading["wishlistAsync"] = false;
        state.error["wishlistAsync"] = action.payload;
      })
      .addCase(fetchCoursesAsync.pending, (state, action) => {
        state.isLoading["fetchCoursesAsync"] = true;
      })
      .addCase(fetchCoursesAsync.fulfilled, (state, action) => {
        state.isLoading["fetchCoursesAsync"] = false;
        state.courses = action.payload?.data;
      })
      .addCase(fetchCoursesAsync.rejected, (state, action) => {
        state.isLoading["fetchCoursesAsync"] = false;
        state.error["fetchCoursesAsync"] = action.payload;
      });
  },
});

export default coursesSlice.reducer;
