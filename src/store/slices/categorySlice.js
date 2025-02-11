import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

const initialState = {
  subjects: [],
  subSubjects: [],
  isLoading: {},
  error: {},
};

export const getSubjects = CreateApiAsyncThunk("GET/category/getSubjects", () =>
  api.get(`/category`)
);

export const getSubSubjects = CreateApiAsyncThunk(
  "GET/category/getSubSubjects",
  () => api.get(`/subcategory/filter`)
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
