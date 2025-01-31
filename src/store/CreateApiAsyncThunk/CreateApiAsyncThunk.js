import { createAsyncThunk } from "@reduxjs/toolkit";

export const CreateApiAsyncThunk = (type, apicall) =>
  createAsyncThunk(type, async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await apicall(arg); // Call the API function with `arg`
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Something Went Wrong"
      ); // Handle errors properly
    }
  });
