import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital@0;1&display=swap');

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
  }
`;
