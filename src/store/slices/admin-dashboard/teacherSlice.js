import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const getAllAdminTeacher = CreateApiAsyncThunk(
  "GET/teacher/getAllAdminTeacher",
  () => api.get(`/api/course/admin/get`)
);

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teachers: [],
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    // extra reducers here

    builder
      .addCase(getAllAdminTeacher.pending, (state, action) => {
        state.isLoading["getAllAdminTeacher"] = true;
      })
      .addCase(getAllAdminTeacher.fulfilled, (state, action) => {
        state.isLoading["getAllAdminTeacher"] = false;
        state.teachers = action.payload;
      })
      .addCase(getAllAdminTeacher.rejected, (state, action) => {
        state.isLoading["getAllAdminTeacher"] = false;
        state.error["getAllAdminTeacher"] = action.payload;
      });
  },
});

export default courseSlice.reducer;
