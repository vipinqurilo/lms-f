import { combineReducers } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import tutorsReducer from './slices/tutorsSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  courses: coursesReducer,
  tutors: tutorsReducer,
  ui: uiReducer,
});

export default rootReducer;
