import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

// Async thunks for profile actions
export const fetchProfileAsync = CreateApiAsyncThunk(
  "profile/fetchProfileAsync",
  () => api.get(`/api/profile`)
);

export const updatePersonalInfoAsync = CreateApiAsyncThunk(
  "profile/updatePersonalInfoAsync",
  (personalInfo) => api.put(`/api/profile/personal-info`, personalInfo)
);
export const updateSocialProfilesAsync = CreateApiAsyncThunk(
  "socialProfile/updateSocialProfilesAsync",
  (socialLinks) => api.put(`/api/profile/social-links`, { socialLinks })
);
// Initial state for profile
const initialState = {
  profile: null,
  isLoading: {},
  error: {},
};

const profileSlice = createSlice({
  name: "student/profile",
  initialState,
  reducers: {
    clearError: (state, action) => {
      const errorKey = action.payload;
      if (errorKey) {
        delete state.error[errorKey];
      } else {
        state.error = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfileAsync.pending, (state) => {
        state.isLoading["fetchProfileAsync"] = true;
      })
      .addCase(fetchProfileAsync.fulfilled, (state, action) => {
        state.isLoading["fetchProfileAsync"] = false;
        state.profile = action.payload?.data;
      })
      .addCase(fetchProfileAsync.rejected, (state, action) => {
        state.isLoading["fetchProfileAsync"] = false;
        state.error["fetchProfileAsync"] = action.payload;
      })
      // Update personal info
      .addCase(updatePersonalInfoAsync.pending, (state) => {
        state.isLoading["updatePersonalInfoAsync"] = true;
      })
      .addCase(updatePersonalInfoAsync.fulfilled, (state, action) => {
        state.isLoading["updatePersonalInfoAsync"] = false;
        state.profile = { ...state.profile, ...action.payload?.data };
      })
      .addCase(updatePersonalInfoAsync.rejected, (state, action) => {
        state.isLoading["updatePersonalInfoAsync"] = false;
        state.error["updatePersonalInfoAsync"] = action.payload;
      })
      .addCase(updateSocialProfilesAsync.pending, (state) => {
        state.isLoading["updateSocialProfilesAsync"] = true;
      })
      .addCase(updateSocialProfilesAsync.fulfilled, (state, action) => {
        state.isLoading["updateSocialProfilesAsync"] = false;
        state.socialProfiles = action.payload?.data;
      })
      .addCase(updateSocialProfilesAsync.rejected, (state, action) => {
        state.isLoading["updateSocialProfilesAsync"] = false;
        state.error["updateSocialProfilesAsync"] = action.payload;
      });
  },
});

export const { clearError } = profileSlice.actions;

export default profileSlice.reducer;
