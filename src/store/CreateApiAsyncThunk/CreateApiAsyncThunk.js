import { createAsyncThunk } from "@reduxjs/toolkit";

export const CreateApiAsyncThunk = (type, apicall) =>
  createAsyncThunk(type, async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await apicall(arg);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.message ||
          error?.message ||
          "Something Went Wrong"
      );
    }
  });
