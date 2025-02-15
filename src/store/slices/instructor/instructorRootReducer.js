import { combineReducers } from "@reduxjs/toolkit";
import instructorDashboardSlice from "./dashboardSlice";
import instructorCourseSlice from "./courseSlice";
import settingsSlice from "./settingsSlice";
import bookingSlice from "./bookingsSlice";
import availabilitySlice from "./availabilitySlice";
const instructorRootReducer = combineReducers({
  dashboard: instructorDashboardSlice,
  course: instructorCourseSlice,
  setting: settingsSlice,
  booking: bookingSlice,
  availability: availabilitySlice,
});

export default instructorRootReducer;
