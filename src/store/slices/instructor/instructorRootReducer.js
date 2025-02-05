import { combineReducers } from "@reduxjs/toolkit";
import instructorDashboardSlice from "./dashboardSlice";
import instructorCourseSlice from "./courseSlice";
import instructorWithdrawalSlice from "./withdrawalSlice";
import settingsSlice from "./settingsSlice";
import bookingSlice from "./bookingsSlice";

const instructorRootReducer = combineReducers({
  dashboard: instructorDashboardSlice,
  course: instructorCourseSlice,
  withdrawal: instructorWithdrawalSlice,
  setting: settingsSlice,
  booking: bookingSlice,
});

export default instructorRootReducer;
