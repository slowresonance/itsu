import { configureStore } from "@reduxjs/toolkit";
import timeReducer from "./features/time/timeSlice";

export const store = configureStore({
  reducer: {
    time: timeReducer,
  },
});
