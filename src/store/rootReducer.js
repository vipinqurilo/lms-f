import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import tutorsReducer from "./slices/tutorsSlice";
import uiReducer from "./slices/uiSlice";
import instructorRootReducer from "./slices/instructor/instructorRootReducer";
import adminRootReducer from "./slices/admin-dashboard/adminRootReducer";
import uploadSlice from "./slices/uploadSlice";

import studentRootReducer from "./slices/student-dashboard/studentRootReducer";


import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
  tutors: tutorsReducer,
  ui: uiReducer,
  user: userSlice,
  instructor: instructorRootReducer,
  admin: adminRootReducer,
  upload: uploadSlice,
  student: studentRootReducer,
});

export default rootReducer;
