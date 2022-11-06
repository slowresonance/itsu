import { configureStore } from "@reduxjs/toolkit";
import timeReducer from "./time/time.slice";
import preferencesReducer from "./preferences/preferences.slice";
import citiesReducer from "./cities/cities.slice";
import uiReducer from "./ui/ui.slice";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cities/")) {
    const cities = store.getState().cities;
    localStorage.setItem("jikan", JSON.stringify(cities));
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
    getDefaultMiddleware().concat(localStorageMiddleware),
});
