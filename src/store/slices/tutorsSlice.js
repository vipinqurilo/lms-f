import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processStep: 1,
  processData: {},
  isLoading: {},
  error: {},
};

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    updateProcessStep: (state, action) => {
      state.step = action.payload;
    },
    updateProcessData: (state, action) => {
      const { field, data } = action.payload;
      state.courseAddData = {
        ...state.courseAddData,
        [field]: data,
      };
    },
  },
});

export const { updateProcessData, updateProcessStep } = tutorsSlice.actions;
export default tutorsSlice.reducer;
