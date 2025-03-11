import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "tutors",
  initialState: {
    isAvailableModelOpen: false,
    isContactModelOpen: false,
    timeRanges: null,
    pagination:false,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
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
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    }
  },
});

export const { setIsAvailableModelOpen, setIsContactModelOpen, setTimeRanges, setPagination, setStartDate, setEndDate, setTutorId, clearTutorId } =
  uiSlice.actions;
export default uiSlice.reducer;
