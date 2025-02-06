import { combineReducers } from "@reduxjs/toolkit";
import studentProfileSlice from "./profileSlice";
import wishlistSlice from "./wishlistSlice";
import ordersSlice from "./ordersSlice";
import bookingSlice from "./bookingSlice";
import enrolledCoursesSlice from "./enrolledCoursesSlice";
import languageSlice from "./languageSlice";
import reviewSlice from "./reviewSlice";
const studentRootReducer = combineReducers({
  profile: studentProfileSlice,
  wishlist: wishlistSlice,
  orders: ordersSlice,
  booking: bookingSlice,
  enrolledCourses: enrolledCoursesSlice,
  language: languageSlice,
  review: reviewSlice,
});

export default studentRootReducer;
