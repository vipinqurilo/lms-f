import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/store/api/api";

const initialState = {
  courseEarning: [],
  tutionEarning: [],
  isLoading: {},
  error: {},
};

export const fetchAllCourseEarning = CreateApiAsyncThunk(
  "GET/earning/fetchAllCourseEarning",
  (formData) => {
    const query = Object?.keys(formData)
      ?.map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/earnings/course-purchases/?${query}`);
  }
);
export const fetchAllTutionEarning = CreateApiAsyncThunk(
  "GET/earning/fetchAllTutionEarning",
  (formData) => {
    const query = Object?.keys(formData)
      ?.map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/earnings/tution-sessions/?${query}`);
  }
);

const earningSlice = createSlice({
  name: "earning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add the fetchAllCoursesEarning reducer here
      .addCase(fetchAllCourseEarning.pending, (state, action) => {
        state.isLoading["fetchAllCourseEarning"] = true;
      })
      .addCase(fetchAllCourseEarning.fulfilled, (state, action) => {
        state.isLoading["fetchAllCourseEarning"] = false;
        state.courseEarning = action.payload.data;
      })
      .addCase(fetchAllCourseEarning.rejected, (state, action) => {
        state.isLoading["fetchAllCourseEarning"] = false;
        state.error["fetchAllCourseEarning"] = action.payload;
      })
      // Add the fetchAllTutionEarning reducer here
      .addCase(fetchAllTutionEarning.pending, (state, action) => {
        state.isLoading["fetchAllTutionEarning"] = true;
      })
      .addCase(fetchAllTutionEarning.fulfilled, (state, action) => {
        state.isLoading["fetchAllTutionEarning"] = false;
        state.tutionEarning = action.payload.data;
      })
      .addCase(fetchAllTutionEarning.rejected, (state, action) => {
        state.isLoading["fetchAllTutionEarning"] = false;
        state.error["fetchAllTutionEarning"] = action.payload;
      });
  },
});

export default earningSlice.reducer;
