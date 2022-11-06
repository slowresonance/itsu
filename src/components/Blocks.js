import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledDayBlock = styled.div`
  min-height: calc(var(--height) * 1px);
  flex-basis: calc(var(--width) * 100%);
  border-radius: calc(var(--border-radius) * 1px);
`;

const StyledPeriodBlock = styled.div`
  min-height: calc(var(--height) * 1px);
  flex-basis: calc(var(--width) * 100%);
  border-radius: calc(var(--border-radius) * 1px);
`;

const DayBlock = ({ duration, day }) => {
  const colors = {
    yesterday: "#9B6C51",
    today: "#A797C1",
    tomorrow: "#A09238",
  };
  const preferences = useSelector((state) => state.preferences);
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

const PeriodBlock = ({ duration, period, dayDuration }) => {
  const colors = {
    am: "#D1C28B",
    pm: "#76987C",
  };
  const preferences = useSelector((state) => state.preferences);
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

export { DayBlock, PeriodBlock };