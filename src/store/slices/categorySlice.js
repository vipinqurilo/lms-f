import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

const initialState = {
  subjects: [],
  subSubjects: [],
  categories: [],
  isLoading: {},
  error: {},
};

export const getSubjects = CreateApiAsyncThunk("GET/category/getSubjects", () =>
  api.get(`/category`)
);

export const getSubSubjects = CreateApiAsyncThunk(
  "GET/category/getSubSubjects",
  () => api.get(`/subcategory/filter`)
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    makeCategorySubCategoryArray: (state) => {
      const formattedData =
        state.subjects?.length > 0 &&
        state.subjects.reduce((acc, category) => {
          const matchedSubcategories =
            state.subSubjects?.length > 0 &&
            state.subSubjects
              .filter((sub) => sub.courseCategory._id === category._id)
              .map((sub) => ({
                name: sub.name,
                id: sub._id,
              }));

          acc.push({
            categoryName: category.name,
            categoryId: category._id,
            subCategories: matchedSubcategories,
          });

          return acc;
        }, []);
      state.categories = formattedData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.isLoading["getSubjects"] = true;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.isLoading["getSubjects"] = false;
        state.subjects = action.payload.data;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.isLoading["getSubjects"] = false;
        state.isLoading["getSubjects"] = action.payload;
      })
      .addCase(getSubSubjects.pending, (state) => {
        state.isLoading["getSubSubjects"] = true;
      })
      .addCase(getSubSubjects.fulfilled, (state, action) => {
        state.isLoading["getSubSubjects"] = false;
        state.subSubjects = action.payload.data;
      })
      .addCase(getSubSubjects.rejected, (state, action) => {
        state.isLoading["getSubSubjects"] = false;
        state.isLoading["getSubSubjects"] = action.payload;
      });
  },
});

export const { makeCategorySubCategoryArray } = categorySlice?.actions;

export default categorySlice.reducer;
