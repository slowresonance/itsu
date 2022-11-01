import React, { useContext } from "react";
import styled from "styled-components";
import { Preferences } from "../App";

const colors = {
  yesterday: "#9B6C51",
  today: "#A797C1",
  tomorrow: "#A09238",
};

const StyledDayBlock = styled.div`
  min-height: calc(var(--height) * 1px);
  flex-basis: calc(var(--width) * 100%);
  border-radius: calc(var(--border-radius) * 1px);
`;

const DayBlock = ({ duration, day }) => {
  const preferences = useContext(Preferences);
  let width = duration / 24;
  return (
    <StyledDayBlock
      style={{
        "--width": width,
        "--height": preferences.height,
        "--border-radius": preferences.borderRadius,
        background: colors[day],
      }}
    ></StyledDayBlock>
  );
};

export default DayBlock;
