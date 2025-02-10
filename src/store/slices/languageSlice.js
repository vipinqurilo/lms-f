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
  languages: null,
  isLoading: {},
  error: {},
};

export const getLanguages = CreateApiAsyncThunk("tutors/getLanguages", () =>
  api.get(`/api/languages`)
);

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLanguages.pending, (state) => {
        state.isLoading["getLanguages"] = true;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.isLoading["getLanguages"] = false;
        state.languages = action.payload.languages;
      })
      .addCase(getLanguages.rejected, (state, action) => {
        state.isLoading["getLanguages"] = false;
        state.isLoading["getLanguages"] = action.payload;
      });
  },
});

export default languagesSlice.reducer;
