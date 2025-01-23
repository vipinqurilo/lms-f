import { createSlice } from '@reduxjs/toolkit';

const tutorsSlice = createSlice({
  name: 'tutors',
  initialState: [],
  reducers: {
    setTutors(state, action) {
      return action.payload;
    },
  },
});

export const { setTutors } = tutorsSlice.actions;
export default tutorsSlice.reducer;
