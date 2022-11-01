import React from "react";
import styled from "styled-components";
import Breakdown from "./Breakdown";
import Tracker from "./Tracker";

const StyledTimeline = styled.div`
  position: relative;
  height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Timeline = ({ zone }) => {
  const left = 0.5;
  return (
    <StyledTimeline>
      <Tracker left={left}></Tracker>
      <Breakdown {...zone}></Breakdown>
    </StyledTimeline>
  );
};

export default Timeline;
