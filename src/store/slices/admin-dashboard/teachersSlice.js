import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Fetch all teachers without search parameters
// Fetch all teachers, show all data when no parameters are sent
export const getAllTeachers = CreateApiAsyncThunk(
  "GET/teachers/getAllTeachers",
  ({ search, page, limit } = {}) => {
    const params = {};

    if (search) params.search = search;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    return api.get("/teachers", { params });
  }
);



// Update teacher status
export const updateTeacherStatus = CreateApiAsyncThunk(
  "PATCH/teachers/updateTeacherStatus",
  async ({ teacherId, status }) => {
    const response = await api.patch(`/tutors/${teacherId}/teacher-status`, {
      teacherStatus: status,
    });
    return { teacherId, status, data: response.data };
  }
);

export const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.isLoading["getAllTeachers"] = true;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.isLoading["getAllTeachers"] = false;
        state.teachers = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.isLoading["getAllTeachers"] = false;
        state.error["getAllTeachers"] = action.payload;
      })
      .addCase(updateTeacherStatus.fulfilled, (state, action) => {
        if (!action.payload) return;

        const { teacherId, status } = action.payload;
        const teacherIndex = state.teachers.findIndex((teacher) => teacher._id === teacherId);

        if (teacherIndex !== -1) {
          state.teachers[teacherIndex].teacherStatus = status; // Update teacher status
        }
      });
  },
});

export default teachersSlice.reducer;
