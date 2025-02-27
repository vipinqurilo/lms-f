import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";
import teacherRequestSlice from "./teacherSlice";
import manageSubjectsSlice from "./manageSubjectsCategorySlice";
import manageSubjectsSubCategorySlice from "./manageSubjectsSubCategorySlice";
import usersSlice from "./userSlice";
import teachersSlice from "./teachersSlice";
import studentSlice from "./studentSlice";
import orderSlice from "./orderSlice";
import bookingReducer from "./bookingSlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
  teacher: teacherRequestSlice,
  managesubjects: manageSubjectsSlice,
  managesubjectssubctegory: manageSubjectsSubCategorySlice,
  user: usersSlice,
  teachers: teachersSlice,
  student: studentSlice,
  order: orderSlice,
  booking: bookingReducer,
});

export default adminRootReducer;
