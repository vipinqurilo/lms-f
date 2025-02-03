import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API URL
const API_URL = 'https://6g2n7ff0-8000.inc1.devtunnels.ms/api/category/filter';

// Async Thunk using fetch
export const fetchCategories = createAsyncThunk('courses/fetchCategories', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const result = await response.json();
  return result.data || []; // Extract 'data' array
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    categories: [], // Ensure it's an empty array initially
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
