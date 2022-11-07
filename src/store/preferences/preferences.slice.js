import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: 16,
  spacing: 4,
  borderRadius: 3,
  themes: {
    morning: {
      background: "#141414",
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.5)",
      },
      blocks: {
        days: {
          yesterday: "#F3C654",
          today: "#EDA73D",
          tomorrow: "#D7761D",
        },
        periods: {
          am: "#FEDF4E",
          pm: "#70A663",
        },
      },
      star: "#F3C654",
    },
    winter: {
      background: "#141414",
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.5)",
      },
      blocks: {
        days: {
          yesterday: "#9db5b2",
          today: "#728b89",
          tomorrow: "#466060",
        },
        periods: {
          am: "#cee5d0",
          pm: "#94b49f",
        },
      },
      star: "#9db5b2",
    },
    washed: {
      background: "#141414",
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.5)",
      },
      blocks: {
        days: {
          yesterday: "#9b6c51",
          today: "#a696c0",
          tomorrow: "#9f9138",
        },
        periods: {
          am: "#d0c18a",
          pm: "#76977c",
        },
      },
      star: "#f2c94c",
    },
  },
  currentTheme: "morning",
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { changeTheme } = preferencesSlice.actions;

export default preferencesSlice.reducer;
