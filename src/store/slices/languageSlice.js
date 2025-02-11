import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";


const initialState = {
  languages: null,
  isLoading: {},
  error: {},
};

export const getLanguages = CreateApiAsyncThunk("tutors/getLanguages", () =>
  api.get(`/languages`)
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
