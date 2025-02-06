import { combineReducers } from "@reduxjs/toolkit";
import studentProfileSlice from "./profileSlice";
import wishlistSlice from "../student-dashboard/wishlistSlice";
import ordersSlice from "../student-dashboard/ordersSlice";
const studentRootReducer = combineReducers({
  profile: studentProfileSlice,
  wishlist: wishlistSlice,
  orders: ordersSlice,
});

export default studentRootReducer;
