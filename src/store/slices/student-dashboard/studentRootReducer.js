import { combineReducers } from "@reduxjs/toolkit";
import studentProfileSlice from "./ProfileSlice";
const studentRootReducer = combineReducers({
  profile: studentProfileSlice,
});

export default studentRootReducer;
