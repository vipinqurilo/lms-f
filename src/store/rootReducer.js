import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import tutorsReducer from "./slices/tutorsSlice";
import uiReducer from "./slices/uiSlice";
import userSlice from "./slices/userSlice";
import instructorRootReducer from "./slices/instructor/instructorRootReducer";

const rootReducer = combineReducers({
  courses: coursesReducer,
  tutors: tutorsReducer,
  ui: uiReducer,
  user: userSlice,
  instructor: instructorRootReducer,
});

export default rootReducer;
