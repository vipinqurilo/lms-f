import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Fetch all users with pagination
export const getAllUsers = CreateApiAsyncThunk(
  "GET/users/getAllUsers",
  ({ search = "", userStatus = "", role = "", page = 1, limit = 5 }) =>
    api.get("/users", {
      params: { search, userStatus, role, page, limit },
    })
); 

// Update user status
export const updateUserStatus = CreateApiAsyncThunk(
  "PATCH/users/updateUserStatus",
  async ({ userId, status }) => {
    const response = await api.patch(`/users/${userId}/user-status`, {
      userStatus: status,
    });
    return { userId, status, data: response.data };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    isLoading: {},
    error: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading["getAllUsers"] = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading["getAllUsers"] = false;
        state.users = action.payload.data;
        state.total = action.payload.total; // Set total count
        state.currentPage = action.payload.currentPage; // Set current page
        state.totalPages = action.payload.totalPages; // Set total pages
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading["getAllUsers"] = false;
        state.error["getAllUsers"] = action.payload;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        if (!action.payload) return;

        const { userId, status } = action.payload;
        const userIndex = state.users.findIndex((user) => user._id === userId);

        if (userIndex !== -1) {
          state.users[userIndex].userStatus = status; // Update user status
        }
      });
  },
});

export default usersSlice.reducer;
