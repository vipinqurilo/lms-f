import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import tutorsReducer from "./slices/tutorsSlice";
import uiReducer from "./slices/uiSlice";
import instructorRootReducer from "./slices/instructor/instructorRootReducer";
import adminRootReducer from "./slices/admin-dashboard/adminRootReducer";
import uploadSlice from "./slices/uploadSlice";
import managesubjectsReducer from "./slices/admin-dashboard/manageSubjectsCategorySlice"; // Import new slice
import studentRootReducer from "./slices/student-dashboard/studentRootReducer";
import userSlice from "./slices/userSlice";
import languagesSlice from "./slices/languageSlice";
import supportSlice from "./slices/supportSlice";
import categorySlice from "./slices/categorySlice";
import withdrawalSlice from "./slices/withdrawalSlice";
import paymentSlice from "./slices/paymentSlice";
const rootReducer = combineReducers({
  courses: coursesReducer,
  tutors: tutorsReducer,
  ui: uiReducer,
  user: userSlice,
  instructor: instructorRootReducer,
  admin: adminRootReducer,
  upload: uploadSlice,
  payment: paymentSlice,
  student: studentRootReducer,
  languages: languagesSlice,
  support: supportSlice,
  category: categorySlice,
  withdrawal: withdrawalSlice,
});

export default rootReducer;
