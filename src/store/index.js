import { configureStore } from "@reduxjs/toolkit";
import timeReducer from "./time/time.slice";
import preferencesReducer from "./preferences/preferences.slice";
import timezonesReducer from "./timezones/timezones.slice";
import uiReducer from "./ui/ui.slice";

export const store = configureStore({
  reducer: {
    time: timeReducer,
    preferences: preferencesReducer,
    timezones: timezonesReducer,
    ui: uiReducer,
  },
});
