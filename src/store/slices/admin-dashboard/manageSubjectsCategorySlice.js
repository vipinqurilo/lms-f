import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const getAllManageSubjects = CreateApiAsyncThunk(
  "GET/category/getAllManageSubjects",
  () => api.get(`/category`)
);

export const deleteCategoryById = CreateApiAsyncThunk(
  "DELETE/category/deleteCategoryById",
  (id) => api.delete(`/category/${id}`)
);

export const editCategoryById = CreateApiAsyncThunk(
  "PUT/category/editCategoryById",
  async ({ id, updatedData }) => {
    return await api.put(`/category/${id}`, updatedData);
  }
);

export const addCategory = CreateApiAsyncThunk(
  "POST/category/addCategory",
  async (categoryData) => {
    return await api.post(`/category`, categoryData);
  }
);

export const managesubjectsSlice = createSlice({
  name: "managesubjects",
  initialState: {
    subjects: [],
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllManageSubjects.pending, (state) => {
        state.isLoading["getAllManageSubjects"] = true;
      })
      .addCase(getAllManageSubjects.fulfilled, (state, action) => {
        state.isLoading["getAllManageSubjects"] = false;
        state.subjects = action.payload.data;
      })
      .addCase(getAllManageSubjects.rejected, (state, action) => {
        state.isLoading["getAllManageSubjects"] = false;
        state.error["getAllManageSubjects"] = action.payload;
      })
      .addCase(deleteCategoryById.pending, (state, action) => {
        state.isLoading["deleteCategoryById"] = true;
        state.error["deleteCategoryById"] = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.isLoading["deleteCategoryById"] = false;

        state.subjects = state.subjects.filter(
          (category) => category.id !== action.meta.arg
        );
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.isLoading["deleteCategoryById"] = false;
        state.error["deleteCategoryById"] = action.payload;
      })
      .addCase(editCategoryById.pending, (state, action) => {
        state.isLoading["editCategoryById"] = true;
        state.error["editCategoryById"] = null;
      })
      .addCase(editCategoryById.fulfilled, (state, action) => {
        state.isLoading["editCategoryById"] = false;

        const index = state.subjects.findIndex(
          (category) => category._id === action.meta.arg.id
        );
        if (index !== -1) {
          state.subjects[index] = {
            ...state.subjects[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(editCategoryById.rejected, (state, action) => {
        state.isLoading["editCategoryById"] = false;
        state.error["editCategoryById"] = action.payload;
      })
      .addCase(addCategory.pending, (state, action) => {
        state.isLoading["addCategory"] = true;
        state.error["addCategory"] = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading["addCategory"] = false;
        state.subjects.push(action.payload.data);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading["addCategory"] = false;
        state.error["addCategory"] = action.payload;
      });
  },
});

export default managesubjectsSlice.reducer;
