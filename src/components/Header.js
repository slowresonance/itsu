import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  position: fixed;
  margin-top: 50px;
  color: #fff;
  opacity: 0.4;
`;

const Header = () => {
  return <StyledHeader>~ jikan ~</StyledHeader>;
};

export default Header;
