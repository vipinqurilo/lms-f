import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";
import teacherRequestSlice from "./teacherSlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
  teacher: teacherRequestSlice,
});

export default adminRootReducer;
