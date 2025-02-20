import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Fetch student with search parameters
export const getStudent = CreateApiAsyncThunk(
  "GET/student/getStudent", // Renamed to getStudent
  async ({ search, limit, page }) => {
    const response = await api.get(`/students?search=${search}&limit=${limit}&page=${page}`);
    return response;  // Assuming response.data contains the student data
  }
);

export const studentSlice = createSlice({
    name: "student",
    initialState: {
      students: [],
      totalPages: 0,  // Add totalPages in the state
      currentPage: 1, // Add currentPage in the state
      isLoading: {},
      error: {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(getStudent.pending, (state) => {
          state.isLoading["getStudent"] = true;
        })
        .addCase(getStudent.fulfilled, (state, action) => {
          state.isLoading["getStudent"] = false;
          state.students = action.payload.data;
          state.totalPages = action.payload.totalPages;  // Set totalPages from API response
          state.currentPage = action.payload.currentPage;  // Set currentPage from API response
        })
        .addCase(getStudent.rejected, (state, action) => {
          state.isLoading["getStudent"] = false;
          state.error["getStudent"] = action.payload;
        });
    },
  });
  

export default studentSlice.reducer;
