import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

export const getAllManageSubjects = CreateApiAsyncThunk(
  "GET/category/getAllManageSubjects",
  () => api.get(`/api/category`)
);

export const deleteCategoryById = CreateApiAsyncThunk(
  "DELETE/category/deleteCategoryById",
  (id) => api.delete(`/api/category/${id}`)
);

export const editCategoryById = CreateApiAsyncThunk(
    "PUT/category/editCategoryById",
    async ({ id, updatedData }) => {
      return await api.put(`/api/category/${id}`, updatedData);
    }
  );

  export const addCategory = CreateApiAsyncThunk(
    "POST/category/addCategory",
    async (categoryData) => {
      return await api.post(`/api/category`, categoryData);
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
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter(
          (category) => category.id !== action.meta.arg
        );
      })
      .addCase(editCategoryById.fulfilled, (state, action) => {
        const index = state.subjects.findIndex(
          (category) => category._id === action.meta.arg.id
        );
        if (index !== -1) {
          state.subjects[index] = { ...state.subjects[index], ...action.payload.data };
        }
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.subjects.push(action.payload.data);
      });
  },
});

export default managesubjectsSlice.reducer;
