import React, { createContext, useReducer, useState, useEffect } from "react";
import { getBreakdown } from "./utils/Time";
import { GlobalStyle } from "./GlobalStyle";
import Canvas from "./components/Canvas";

const appReducer = (state, action) => {
  switch (action.type) {
    default:
      break;
  }
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "time":
      return {
        ...state,
        time: action.payload,
      };
    default:
      break;
  }
};

const initialPreferences = {
  height: 16,
  spacing: 4,
  borderRadius: 3,
};

export const Preferences = createContext();
export const State = createContext();

function App() {
  const [preferences, preferencesDispatch] = useReducer(
    appReducer,
    initialPreferences
  );
  const [timezones, setTimezones] = useState(data);
  const zones = getBreakdown(timezones);
  const [state, stateDispatch] = useReducer(stateReducer, demoState);

  // useEffect(() => {
  //   setInterval(() => {
  //     stateDispatch({
  //       type: "time",
  //       payload: Date.now(),
  //     });
  //   }, 1000);
  // }, []);

  return (
    <>
      <Preferences.Provider value={preferences}>
        <State.Provider value={state}>
          <GlobalStyle></GlobalStyle>
          <Canvas zones={zones}></Canvas>
        </State.Provider>
      </Preferences.Provider>
    </>
  );
}

export default App;

const demoState = {
  time: Date.now(),
};

const data = [
  "Asia/Kolkata",
  "America/New_York",
  "Europe/Tallinn",
  "Australia/Sydney",
  "Asia/Kathmandu",
];
