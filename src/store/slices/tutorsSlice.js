import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";

import { api } from "@/store/api/api";

const initialState = {
  tutorReviews: [],
  userID: "",
  tutorId: "",
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
  ({ id, data }) => api.put(`/requests/teacher/${id}`, data)
);

// from me
export const GetLoggedInTutorRequestData = CreateApiAsyncThunk(
  "GET/tutors/GetLoggedInTutorRequestData",
  () => api.get(`/requests/teacher/me`)
);

// Async thunk for fetching tutor profile
export const fetchTutorProfileAsync = CreateApiAsyncThunk(
  "GET/tutors/fetchTutorProfileAsync",
  (tutorId) => api.get(`/profile/teacher/${tutorId}`) // Assuming you have an endpoint like this
);
export const fetchAllTutorProfileAsync = CreateApiAsyncThunk(
  "GET/tutors/fetchAllTutorProfileAsync",
  ({ search, timeRanges, subjects }) => {
    let url = `/tutors?search=${search || ''}`;
    if (timeRanges) {
      url += `&timeRanges=${timeRanges}`;
    }
    if (subjects) {
      url += `&subjects=${subjects}`;
    }
    return api.get(url);
  }
);
export const fetchReviewAsyncById = CreateApiAsyncThunk(
  "GET/review/fetchReviewAsyncById",
  ({id}) => api.get(`/tutorReview/${id}`)
);
export const fetchTutorReviewAsync = CreateApiAsyncThunk(
  "GET/review/fetchTutorReviewAsync",
  () => api.get(`/tutorReview`)
);
export const deleteReviewAsync = CreateApiAsyncThunk(
  "review/deleteReviewAsync",
  (id) => api.delete(`/review/${id}`)
);
export const editReviewAsync = CreateApiAsyncThunk(
  "review/editReviewAsync",
  ({tab,id,data}) => api.patch(`/${tab}/${id}`, data)
);
const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    setTutorId: (state, action) => {
      state.tutorId = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    updateProcessStep: (state, action) => {
      state.processStep = action.payload;
    },
    updateRequestStatus: (state, action) => {
      state.requestStatus = action.payload;
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
        state.requestStatus =
          action.payload.data && action.payload.data?.approvalStatus;
        if (action.payload.data) {
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
        }
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
        state.requestStatus =
          action.payload.data && action.payload.data?.approvalStatus;
        if (action.payload.data) {
          state.processStep = 5;
          const {
            personalInfo,
            bio,
            profilePhoto,
            experience,
            education,
            subjectsTaught,
            languagesSpoken,
            _id,
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
            id: _id,
          };
        }
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
      })
      .addCase(fetchReviewAsyncById.pending, (state) => {
        state.isLoading["fetchReviewAsyncById"] = true;
      })

      .addCase(fetchReviewAsyncById.fulfilled, (state, action) => {
        state.isLoading["fetchReviewAsyncById"] = false;
        console.log(action.payload, "action.payload");
        state.tutorReviews = action.payload?.data?.reviews || [];
      })

      .addCase(fetchReviewAsyncById.rejected, (state, action) => {
        state.isLoading["fetchReviewAsyncById"] = false;
        state.error["fetchReviewAsyncById"] = action.error?.message;
      })

  },
});

export const { setTutorId, clearError, updateProcessData, updateProcessStep, updateRequestStatus, setUserID } =
  tutorsSlice.actions;
export default tutorsSlice.reducer;
