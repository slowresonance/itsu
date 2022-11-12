import { configureStore } from "@reduxjs/toolkit";
import timeReducer from "./time/time.slice";
import preferencesReducer from "./preferences/preferences.slice";
import citiesReducer from "./cities/cities.slice";
import uiReducer from "./ui/ui.slice";
import { encodeURL } from "../utils/URL";

const syncMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cities/")) {
    const cities = store.getState().cities;
    localStorage.setItem("jikan", JSON.stringify(cities));
    window.history.pushState(null, null, encodeURL(cities.cities));
  }
  if (action.type === "preferences/setTheme") {
    const theme = store.getState().preferences.currentTheme;
    localStorage.setItem("theme", theme);
  }
  return result;
};

export const store = configureStore({
  reducer: {
    time: timeReducer,
    preferences: preferencesReducer,
    cities: citiesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncMiddleware),
});
