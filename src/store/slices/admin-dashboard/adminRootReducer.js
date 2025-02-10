import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";
import teacherRequestSlice from "./teacherSlice";
import  manageSubjectsSlice  from "./manageSubjectsCategorySlice";
import  manageSubjectsSubCategorySlice  from "./manageSubjectsSubCategorySlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
  teacher: teacherRequestSlice,
  managesubjects: manageSubjectsSlice,
  managesubjectssubctegory:manageSubjectsSubCategorySlice
});

export default adminRootReducer;
