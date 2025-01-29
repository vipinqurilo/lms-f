import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isCollapsed: false,
  isLoading: {},
  error: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleIsCollapsed: (state) => {
        state.isCollapsed = !state.isCollapsed
    }
  },
  extraReducers: (builder) => {},
});

export const { toggleIsCollapsed } = dashboardSlice.actions
export default dashboardSlice.reducer;
