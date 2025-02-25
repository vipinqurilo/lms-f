import { createSlice } from "@reduxjs/toolkit";
import { api, api2 } from "../api/api";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";

export const fetchCategories = CreateApiAsyncThunk(
  "GET/courses/fetchCategories",
  () => api.get(`/category`)
);

export const fetchCoursesAsync = CreateApiAsyncThunk(
  "GET/courses/fetchCoursesAsync",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/course/admin/get?${query}`);
  }
);

export const fetchSingleCourse = CreateApiAsyncThunk(
  "GET/courses/fetchSingleCourse",
  (id) => api.get(`/course/front/${id}`)
);

export const wishlistAsync = CreateApiAsyncThunk(
  "courses/wishlistAsync",
  (data) => api.post(`/whishlist`, data)
);

export const addOrderAsync = CreateApiAsyncThunk(
  "courses/addOrderAsync",
  (data) => api.post(`/order/create-payment-intent`, data)
);

// create order
export const createOrder = CreateApiAsyncThunk("courses/createOrder", (data) =>
  api.post(`/order/stripe`, data)
);

// add review
export const addReview = CreateApiAsyncThunk("courses/addReview", (data) =>
  api.post(`/review`, data)
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    categories: [],
    courses: [],
    totalPages: null,
    courseData: {},
    perchasedCourse: null,
    wishlist: [],
    orders: [],
    isLoading: {},
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle category fetch actions
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading["fetchCategories"] = true;
        state.error["fetchCategories"] = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading["fetchCategories"] = false;
        state.categories = action.payload?.data;
        // state.categories = Array.isArray(action.payload) ? action.payload : [];
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
        state.totalPages = action.payload?.pagination?.totalPages;
      })
      .addCase(fetchCoursesAsync.rejected, (state, action) => {
        state.isLoading["fetchCoursesAsync"] = false;
        state.error["fetchCoursesAsync"] = action.payload;
      })
      .addCase(addOrderAsync.pending, (state, action) => {
        state.isLoading["addOrderAsync"] = true;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.isLoading["addOrderAsync"] = false;
        state.orders = action.payload?.data;
      })
      .addCase(addOrderAsync.rejected, (state, action) => {
        state.isLoading["addOrderAsync"] = false;
        state.error["addOrderAsync"] = action.payload;
      })
      // fetch Single Course
      .addCase(fetchSingleCourse.pending, (state, action) => {
        state.isLoading["fetchSingleCourse"] = true;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.isLoading["fetchSingleCourse"] = false;
        state.courseData = action.payload?.data;
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.isLoading["fetchSingleCourse"] = false;
        state.error["fetchSingleCourse"] = action.payload;
      })
      // create Course order
      .addCase(createOrder.pending, (state, action) => {
        state.isLoading["createOrder"] = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading["createOrder"] = false;
        state.perchasedCourse = action.payload?.data;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading["createOrder"] = false;
        state.error["createOrder"] = action.payload;
      })
      // add review
      .addCase(addReview.pending, (state, action) => {
        state.isLoading["addReview"] = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading["addReview"] = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading["addReview"] = false;
        state.error["addReview"] = action.payload;
      });
  },
});

export default coursesSlice.reducer;
