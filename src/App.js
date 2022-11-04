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
    padding: 1em;
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
