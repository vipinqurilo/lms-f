import { combineReducers } from "@reduxjs/toolkit";
 import teacherRequestSlice from "../admin/teacherRequestSlice"
 
const adminRootReducer = combineReducers({
 
  teacher: teacherRequestSlice,
});

export default adminRootReducer;
