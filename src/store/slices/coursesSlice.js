// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // API URL
// const API_URL = 'https://6g2n7ff0-8000.inc1.devtunnels.ms/api/category/filter';

// // Async Thunk using fetch
// export const fetchCategories = createAsyncThunk('courses/fetchCategories', async () => {
//   const response = await fetch(API_URL);
//   if (!response.ok) {
//     throw new Error('Failed to fetch categories');
//   }

//   const result = await response.json();
//   return result.data || []; // Extract 'data' array
// });

// const coursesSlice = createSlice({
//   name: 'courses',
//   initialState: {
//     categories: [], // Ensure it's an empty array initially
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default coursesSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API URL for categories
const CATEGORY_API_URL = 'https://6g2n7ff0-8000.inc1.devtunnels.ms/api/category/filter';
// API URL for courses (example dynamic URL with category ID)
const COURSE_API_URL = 'https://6g2n7ff0-8000.inc1.devtunnels.ms/api/course/filter/';

// Async Thunk to fetch categories
export const fetchCategories = createAsyncThunk('courses/fetchCategories', async () => {
  const response = await fetch(CATEGORY_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const result = await response.json();
  return result.data || []; // Extract 'data' array
});

// Async Thunk to fetch courses by category
export const fetchCoursesByCategory = createAsyncThunk(
  'courses/fetchCoursesByCategory',
  async (categoryId) => {
    console.log(categoryId,"p;pp;p;p;")
    const response = await fetch(`${COURSE_API_URL}${categoryId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const result = await response.json();
    console.log('Fetched courses for category', categoryId, result); // Log the data
    return result.data || []; // Extract 'data' array
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    categories: [], // Store categories
    courses: [], // Store courses based on selected category
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle category fetch actions
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
      })
      
      // Handle courses fetch actions
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
