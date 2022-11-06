import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 20px;
  gap: 10px;

  width: max-content;

  background: #313131;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 39px;

  position: fixed;
  bottom: 2em;
  margin: auto;

  cursor: pointer;
  user-select: none;

  z-index: 10;
`;

const Button = ({ text, action }) => {
  return (
    <StyledButton onClick={() => action()}>
      <div className="text">{text}</div>
    </StyledButton>
  );
};

export default Button;
