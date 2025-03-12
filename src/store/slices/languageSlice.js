import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

const initialState = {
  languages: null,
  isLoading: {},
  error: {},
};

export const getLanguages = CreateApiAsyncThunk("GET/languages/getLanguages", () =>
  api.get(`/languages`)
);

// for admin only
export const addLanguage = CreateApiAsyncThunk(
  "languages/addLanguage",
  (data) => api.post(`/languages`, data)
);

// for admin only
export const editLanguage = CreateApiAsyncThunk(
  "languages/editLanguage",
  ({ id, data }) => api.put(`/languages/${id}`, data)
);

// for admin only
export const deleteLanguage = CreateApiAsyncThunk(
  "languages/deleteLanguage",
  (id) => api.delete(`/languages/${id}`)
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
      })
      // for admin only
      .addCase(addLanguage.pending, (state) => {
        state.isLoading["addLanguage"] = true;
      })
      .addCase(addLanguage.fulfilled, (state, action) => {
        state.isLoading["addLanguage"] = false;
        const newLanguage = action.payload.language;
        if (newLanguage) {
          state.languages = [...state.languages, newLanguage];
        }
      })
      .addCase(addLanguage.rejected, (state, action) => {
        state.isLoading["addLanguage"] = false;
        state.isLoading["addLanguage"] = action.payload;
      })
      // for admin only Edit Language
      .addCase(editLanguage.pending, (state) => {
        state.isLoading["editLanguage"] = true;
      })
      .addCase(editLanguage.fulfilled, (state, action) => {
        state.isLoading["editLanguage"] = false;
        const updatedLanguage = action.payload.language;
        if (updatedLanguage?._id) {
          state.languages = state.languages.map((item) =>
            item._id === updatedLanguage._id ? updatedLanguage : item
          );
        }
      })

      .addCase(editLanguage.rejected, (state, action) => {
        state.isLoading["editLanguage"] = false;
        state.isLoading["editLanguage"] = action.payload;
      })
      // for admin only delete language
      .addCase(deleteLanguage.pending, (state) => {
        state.isLoading["deleteLanguage"] = true;
      })
      .addCase(deleteLanguage.fulfilled, (state, action) => {
        state.isLoading["deleteLanguage"] = false;
      })
      .addCase(deleteLanguage.rejected, (state, action) => {
        state.isLoading["deleteLanguage"] = false;
        state.isLoading["deleteLanguage"] = action.payload;
      });
  },
});

export default languagesSlice.reducer;
