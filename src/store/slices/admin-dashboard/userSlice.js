import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Fetch all users
export const getAllUsers = CreateApiAsyncThunk(
  "GET/users/getAllUsers",
  () => api.get("/users")
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
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading["getAllUsers"] = false;
        state.error["getAllUsers"] = action.payload;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        if (!action.payload) return;
      
        const { userId, status } = action.payload;
      
        state.users = state.users.map((user) =>
          user._id === userId ? { ...user, userStatus: status } : user
        );
      });
      
  },
});

export default usersSlice.reducer;
