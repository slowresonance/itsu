import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  ],
  defaultCity: {
    name: "Hyderabad",
    timezone: "Asia/Kolkata",
    country: "IN",
  },
};

export const timezonesSlice = createSlice({
  name: "timezones",
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

export const { addCity, addDefaultCity, removeTimezone } =
  timezonesSlice.actions;

export default timezonesSlice.reducer;
