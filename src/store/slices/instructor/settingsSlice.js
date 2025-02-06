import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWQiOiI2NzkyMjE1YWVjOTlhMTA4ZDQzMzYxOTEiLCJpYXQiOjE3Mzg2NDY4MDN9.8sgatuSVPhKF_vwLw9jYy1pFae5jsw8pgnVCJVWV_Uw";

const api = axios.create({
  baseURL: "https://56kjq9dz-8000.inc1.devtunnels.ms/api",
  headers: {
    Authorization: token && `Bearer ${token}`,
  },
});

const initialState = {
  profile: {},
  isLoading: {},
  error: {},
};

export const getProfile = CreateApiAsyncThunk("setting/getProfile", () =>
  api.get(`/profile`)
);
5;
export const updatePaymentInfo = CreateApiAsyncThunk(
  "setting/updatePaymentInfo",
  (data) => api.put(`/profile/payment-info`, data)
);

export const updateEducation = CreateApiAsyncThunk(
  "setting/updateEducation",
  (data) => api.put(`/profile/education`, data)
);

export const updateExperience = CreateApiAsyncThunk(
  "setting/updateExperience",
  (data) => api.put(`/profile/experience`, data)
);

export const updateSubjects = CreateApiAsyncThunk(
  "setting/updateSubjects",
  (data) => api.put(`/profile/experience`, data)
);
export const updateLanguages = CreateApiAsyncThunk(
  "setting/updateLanguages",
  (data) => api.put(`/profile/languages`, data)
);

export const updateTutionSlots = CreateApiAsyncThunk(
  "setting/updateTutionSlots",
  (data) => api.put(`/profile/`, data)
);

const settingsSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get profile details
      .addCase(getProfile.pending, (state) => {
        state.isLoading["getProfile"] = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading["getProfile"] = false;
        state.profile = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading["getProfile"] = false;
        state.error["getProfile"] = action.payload;
      })
      // payment info update
      .addCase(updatePaymentInfo.pending, (state) => {
        state.isLoading["updatePaymentInfo"] = true;
      })
      .addCase(updatePaymentInfo.fulfilled, (state, action) => {
        state.isLoading["updatePaymentInfo"] = false;
      })
      .addCase(updatePaymentInfo.rejected, (state, action) => {
        state.isLoading["updatePaymentInfo"] = false;
        state.error["updatePaymentInfo"] = action.payload;
      })
      // education update
      .addCase(updateEducation.pending, (state) => {
        state.isLoading["updateEducation"] = true;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.isLoading["updateEducation"] = false;
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.isLoading["updateEducation"] = false;
        state.error["updateEducation"] = action.payload;
      })
      // experience update
      .addCase(updateExperience.pending, (state) => {
        state.isLoading["updateExperience"] = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.isLoading["updateExperience"] = false;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.isLoading["updateExperience"] = false;
        state.error["updateExperience"] = action.payload;
      })
      // subjects update
      .addCase(updateSubjects.pending, (state) => {
        state.isLoading["updateSubjects"] = true;
      })
      .addCase(updateSubjects.fulfilled, (state, action) => {
        state.isLoading["updateSubjects"] = false;
      })
      .addCase(updateSubjects.rejected, (state, action) => {
        state.isLoading["updateSubjects"] = false;
        state.error["updateSubjects"] = action.payload;
      })
      // languages update
      .addCase(updateLanguages.pending, (state) => {
        state.isLoading["updateLanguages"] = true;
      })
      .addCase(updateLanguages.fulfilled, (state, action) => {
        state.isLoading["updateLanguages"] = false;
      })
      .addCase(updateLanguages.rejected, (state, action) => {
        state.isLoading["updateLanguages"] = false;
        state.error["updateLanguages"] = action.payload;
      })
      // tution slots update
      .addCase(updateTutionSlots.pending, (state) => {
        state.isLoading["updateTutionSlots"] = true;
      })
      .addCase(updateTutionSlots.fulfilled, (state, action) => {
        state.isLoading["updateTutionSlots"] = false;
      })
      .addCase(updateTutionSlots.rejected, (state, action) => {
        state.isLoading["updateTutionSlots"] = false;
        state.error["updateTutionSlots"] = action.payload;
      })
  },
});

export default settingsSlice.reducer;
