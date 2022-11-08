import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../../utils/Local";

const storedState = JSON.parse(getItemFromLocalStorage("jikan")) || {
  cities: [
    {
      name: "Tokyo",
      country: "JP",
      timezone: "Asia/Tokyo",
    },
    {
      name: "New York",
      country: "US",
      timezone: "America/New_York",
    },
    {
      name: "London",
      country: "GB",
      timezone: "Europe/London",
    },
  ],
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
      state.cities.splice(action.payload, 1);
    },
    changeDefaultCity: (state, action) => {
      const newDefaultCity = state.cities[action.payload];
      const newCities = state.cities.filter((_, i) => i !== action.payload);
      state.cities = [newDefaultCity, ...newCities];
    },
  },
});

export const { addCity, removeCity, changeDefaultCity } = citiesSlice.actions;

export default citiesSlice.reducer;
