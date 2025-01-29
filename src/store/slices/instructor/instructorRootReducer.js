import { combineReducers } from "@reduxjs/toolkit";
import instructorDashboardSlice from "./dashboardSlice";

const instructorRootReducer = combineReducers({
  dashboard: instructorDashboardSlice,
});

export default instructorRootReducer;
