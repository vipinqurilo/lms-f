import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const getAllAdminCourses = CreateApiAsyncThunk(
  "GET/course/getAllAdminCourses",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/course/admin/get?${query}`);
  }
);



export const updateAdminCourseStatus = CreateApiAsyncThunk(
  "PUT/course/updateAdminCourseStatus",
  async ({ courseId, status }) => {
    return api.put(`/course/admin-status/${courseId}`, { status });
  }
);



export const rejectAdminCourse = CreateApiAsyncThunk(
  "PUT/course/rejectAdminCourse",
  async ({ courseId, reason }) => {
    return api.put(`/course/admin-status/${courseId}`, {
      status: "unpublished",
      reason: reason,
    });
  }
);



export const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    totalPages: null,
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdminCourses.pending, (state) => {
        state.isLoading["getAllAdminCourses"] = true;
      })
      .addCase(getAllAdminCourses.fulfilled, (state, action) => {
        state.isLoading["getAllAdminCourses"] = false;
        state.courses = action.payload?.data;
        state.totalPages = action.payload?.pagination?.totalPages;
      })
      .addCase(getAllAdminCourses.rejected, (state, action) => {
        state.isLoading["getAllAdminCourses"] = false;
        state.error["getAllAdminCourses"] = action.payload;
      })
      .addCase(updateAdminCourseStatus.pending, (state) => {
        state.isLoading["updateAdminCourseStatus"] = true;
      })
      .addCase(updateAdminCourseStatus.fulfilled, (state, action) => {
        state.isLoading["updateAdminCourseStatus"] = false;
        state.courses = action.payload;
      })
      .addCase(updateAdminCourseStatus.rejected, (state, action) => {
        state.isLoading["updateAdminCourseStatus"] = false;
        state.error["updateAdminCourseStatus"] = action.payload;
      })
      .addCase(rejectAdminCourse.pending, (state) => {
        state.isLoading["rejectAdminCourse"] = true;
      })
      .addCase(rejectAdminCourse.fulfilled, (state, action) => {
        state.isLoading["rejectAdminCourse"] = false;
        state.courses = state.courses.map(course =>
          course._id === action.meta.arg.courseId
            ? { ...course, status: "unpublished" }
            : course
        );
      })
      .addCase(rejectAdminCourse.rejected, (state, action) => {
        state.isLoading["rejectAdminCourse"] = false;
        state.error["rejectAdminCourse"] = action.payload;
      });
      
  },
});

export default courseSlice.reducer;
