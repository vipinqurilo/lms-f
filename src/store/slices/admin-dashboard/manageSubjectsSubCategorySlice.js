import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";


export const getAllSubCategories = CreateApiAsyncThunk(
  "GET/subcategory/getAllSubCategories",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/subcategory?${query}`);
  }
);

// Delete a subcategory by ID
export const deleteSubCategoryById = CreateApiAsyncThunk(
  "DELETE/subcategory/deleteSubCategoryById",
  (id) => api.delete(`/subcategory/${id}`)
);

// Update a subcategory by ID
export const editSubCategoryById = CreateApiAsyncThunk(
  "PUT/subcategory/editSubCategoryById",
  async ({ id, updatedData }) => {
    return await api.put(`/subcategory/${id}`, updatedData);
  }
);

// Add a new subcategory
export const addSubCategory = CreateApiAsyncThunk(
  "POST/subcategory/addSubCategory",
  async (subCategoryData) => {
    return await api.post("/subcategory", subCategoryData);
  }
);

export const manageSubjectsSubCategorySlice = createSlice({
  name: "managesubcategories",
  initialState: {
    subcategories: [],
    totalPages: 0,
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubCategories.pending, (state) => {
        state.isLoading["getAllSubCategories"] = true;
      })
      .addCase(getAllSubCategories.fulfilled, (state, action) => {
        state.isLoading["getAllSubCategories"] = false;
        state.subcategories = action.payload.data;
        state.totalPages = action.payload?.pagination?.totalPages;
      })
      .addCase(getAllSubCategories.rejected, (state, action) => {
        state.isLoading["getAllSubCategories"] = false;
        state.error["getAllSubCategories"] = action.payload;
        state.subcategories = [];
      })
      .addCase(deleteSubCategoryById.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.filter(
          (subcategory) => subcategory._id !== action.meta.arg
        );
      })
      .addCase(editSubCategoryById.pending, (state, action) => {
        state.isLoading["editSubCategoryById"] = true;
        state.error["editSubCategoryById"] = null;
      })
      .addCase(editSubCategoryById.fulfilled, (state, action) => {
        state.isLoading["editSubCategoryById"] = false;
        const index = state.subcategories.findIndex(
          (subcategory) => subcategory._id === action.meta.arg.id
        );
        if (index !== -1) {
          state.subcategories[index] = {
            ...state.subcategories[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(editSubCategoryById.rejected, (state, action) => {
        state.isLoading["editSubCategoryById"] = false;
        state.error["editSubCategoryById"] = action.payload;
      })
      .addCase(addSubCategory.pending, (state) => {
        state.isLoading["addSubCategory"] = true;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.isLoading["addSubCategory"] = false;
        state.subcategories.push(action.payload.data);
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.isLoading["addSubCategory"] = false;
        state.error["addSubCategory"] = action.payload;
      });
  },
});

export default manageSubjectsSubCategorySlice.reducer;
