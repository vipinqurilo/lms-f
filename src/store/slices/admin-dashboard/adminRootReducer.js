import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";
import teacherRequestSlice from "./teacherSlice";
import  manageSubjectsSlice  from "./manageSubjectsCategorySlice";
import  manageSubjectsSubCategorySlice  from "./manageSubjectsSubCategorySlice";
import  usersSlice  from "./userSlice";
import teachersSlice  from "./teachersSlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
  teacher: teacherRequestSlice,
  managesubjects: manageSubjectsSlice,
  managesubjectssubctegory:manageSubjectsSubCategorySlice,
  user:usersSlice,
  teachers: teachersSlice
});

export default adminRootReducer;
