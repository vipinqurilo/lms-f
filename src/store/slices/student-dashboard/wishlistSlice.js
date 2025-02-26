import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "@/store/api/api";
import toast from "react-hot-toast";

// Thunk to fetch wishlist
export const fetchWishlistAsync = CreateApiAsyncThunk(
  "GET/wishlist/fetchWishlistAsync",
  async () => {
    const response = await api.get(`/whishlist/student/get`);
    return response.data;
  }
);
export const addToWishlistAsync = CreateApiAsyncThunk(
  "POST/wishlist/addToWishlistAsync",
  async (data) => {
    const response = await api.post(`/whishlist`, data);
    return response;
  }
);
// Thunk to remove item from wishlist
export const removeFromWishlistAsync = CreateApiAsyncThunk(
  "wishlist/removeFromWishlistAsync",
  async (id) => {
    await api.delete(`/whishlist/student/delete/${id}`);
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
      // Handle addToWishlistAsync
      .addCase(addToWishlistAsync.pending, (state) => {
        state.isLoading["addToWishlistAsync"] = true;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.isLoading["addToWishlistAsync"] = false;
        const { message, data } = action.payload;
        if (message === "removed from wishlist") {
          state.wishlist = state.wishlist.filter((item) => item._id !== data._id);
        } else if (message === "added to wishlist") {
          state.wishlist.push(data);
        }
        else{
          toast.error(message);
        }
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.isLoading["addToWishlistAsync"] = false;
        state.error["addToWishlistAsync"] = action.error;
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
