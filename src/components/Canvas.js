import React from "react";
import styled from "styled-components";
import Zone from "./Zone";

const StyledCanvas = styled.div`
  max-width: 900px;
  margin: 4em auto;

  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const Canvas = ({ zones }) => {
  console.log(zones);
  return (
    <StyledCanvas>
      {zones.map((zone, i) => (
        <Zone zone={zone} key={i}></Zone>
      ))}
    </StyledCanvas>
  );
};

export default Canvas;
