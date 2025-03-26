import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [], // Only teachers data now
  totalPages: 0,
  isLoading: {},
  error: {},
};

export const fetchTeachers = CreateApiAsyncThunk(
  "GET/upload/fetchTeachers",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/teachers/all-request/?${query}`);
  }
);

export const approveTeacher = CreateApiAsyncThunk(
  "upload/approveTeacher",
  (teacherId) => api.put(`/teachers/request/approve/${teacherId}`)
);

export const rejectTeacher = CreateApiAsyncThunk(
  "upload/rejectTeacher",
  ({ teacherId, reason }) =>
    api.put(`/teachers/request/reject/${teacherId}`, { reason })
);

const teacherRequestSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading["fetchTeachers"] = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading["fetchTeachers"] = false;
        state.teachers = action.payload.data;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading["fetchTeachers"] = false;
        state.error["fetchTeachers"] = action.payload;
      })
      .addCase(approveTeacher.pending, (state) => {
        state.isLoading["approveTeacher"] = true;
      })
      .addCase(approveTeacher.fulfilled, (state, action) => {
        state.isLoading["approveTeacher"] = false;
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.meta.arg
        );
      })
      .addCase(approveTeacher.rejected, (state, action) => {
        state.isLoading["approveTeacher"] = false;
        state.error["approveTeacher"] = action.payload;
      })
      .addCase(rejectTeacher.pending, (state) => {
        state.isLoading["rejectTeacher"] = true;
      })
      .addCase(rejectTeacher.fulfilled, (state, action) => {
        state.isLoading["rejectTeacher"] = false;
        state.teachers = state.teachers.map((teacher) =>
          teacher.userId === action.meta.arg
            ? { ...teacher, approvalStatus: "Rejected" }
            : teacher
        );
      })
      .addCase(rejectTeacher.rejected, (state, action) => {
        state.isLoading["rejectTeacher"] = false;
        state.error["rejectTeacher"] = action.payload;
      });
  },
});

export default teacherRequestSlice.reducer;
