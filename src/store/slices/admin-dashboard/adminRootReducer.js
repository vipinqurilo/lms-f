import { combineReducers } from "@reduxjs/toolkit";
import adminCourseReducer from "./courseSlice";

const adminRootReducer = combineReducers({
  course: adminCourseReducer,
});


export default adminRootReducer;