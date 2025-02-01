import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: {
    name: "Arjun",
    role: "inspector",
  },
  isLoading: {},
  error: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
