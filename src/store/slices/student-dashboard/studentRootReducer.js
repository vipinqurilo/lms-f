import { combineReducers } from "@reduxjs/toolkit";
import studentProfileSlice from "./profileSlice";
const studentRootReducer = combineReducers({
  profile: studentProfileSlice,
});

export default studentRootReducer;
