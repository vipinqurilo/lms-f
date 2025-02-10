// import { createSlice } from "@reduxjs/toolkit";
// import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
// import { api } from "@/store/api/api";

// // Fetch all subcategories
// export const getAllSubCategories = CreateApiAsyncThunk(
//   "GET/subcategory/getAllSubCategories",
//   () => api.get(`/api/subcategory`)
// );

// // Delete a subcategory by ID
// export const deleteSubCategoryById = CreateApiAsyncThunk(
//   "DELETE/subcategory/deleteSubCategoryById",
//   (id) => api.delete(`/api/subcategory/${id}`)
// );

// // Update a subcategory by ID
// export const editSubCategoryById = CreateApiAsyncThunk(
//   "PUT/subcategory/editSubCategoryById",
//   async ({ id, updatedData }) => {
//     return await api.put(`/api/subcategory/${id}`, updatedData);
//   }
// );

 

// // Add a new subcategory
// export const addSubCategory = CreateApiAsyncThunk(
//   "POST/subcategory/addSubCategory",
//   async (subCategoryData) => {
//     return await api.post(`/api/subcategory`, subCategoryData);
//   }
// );

// export const manageSubjectsSubCategorySlice = createSlice({
//   name: "managesubcategories",
//   initialState: {
//     subcategories: [],
//     isLoading: {},
//     error: {},
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllSubCategories.pending, (state) => {
//         state.isLoading["getAllSubCategories"] = true;
//       })
//       .addCase(getAllSubCategories.fulfilled, (state, action) => {
//         state.isLoading["getAllSubCategories"] = false;
//         state.subcategories = action.payload.data;
//       })
//       .addCase(getAllSubCategories.rejected, (state, action) => {
//         state.isLoading["getAllSubCategories"] = false;
//         state.error["getAllSubCategories"] = action.payload;
//       })
//       .addCase(deleteSubCategoryById.fulfilled, (state, action) => {
//         state.subcategories = state.subcategories.filter(
//           (subcategory) => subcategory.id !== action.meta.arg
//         );
//       })
//       .addCase(editSubCategoryById.fulfilled, (state, action) => {
//         const index = state.subcategories.findIndex(
//           (subcategory) => subcategory._id === action.meta.arg.id
//         );
//         if (index !== -1) {
//           state.subcategories[index] = { ...state.subcategories[index], ...action.payload.data };
//         }
//       })
//       .addCase(addSubCategory.fulfilled, (state, action) => {
//         state.subcategories.push(action.payload.data);
//       });
//   },
// });

// export default manageSubjectsSubCategorySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Fetch all subcategories
export const getAllSubCategories = CreateApiAsyncThunk(
  "GET/subcategory/getAllSubCategories",
  () => api.get("/api/subcategory")
);

// Delete a subcategory by ID
export const deleteSubCategoryById = CreateApiAsyncThunk(
  "DELETE/subcategory/deleteSubCategoryById",
  (id) => api.delete(`/api/subcategory/${id}`)
);

// Update a subcategory by ID
export const editSubCategoryById = CreateApiAsyncThunk(
  "PUT/subcategory/editSubCategoryById",
  async ({ id, updatedData }) => {
    return await api.put(`/api/subcategory/${id}`, updatedData);
  }
);

// Add a new subcategory
export const addSubCategory = CreateApiAsyncThunk(
  "POST/subcategory/addSubCategory",
  async (subCategoryData) => {
    return await api.post("/api/subcategory", subCategoryData);
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
        state.subcategories = action.payload.data;
      })
      .addCase(getAllSubCategories.rejected, (state, action) => {
        state.isLoading["getAllSubCategories"] = false;
        state.error["getAllSubCategories"] = action.payload;
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
          state.subcategories[index] = { ...state.subcategories[index], ...action.payload.data };
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
