import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";
import teacherRequestSlice from "./teacherSlice";
import  manageSubjectsSlice  from "./manageSubjectsCategorySlice";
import  manageSubjectsSubCategorySlice  from "./manageSubjectsSubCategorySlice";
import  usersSlice  from "./userSlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
  teacher: teacherRequestSlice,
  managesubjects: manageSubjectsSlice,
  managesubjectssubctegory:manageSubjectsSubCategorySlice,
  user:usersSlice
});

export default adminRootReducer;
