import { combineReducers } from "@reduxjs/toolkit";
import instructorDashboardSlice from "./dashboardSlice";
import instructorCourseSlice from "./courseSlice";
import settingsSlice from "./settingsSlice";
import availabilitySlice from "./availabilitySlice";
import walletSlice from "./walletSlice";
import earningSlice from "./earningSlice";

const instructorRootReducer = combineReducers({
  dashboard: instructorDashboardSlice,
  course: instructorCourseSlice,
  setting: settingsSlice,
  availability: availabilitySlice,
  wallet: walletSlice,
  earning: earningSlice,
});

export default instructorRootReducer;
