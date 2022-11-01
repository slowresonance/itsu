import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: 16,
  spacing: 4,
  borderRadius: 3,
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
});

export default preferencesSlice.reducer;
