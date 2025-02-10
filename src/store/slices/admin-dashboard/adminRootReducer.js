import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";
import teacherRequestSlice from "./teacherSlice";
import  manageSubjectsSlice  from "./manageSubjectsCategorySlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
  teacher: teacherRequestSlice,
  managesubjects: manageSubjectsSlice,
});

export default adminRootReducer;
