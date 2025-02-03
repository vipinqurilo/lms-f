import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processStep: 5,
  processData: {},
  isLoading: {},
  error: {},
};

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    updateProcessStep: (state, action) => {
      state.processStep = action.payload;
    },
    updateProcessData: (state, action) => {
      const { field, data } = action.payload;
      state.processData = {
        ...state.processData,
        [field]: data,
      };
    },
  },
});

export const { updateProcessData, updateProcessStep } = tutorsSlice.actions;
export default tutorsSlice.reducer;
