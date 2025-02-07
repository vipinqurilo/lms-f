import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api, api3 } from "@/store/api/api";

export const getAllAdminTeacher = CreateApiAsyncThunk(
  "GET/teacher/getAllAdminTeacher",
  () => api3.get(`/api/requests/teachers`)
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
        state.teachers = action.payload?.data;
      })
      .addCase(getAllAdminTeacher.rejected, (state, action) => {
        state.isLoading["getAllAdminTeacher"] = false;
        state.error["getAllAdminTeacher"] = action.payload;
      });
  },
});

export default teacherSlice.reducer;