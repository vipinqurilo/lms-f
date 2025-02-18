import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "tutors",
  initialState: {
    isAvailableModelOpen: false,
    isContactModelOpen: false,
    timeRanges: null,
    pagination:false,
  },
  reducers: {
    setTimeRanges(state, action) {
      state.timeRanges = action.payload;
    },
    setIsAvailableModelOpen(state, action) {
      state.isAvailableModelOpen = action.payload;
    },
    setIsContactModelOpen(state, action) {
      state.isContactModelOpen = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },

  },
});

export const { setIsAvailableModelOpen, setIsContactModelOpen, setTimeRanges, setPagination } =
  uiSlice.actions;
export default uiSlice.reducer;
