import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "tutors",
  initialState: {
    isAvailableModelOpen: false,
    isContactModelOpen: false,
    timeRanges: null,
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
  },
});

export const { setIsAvailableModelOpen, setIsContactModelOpen, setTimeRanges } =
  uiSlice.actions;
export default uiSlice.reducer;
