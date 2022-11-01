import React from "react";
import styled from "styled-components";

const StyledTracker = styled.div`
  position: absolute;
  height: 55px;
  width: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.4);
  left: calc(var(--left) * 100%);
`;

const Tracker = ({ left }) => {
  return (
    <StyledTracker
      style={{
        "--left": left,
      }}
    ></StyledTracker>
  );
};

export default Tracker;
