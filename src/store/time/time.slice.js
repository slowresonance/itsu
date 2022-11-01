import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: Date.now(),
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    updateTime: (state) => {
      state.time = Date.now();
    },
  },
});

export const { updateTime } = timeSlice.actions;

export default timeSlice.reducer;
