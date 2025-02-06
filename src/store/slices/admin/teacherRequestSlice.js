// import { api } from "@/store/api/api";
// import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   teachers: [], // Only teachers data now
//   isLoading: {},
//   error: {},
// };

// export const fetchData = CreateApiAsyncThunk(
//   "upload/fetchTeachers",  // Adjusted action name
//   () => api.get('/api/requests/teachers') // Call the teachers API endpoint
// );

// const teacherRequestSlice = createSlice({
//   name: "upload",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Handling the teachers API call
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.isLoading["fetchTeachers"] = true;
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.isLoading["fetchTeachers"] = false;
//         // Update the state with the fetched teacher data
//          state.teachers = action.payload.data; // Corrected to access the data field
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         state.isLoading["fetchTeachers"] = false;
//         state.error["fetchTeachers"] = action.payload;
//       });
//   },
// });

// export default teacherRequestSlice.reducer;


import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [], // Only teachers data now
  isLoading: {},
  error: {},
};

export const fetchData = CreateApiAsyncThunk(
  "upload/fetchTeachers",  // Adjusted action name
  () => api.get('/api/requests/teachers') // Call the teachers API endpoint
);

export const approveTeacher = CreateApiAsyncThunk(
  "upload/approveTeacher",
  (teacherId) => api.put(`/api/requests/teacher/approve/${teacherId}`)

);

// export const rejectTeacher = CreateApiAsyncThunk(
//     "upload/rejectTeacher",
//     (teacherId) => api.put(`/api/requests/teacher/reject/${teacherId}`)
//   );

// rejectTeacher API action
export const rejectTeacher = CreateApiAsyncThunk(
  "upload/rejectTeacher",
  ({ teacherId, reason }) =>
    api.put(`/api/requests/teacher/reject/${teacherId}`, { reason })
);

  
const teacherRequestSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchData.pending, (state) => {
          state.isLoading["fetchTeachers"] = true;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
          state.isLoading["fetchTeachers"] = false;
          state.teachers = action.payload.data;
        })
        .addCase(fetchData.rejected, (state, action) => {
          state.isLoading["fetchTeachers"] = false;
          state.error["fetchTeachers"] = action.payload;
        })
        .addCase(approveTeacher.pending, (state) => {
          state.isLoading["approveTeacher"] = true;
        })
        .addCase(approveTeacher.fulfilled, (state, action) => {
          state.isLoading["approveTeacher"] = false;
          state.teachers = state.teachers.map((teacher) =>
            teacher.userId === action.meta.arg ? { ...teacher, approvalStatus: "Approved" } : teacher
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
            teacher.userId === action.meta.arg ? { ...teacher, approvalStatus: "Rejected" } : teacher
          );
        })
        .addCase(rejectTeacher.rejected, (state, action) => {
          state.isLoading["rejectTeacher"] = false;
          state.error["rejectTeacher"] = action.payload;
        });
    },
  });

export default teacherRequestSlice.reducer;
