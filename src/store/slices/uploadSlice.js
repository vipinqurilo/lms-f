import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";

const initialState = {
  image: "",
  video: "",
  isLoading: {},
  error: {},
};

export const uploadImage = CreateApiAsyncThunk("upload/uploadImage", (data) =>
  api.post(`/course/singleImage`, data)
);

export const uploadVideo = CreateApiAsyncThunk("upload/uploadVideo", (data) =>
  api.post(`/course/singlevideo`, data)
);

export const uploadDocument = CreateApiAsyncThunk(
  "upload/uploadDocument",
  (data) => api.post(`/course/upload/pdf`, data)
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading["uploadImage"] = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading["uploadImage"] = false;
        state.image = action.payload.data;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading["uploadImage"] = false;
        state.error["uploadImage"] = action.payload;
      })
      .addCase(uploadVideo.pending, (state) => {
        state.isLoading["uploadVideo"] = true;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isLoading["uploadVideo"] = false;
        state.video = action.payload.data;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading["uploadVideo"] = false;
        state.error["uploadVideo"] = action.payload;
      })
      .addCase(uploadDocument.pending, (state) => {
        state.isLoading["uploadDocument"] = true;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.isLoading["uploadDocument"] = false;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.isLoading["uploadDocument"] = false;
        state.error["uploadDocument"] = action.payload;
      });
  },
});

export default uploadSlice.reducer;
