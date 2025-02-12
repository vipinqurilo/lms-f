import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

const initialState = {
  instructorTickets: [],
  studentTickets: [],
  isLoading: {},
  error: {},
};

export const getInstructorTickets = CreateApiAsyncThunk(
  "GET/support/getInstructorTickets",
  () => api.get(`/ticket`)
);

export const getFilteredInstructorTickets = CreateApiAsyncThunk(
  "GET/support/getFilteredInstructorTickets",
  (status) => api.get(`/ticket/filter/${status}`)
);
export const getStudentTickets = CreateApiAsyncThunk(
  "GET/support/getStudentTickets",
  () => api.get(`/ticket`)
);
export const raiseTicket = CreateApiAsyncThunk("support/raiseTicket", (data) =>
  api.post(`/ticket`, data)
);

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstructorTickets.pending, (state) => {
        state.isLoading["getInstructorTickets"] = true;
      })
      .addCase(getInstructorTickets.fulfilled, (state, action) => {
        state.isLoading["getInstructorTickets"] = false;
        state.instructorTickets = action.payload.data;
      })
      .addCase(getInstructorTickets.rejected, (state, action) => {
        state.isLoading["getInstructorTickets"] = false;
        state.isLoading["getInstructorTickets"] = action.payload;
      })
      .addCase(getFilteredInstructorTickets.pending, (state) => {
        state.isLoading["getFilteredInstructorTickets"] = true;
      })
      .addCase(getFilteredInstructorTickets.fulfilled, (state, action) => {
        state.isLoading["getFilteredInstructorTickets"] = false;
        state.instructorTickets = action.payload.data;
      })
      .addCase(getFilteredInstructorTickets.rejected, (state, action) => {
        state.isLoading["getFilteredInstructorTickets"] = false;
        state.isLoading["getFilteredInstructorTickets"] = action.payload;
      })
      .addCase(getStudentTickets.pending, (state) => {
        state.isLoading["getStudentTickets"] = true;
      })
      .addCase(getStudentTickets.fulfilled, (state, action) => {
        state.isLoading["getStudentTickets"] = false;
        state.studentTickets = action.payload.data;
      })
      .addCase(getStudentTickets.rejected, (state, action) => {
        state.isLoading["getStudentTickets"] = false;
        state.isLoading["getStudentTickets"] = action.payload;
      })
      // raise ticket
      .addCase(raiseTicket.pending, (state) => {
        state.isLoading["raiseTicket"] = true;
      })
      .addCase(raiseTicket.fulfilled, (state) => {
        state.isLoading["raiseTicket"] = false;
      })
      .addCase(raiseTicket.rejected, (state, action) => {
        state.isLoading["raiseTicket"] = false;
        state.isLoading["raiseTicket"] = action.payload;
      });
  },
});

export default supportSlice.reducer;
