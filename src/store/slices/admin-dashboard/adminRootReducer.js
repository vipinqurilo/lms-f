import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";
import adminTeacherReducer from "./teacherSlice";
import adminWithdrawelReducer from "./teacherSlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
  teacher: adminTeacherReducer,
  withdrawal: adminWithdrawelReducer,
});


export default adminRootReducer;