import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timezones: [
    "Asia/Kolkata",
    "America/Chicago",
    "	Asia/Dubai",
    "Europe/Tallinn",
    "Asia/Kathmandu",
  ],
};

export const timezonesSlice = createSlice({
  name: "timezones",
  initialState,
  reducers: {
    addTimezone: (state, action) => {
      state.timezones.push(action.payload);
    },
    removeTimezone: (state, action) => {
      state.timezones = state.timezones.filter(
        (timezone) => timezone !== action.payload
      );
    },
  },
});

export const { addTimezone, removeTimezone } = timezonesSlice.actions;

export default timezonesSlice.reducer;
