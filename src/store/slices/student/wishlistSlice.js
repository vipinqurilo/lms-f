import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";

// Thunk to fetch wishlist
export const fetchWishlistAsync = CreateApiAsyncThunk(
  "GET/wishlist/fetchWishlistAsync",
  async () => {
    const response = await api.get(`/api/whishlist/student/get`);
    return response.data;
  }
);

// Thunk to remove item from wishlist
export const removeFromWishlistAsync = CreateApiAsyncThunk(
  "wishlist/removeFromWishlistAsync",
  async (id) => {
    await api.delete(`/api/whishlist/student/delete/${id}`);
    return id;
  }
);

const initialState = {
  wishlist: [],
  isLoading: {},
  error: {},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchWishlistAsync
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.isLoading["fetchWishlistAsync"] = true;
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.isLoading["fetchWishlistAsync"] = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.isLoading["fetchWishlistAsync"] = false;
        state.error["fetchWishlistAsync"] = action.error;
      })
      // Handle removeFromWishlistAsync
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.isLoading["removeFromWishlistAsync"] = true;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.isLoading["removeFromWishlistAsync"] = false;
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.isLoading["removeFromWishlistAsync"] = false;
        state.error["removeFromWishlistAsync"] = action.error;
      });
  },
});

export default wishlistSlice.reducer;
