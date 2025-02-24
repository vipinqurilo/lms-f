import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const fetchReviewAsync = CreateApiAsyncThunk(
  "GET/review/fetchReviewAsync",
  () => api.get(`/review`)
);
export const deleteReviewAsync = CreateApiAsyncThunk(
  "review/deleteReviewAsync",
  (id) => api.delete(`/review/${id}`)
);
export const editReviewAsync = CreateApiAsyncThunk(
  "review/editReviewAsync",
  (data) => api.put(`/review`, data)
);
const initialState = {
  data: [],
  isLoading: {},
  error: {},
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewAsync.pending, (state) => {
        state.isLoading["fetchReviewAsync"] = true;
      })

      .addCase(fetchReviewAsync.fulfilled, (state, action) => {
        state.isLoading["fetchReviewAsync"] = false;
        state.data = action.payload?.data || [];
      })

      .addCase(fetchReviewAsync.rejected, (state, action) => {
        state.isLoading["fetchReviewAsync"] = false;
        state.error["fetchReviewAsync"] = action.error?.message;
      })

      .addCase(deleteReviewAsync.pending, (state) => {
        state.isLoading["deleteReviewAsync"] = true;
      })

      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.isLoading["deleteReviewAsync"] = false;
        state.error["deleteReviewAsync"] = action.error?.message;
      })
      .addCase(deleteReviewAsync.rejected, (state, action) => {
        state.isLoading["deleteReviewAsync"] = false;
        state.error["deleteReviewAsync"] = action.error?.message;
      })

      .addCase(editReviewAsync.pending, (state) => {
        state.isLoading["editReviewAsync"] = true;
      })

      .addCase(editReviewAsync.fulfilled, (state, action) => {
        state.isLoading["editReviewAsync"] = false;
        state.error["editReviewAsync"] = action.error?.message;
      })

      .addCase(editReviewAsync.rejected, (state, action) => {
        state.isLoading["editReviewAsync"] = false;
        state.error["editReviewAsync"] = action.error?.message;
      });
  },
});

export default reviewSlice.reducer;
