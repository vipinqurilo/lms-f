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
  instructorTickets: [],
  studentTickets: [],
  isLoading: {},
  error: {},
};

export const getInstructorTickets = CreateApiAsyncThunk(
  "GET/support/getInstructorTickets",
  (status) => api.get(`https://dummyjson.com/comments?status=${status}`)
);
export const getStudentTickets = CreateApiAsyncThunk(
  "GET/support/getStudentTickets",
  () => api.get(`/api/tickets`)
);
export const raiseTicket = CreateApiAsyncThunk("support/raiseTicket", (data) =>
  api.post(`/api/tickets`, data)
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
        state.instructorTickets = action.payload;
      })
      .addCase(getInstructorTickets.rejected, (state, action) => {
        state.isLoading["getInstructorTickets"] = false;
        state.isLoading["getInstructorTickets"] = action.payload;
      })
      .addCase(getStudentTickets.pending, (state) => {
        state.isLoading["getStudentTickets"] = true;
      })
      .addCase(getStudentTickets.fulfilled, (state, action) => {
        state.isLoading["getStudentTickets"] = false;
        state.studentTickets = action.payload;
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
