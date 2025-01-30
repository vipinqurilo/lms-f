import { combineReducers } from "@reduxjs/toolkit";
import instructorDashboardSlice from "./dashboardSlice";
import instructorCourseSlice from "./courseSlice"
import instructorWithdrawalSlice from "./withdrawalSlice"

const instructorRootReducer = combineReducers({
  dashboard: instructorDashboardSlice,
  course: instructorCourseSlice,
  withdrawal: instructorWithdrawalSlice,
});

export default instructorRootReducer;
