import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const fetchReviewAsync = CreateApiAsyncThunk(
  "GET/review/fetchReviewAsync",
  (tab) => api.get(`/${tab}`)
);
export const fetchTutorReviewAsync = CreateApiAsyncThunk(
  "GET/review/fetchTutorReviewAsync",
  () => api.get(`/tutorReview`)
);
export const deleteReviewAsync = CreateApiAsyncThunk(
  "review/deleteReviewAsync",
  (id) => api.delete(`/review/${id}`)
);
export const editReviewAsync = CreateApiAsyncThunk(
  "review/editReviewAsync",
  ({tab,id,data}) => api.patch(`/${tab}/${id}`, data)
);


const initialState = {
  data: [],
  canReview: null,
  totalPages: 0,
  currentPage: 1,
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
          console.log(action.payload, "action.payload");
          state.data = action.payload?.data?.reviews || [];
          state.totalPages = action.payload?.data?.totalPages || 0;
          state.currentPage = action.payload?.data?.currentPage || 1;
        })

        .addCase(fetchReviewAsync.rejected, (state, action) => {
          state.isLoading["fetchReviewAsync"] = false;
          state.error["fetchReviewAsync"] = action.error?.message;
        })

      .addCase(fetchTutorReviewAsync.pending, (state) => {
        state.isLoading["fetchTutorReviewAsync"] = true;
      })
      .addCase(fetchTutorReviewAsync.fulfilled, (state, action) => {
        state.isLoading["fetchTutorReviewAsync"] = false;
        state.data = action.payload?.data?.reviews || [];
        state.totalPages = action.payload?.data?.totalPages || 0;
        state.currentPage = action.payload?.data?.currentPage || 1;
      })
      .addCase(fetchTutorReviewAsync.rejected, (state, action) => {
        state.isLoading["fetchTutorReviewAsync"] = false;
        state.error["fetchTutorReviewAsync"] = action.error?.message;
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
        state.data = state.data.map((review) => 
          review._id === action.payload.data._id ? action.payload.data : review
        );
        state.error["editReviewAsync"] = null;
      })

      .addCase(editReviewAsync.rejected, (state, action) => {
        state.isLoading["editReviewAsync"] = false;
        state.error["editReviewAsync"] = action.error?.message;
      })
      
      ;
  },
});

export default reviewSlice.reducer;
