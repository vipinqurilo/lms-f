import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching tutor profile
export const fetchTutorProfileAsync = CreateApiAsyncThunk(
  "tutors/fetchTutorProfileAsync",
  (tutorId) => api.get(`/api/profile/teacher/${tutorId}`) // Assuming you have an endpoint like this
);

// Initial state for tutors
const initialState = {
  tutorProfile: null,
  isLoading: {},
  error: {},
};

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    setTutors(state, action) {
      return action.payload;
    },
    clearError: (state, action) => {
      const errorKey = action.payload;
      if (errorKey) {
        delete state.error[errorKey];
      } else {
        state.error = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tutor profile
      .addCase(fetchTutorProfileAsync.pending, (state) => {
        state.isLoading["fetchTutorProfileAsync"] = true;
      })
      .addCase(fetchTutorProfileAsync.fulfilled, (state, action) => {
        state.isLoading["fetchTutorProfileAsync"] = false;
        state.tutorProfile = action.payload?.data; // Assuming this structure from your sample
      })
      .addCase(fetchTutorProfileAsync.rejected, (state, action) => {
        state.isLoading["fetchTutorProfileAsync"] = false;
        state.error["fetchTutorProfileAsync"] = action.payload;
      });
  },
});

export const { setTutors, clearError } = tutorsSlice.actions;

export default tutorsSlice.reducer;
