import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import toastMiddleware from "./middleware/toastMiddleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(toastMiddleware);
  },
});
