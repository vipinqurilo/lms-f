import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const getAllAdminCourses = CreateApiAsyncThunk(
  "GET/course/getAllAdminCourses",
  ({status}) => api.get(`/api/course/admin/get?status=${status}`)
);


export const updateAdminCourseStatus = CreateApiAsyncThunk(
  "GET/course/updateAdminCourseStatus",
  ({ courseId, status }) =>
    api.put(`/api/course/admin-status/${courseId}`, { status })
);

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    // extra reducers here
    builder
      .addCase(getAllAdminCourses.pending, (state, action) => {
        state.isLoading["getAllAdminCourses"] = true;
      })
      .addCase(getAllAdminCourses.fulfilled, (state, action) => {
        state.isLoading["getAllAdminCourses"] = false;
        state.courses = action.payload?.data;
      })
      .addCase(getAllAdminCourses.rejected, (state, action) => {
        state.isLoading["getAllAdminCourses"] = false;
        state.error["getAllAdminCourses"] = action.payload;
      })
      .addCase(updateAdminCourseStatus.pending, (state, action) => {
        state.isLoading["updateAdminCourseStatus"] = true;
      })
      .addCase(updateAdminCourseStatus.fulfilled, (state, action) => {
        state.isLoading["updateAdminCourseStatus"] = false;
        state.courses = action.payload;
      })
      .addCase(updateAdminCourseStatus.rejected, (state, action) => {
        state.isLoading["updateAdminCourseStatus"] = false;
        state.error["updateAdminCourseStatus"] = action.payload;
      });
  },
});

export default courseSlice.reducer;
