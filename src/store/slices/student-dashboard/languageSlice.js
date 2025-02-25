import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const fetchLanguageAsync = CreateApiAsyncThunk(
  "GET/language/fetchLanguageAsync",
  () => api.get(`/language`)
);

const initialState = {
  data: [],
  isLoading: {},
  error: {},
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguageAsync.pending, (state) => {
        state.isLoading["fetchLanguageAsync"] = true;
      })
      .addCase(fetchLanguageAsync.fulfilled, (state, action) => {
        state.isLoading["fetchLanguageAsync"] = false;
        state.data = action.payload?.data || [];
      })
      .addCase(fetchLanguageAsync.rejected, (state, action) => {
        state.isLoading["fetchLanguageAsync"] = false;
        state.error["fetchLanguageAsync"] = action.error?.message;
      });
  },
});

export default languageSlice.reducer;
