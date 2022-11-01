import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: Date.now(),
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
});

export default timeSlice.reducer;
