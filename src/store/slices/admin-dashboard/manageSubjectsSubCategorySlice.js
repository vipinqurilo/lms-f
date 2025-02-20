import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Fetch all subcategories (modified to check if categoryId exists and handle accordingly)
export const getAllSubCategories = CreateApiAsyncThunk(
  "GET/subcategory/getAllSubCategories",
  (categoryId) => {
    // If categoryId is provided, fetch subcategories for that category
    if (categoryId) {
      return api.get(`/subcategory?courseCategory=${categoryId}`);
    }
    // Otherwise, fetch all subcategories
    return api.get("/subcategory");
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
        state.subcategories = action.payload.data; // Updates subcategories based on categoryId
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
      .addCase(editSubCategoryById.fulfilled, (state, action) => {
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
