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

  cursor: pointer;
  user-select: none;
`;

const Button = ({ text, icon, action }) => {
  return (
    <StyledButton onClick={() => action()}>
      {
        // If there is an icon, render it
        icon && icon
      }
      {
        // If there is text, render it
        text && <div className="text">{text}</div>
      }
    </StyledButton>
  );
};

export default Button;
