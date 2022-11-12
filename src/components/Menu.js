import React from "react";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  gap: 10px;

  position: fixed;
  bottom: 2em;
  margin: auto;

  z-index: 10;
`;

const Menu = ({ children }) => {
  return <StyledMenu>{children}</StyledMenu>;
};

export default Menu;
