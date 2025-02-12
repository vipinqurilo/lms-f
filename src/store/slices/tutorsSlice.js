import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";

import { api } from "@/store/api/api";

const initialState = {
  processStep: 1,
  processData: {},
  requestStatus: "",
  tutorProfile: null,
  allTutorProfile: null,
  isLoading: {},
  error: {},
};

export const instructorRequest = CreateApiAsyncThunk(
  "tutors/instructorRequest",
  (data) => api.post(`/requests/teacher`, data)
);

// from the admin side
export const getTutorRequestData = CreateApiAsyncThunk(
  "GET/tutors/getTutorRequestData",
  (id) => api.get(`/requests/teacher/${id}`)
);

// from the admin side
export const editTutorRequestData = CreateApiAsyncThunk(
  "tutors/editTutorRequestData",
  (id) => api.get(`/requests/teacher/${id}`)
);

// from me
export const GetLoggedInTutorRequestData = CreateApiAsyncThunk(
  "GET/tutors/GetLoggedInTutorRequestData",
  () => api.get(`/requests/teacher/me`)
);

// Async thunk for fetching tutor profile
export const fetchTutorProfileAsync = CreateApiAsyncThunk(
  "tutors/fetchTutorProfileAsync",
  (tutorId) => api.get(`/profile/teacher/${tutorId}`) // Assuming you have an endpoint like this
);
export const fetchAllTutorProfileAsync = CreateApiAsyncThunk(
  "tutors/fetchAllTutorProfileAsync",
  ({ search, timeRanges }) =>
    api.get(`/tutors?search=${search}&timeRanges=${timeRanges}`) // Assuming you have an endpoint like this
);

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    updateProcessStep: (state, action) => {
      state.processStep = action.payload;
    },
    updateProcessData: (state, action) => {
      const { field, data } = action.payload;
      if (state.processData.hasOwnProperty(field)) {
        state.processData[field] = data;
      } else {
        state.processData = {
          ...state.processData,
          [field]: data,
        };
      }
      clearError: (state, action) => {
        const errorKey = action.payload;
        if (errorKey) {
          delete state.error[errorKey];
        } else {
          state.error = {};
        }
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(instructorRequest.pending, (state) => {
        state.isLoading["instructorRequest"] = true;
      })
      .addCase(instructorRequest.fulfilled, (state) => {
        state.isLoading["instructorRequest"] = false;
      })
      .addCase(instructorRequest.rejected, (state, action) => {
        state.isLoading["instructorRequest"] = false;
        state.isLoading["instructorRequest"] = action.payload;
      })
      // Fetch tutor profile
      .addCase(fetchTutorProfileAsync.pending, (state) => {
        state.isLoading["fetchTutorProfileAsync"] = true;
      })
      .addCase(fetchTutorProfileAsync.fulfilled, (state, action) => {
        state.isLoading["fetchTutorProfileAsync"] = false;
        state.tutorProfile = action.payload?.data; // Assuming this structure from your sample
      })
      .addCase(fetchTutorProfileAsync.rejected, (state, action) => {
        state.isLoading["fetchTutorProfileAsync"] = false;
        state.error["fetchTutorProfileAsync"] = action.payload;
      })
      .addCase(fetchAllTutorProfileAsync.pending, (state) => {
        state.isLoading["fetchAllTutorProfileAsync"] = true;
      })
      .addCase(fetchAllTutorProfileAsync.fulfilled, (state, action) => {
        state.isLoading["fetchAllTutorProfileAsync"] = false;
        state.allTutorProfile = action.payload?.data;
      })

      .addCase(fetchAllTutorProfileAsync.rejected, (state, action) => {
        state.isLoading["fetchAllTutorProfileAsync"] = false;
        state.error["fetchAllTutorProfileAsync"] = action.payload;
      })
      // get requested tutor data
      .addCase(getTutorRequestData.pending, (state) => {
        state.isLoading["getTutorRequestData"] = true;
      })
      .addCase(getTutorRequestData.fulfilled, (state, action) => {
        state.isLoading["getTutorRequestData"] = false;
        state.requestStatus = action.payload.data.approvalStatus;
        state.processStep = 5;
        const {
          personalInfo,
          bio,
          profilePhoto,
          experience,
          education,
          subjectsTaught,
          languagesSpoken,
        } = action.payload.data;
        state.processData = {
          profile: personalInfo,
          indentity: {
            bio,
            profile: profilePhoto,
          },
          subjectAndlanguage: {
            language: languagesSpoken,
            subjects: subjectsTaught,
          },
          education,
          experience,
        };
      })

      .addCase(getTutorRequestData.rejected, (state, action) => {
        state.isLoading["getTutorRequestData"] = false;
        state.error["getTutorRequestData"] = action.payload;
      })
      // get logged in tutor data
      .addCase(GetLoggedInTutorRequestData.pending, (state) => {
        state.isLoading["GetLoggedInTutorRequestData"] = true;
      })
      .addCase(GetLoggedInTutorRequestData.fulfilled, (state, action) => {
        state.isLoading["GetLoggedInTutorRequestData"] = false;
        state.requestStatus = action.payload.data.approvalStatus;
        state.processStep = 5;
        const {
          personalInfo,
          bio,
          profilePhoto,
          experience,
          education,
          subjectsTaught,
          languagesSpoken,
        } = action.payload.data;
        state.processData = {
          profile: personalInfo,
          indentity: {
            bio,
            profile: profilePhoto,
          },
          subjectAndlanguage: {
            language: languagesSpoken,
            subjects: subjectsTaught,
          },
          education,
          experience,
        };
      })

      .addCase(GetLoggedInTutorRequestData.rejected, (state, action) => {
        state.isLoading["GetLoggedInTutorRequestData"] = false;
        state.error["GetLoggedInTutorRequestData"] = action.payload;
      })
      // edit logged in tutor requested data
      .addCase(editTutorRequestData.pending, (state) => {
        state.isLoading["editTutorRequestData"] = true;
      })
      .addCase(editTutorRequestData.fulfilled, (state, action) => {
        state.isLoading["editTutorRequestData"] = false;
      })

      .addCase(editTutorRequestData.rejected, (state, action) => {
        state.isLoading["editTutorRequestData"] = false;
        state.error["editTutorRequestData"] = action.payload;
      });
  },
});

export const { setTutors, clearError, updateProcessData, updateProcessStep } =
  tutorsSlice.actions;
export default tutorsSlice.reducer;
