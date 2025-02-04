import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWQiOiI2NzkyMjE1YWVjOTlhMTA4ZDQzMzYxOTEiLCJpYXQiOjE3Mzg2NDY4MDN9.8sgatuSVPhKF_vwLw9jYy1pFae5jsw8pgnVCJVWV_Uw";

const api = axios.create({
  baseURL: "https://56kjq9dz-8000.inc1.devtunnels.ms",
  headers: {
    Authorization: token && `Bearer ${token}`,
  },
});

const initialState = {
  processStep: 1,
  processData: {},
  isLoading: {},
  error: {},
};

export const instructorRequest = CreateApiAsyncThunk(
  "tutors/instructorRequest",
  (data) => api.post(`/api/requests/teacher`, data)
);

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    updateProcessStep: (state, action) => {
      state.processStep = action.payload;
    },
    updateProcessData: (state, action) => {
      const { field, data } = action.payload;
      state.processData = {
        ...state.processData,
        [field]: data,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(instructorRequest.pending, (state) => {
        state.isLoading["instructorRequest"] = true;
      })
      .addCase(instructorRequest.fulfilled, (state) => {
        state.isLoading["instructorRequest"] = false;
      })
      .addCase(instructorRequest.rejected, (state, action) => {
        state.isLoading["instructorRequest"] = false;
        state.isLoading["instructorRequest"] = action.payload;
      });
  },
});

export const { updateProcessData, updateProcessStep } = tutorsSlice.actions;
export default tutorsSlice.reducer;
