import React, { useContext } from "react";
import styled from "styled-components";
import DayBlock from "./DayBlock";
import PeriodGroup from "./PeriodGroup";
import { Preferences } from "../App";

const StyledDayGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(var(--width) * 100%);
  gap: calc(var(--spacing) * 1px);
`;

const DayGroup = ({ duration, period, day }) => {
  const preferences = useContext(Preferences);
  let width = duration / 24;
  return duration !== 0 ? (
    <StyledDayGroup
      style={{
        "--width": width,
        "--spacing": preferences.spacing,
      }}
    >
      <DayBlock duration={duration} day={day}></DayBlock>
      <PeriodGroup {...period} dayDuration={duration}></PeriodGroup>
    </StyledDayGroup>
  ) : (
    <></>
  );
};

export default DayGroup;
