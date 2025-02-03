import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const getAllAdminCourses = CreateApiAsyncThunk(
  "GET/course/getAllAdminCourses",
  () => api.get(`/api/course/admin/get`)
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
        state.courses = action.payload;
      })
      .addCase(getAllAdminCourses.rejected,(state,action)=>{
        state.isLoading["getAllAdminCourses"] = false;
        state.error["getAllAdminCourses"] = action.payload;
      })
  },
});

export default courseSlice.reducer;
