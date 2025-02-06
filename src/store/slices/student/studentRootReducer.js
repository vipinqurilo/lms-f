import { combineReducers } from "@reduxjs/toolkit";
import wishlistSlice from "./wishlistSlice";
import ordersSlice from "./ordersSlice";
const studentRootReducer = combineReducers({
  wishlist: wishlistSlice,
  orders: ordersSlice,
});


export default studentRootReducer;
