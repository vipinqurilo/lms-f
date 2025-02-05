import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import tutorsReducer from "./slices/tutorsSlice";
import uiReducer from "./slices/uiSlice";
import instructorRootReducer from "./slices/instructor/instructorRootReducer";
import studentRootReducer from "./slices/student-dashboard/StudentRootReducer";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
  tutors: tutorsReducer,
  ui: uiReducer,
  user: userSlice,
  instructor: instructorRootReducer,
  student: studentRootReducer,
});

export default rootReducer;
