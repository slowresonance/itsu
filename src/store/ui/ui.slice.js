import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
  },
});

export const { toggleSearch } = uiSlice.actions;

export default uiSlice.reducer;
