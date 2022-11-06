import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../../utils/Local";

const storedState = getItemFromLocalStorage("jikan") || {
  cities: [
    {
      name: "Dallas",
      timezone: "America/Chicago",
      country: "US",
    },
    {
      name: "Dubai",
      timezone: "Asia/Dubai",
      country: "AE",
    },
    {
      name: "New York",
      timezone: "America/New_York",
      country: "US",
    },
  ],
  defaultCity: {
    name: "Hyderabad",
    timezone: "Asia/Kolkata",
    country: "IN",
  },
};

const initialState = storedState;

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    removeCity: (state, action) => {
      state.cities = state.timezones.filter(
        (timezone) => timezone !== action.payload
      );
    },
    addDefaultCity: (state, action) => {
      state.defaultTimezone = action.payload;
    },
  },
});

export const { addCity, addDefaultCity, removeTimezone } = citiesSlice.actions;

export default citiesSlice.reducer;
