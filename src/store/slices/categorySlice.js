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
  subjects: [],
  subSubjects: [],
  isLoading: {},
  error: {},
};

export const getSubjects = CreateApiAsyncThunk("GET/category/getSubjects", () =>
  api.get(`/api/category`)
);

export const getSubSubjects = CreateApiAsyncThunk(
  "GET/category/getSubSubjects",
  () => api.get(`/api/subcategory/filter`)
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.isLoading["getSubjects"] = true;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.isLoading["getSubjects"] = false;
        state.subjects = action.payload.data;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.isLoading["getSubjects"] = false;
        state.isLoading["getSubjects"] = action.payload;
      })
      .addCase(getSubSubjects.pending, (state) => {
        state.isLoading["getSubSubjects"] = true;
      })
      .addCase(getSubSubjects.fulfilled, (state, action) => {
        state.isLoading["getSubSubjects"] = false;
        state.subSubjects = action.payload.data;
      })
      .addCase(getSubSubjects.rejected, (state, action) => {
        state.isLoading["getSubSubjects"] = false;
        state.isLoading["getSubSubjects"] = action.payload;
      });
  },
});

export default categorySlice.reducer;
