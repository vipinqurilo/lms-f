import { combineReducers } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import tutorsReducer from './slices/tutorsSlice';

const rootReducer = combineReducers({
  courses: coursesReducer,
  tutors: tutorsReducer,
});

export default rootReducer;
