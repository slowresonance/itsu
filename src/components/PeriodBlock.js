import React, { useContext } from "react";
import styled from "styled-components";
import { Preferences } from "../App";

const colors = {
  am: "#D1C28B",
  pm: "#76987C",
};

const StyledPeriodBlock = styled.div`
  min-height: calc(var(--height) * 1px);
  flex-basis: calc(var(--width) * 100%);
  border-radius: calc(var(--border-radius) * 1px);
`;

const PeriodBlock = ({ duration, period, dayDuration }) => {
  const preferences = useContext(Preferences);
  let width = duration / dayDuration;
  return (
    <StyledPeriodBlock
      style={{
        "--width": width,
        "--height": preferences.height,
        "--border-radius": preferences.borderRadius,
        background: colors[period],
      }}
    ></StyledPeriodBlock>
  );
};

export default PeriodBlock;
