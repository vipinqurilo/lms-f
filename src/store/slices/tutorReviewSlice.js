import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";


const initialState = {
  data: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: {},
  error: {},
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
        },
});

export default reviewSlice.reducer;
