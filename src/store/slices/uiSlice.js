import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'tutors',
  initialState: {
    isAvailableModelOpen: false,
    isContactModelOpen: false,
  },
  reducers: {
    setIsAvailableModelOpen(state, action) {
      state.isAvailableModelOpen = action.payload; 
    },
    setIsContactModelOpen(state, action) {
      state.isContactModelOpen = action.payload; 
    },
  },
});

export const { setIsAvailableModelOpen,setIsContactModelOpen } = uiSlice.actions;
export default uiSlice.reducer;
