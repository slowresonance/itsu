import React from "react";
import CanvasPage from "./views/canvas/CanvasPage";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Crimson Pro', serif;
    font-size: 18px;
  }

  body {
    color: #eeeeee;
    background: #141414;
    padding: 0 1em;
  }

  *::-webkit-scrollbar {
  width: 16px;
  }

  *::-webkit-scrollbar-track {
    border-radius: 8px;
  }

  *::-webkit-scrollbar-thumb {
    height: 56px;
    border-radius: 8px;
    border: 4px solid transparent;
    background-clip: content-box;
    background-color: #666666;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <CanvasPage />
    </>
  );
}

export default App;
