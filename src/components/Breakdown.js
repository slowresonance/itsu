import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { PeriodBlock, DayBlock } from "./Blocks";

const StyledBreakdown = styled.div`
  display: flex;
  flex-direction: row;
  gap: calc(var(--spacing) * 1px);
`;

const StyledDayGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(var(--width) * 100%);
  gap: calc(var(--spacing) * 1px);
`;

const StyledPeriodGroup = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 1px);
`;

const PeriodGroup = ({ am, pm, dayDuration }) => {
  const preferences = useSelector((state) => state.preferences);
  return (
    <StyledPeriodGroup
      style={{
        "--spacing": preferences.spacing,
      }}
    >
      {am !== 0 && (
        <PeriodBlock
          duration={am}
          period={"am"}
          dayDuration={dayDuration}
        ></PeriodBlock>
      )}
      {pm !== 0 && (
        <PeriodBlock
          duration={pm}
          period={"pm"}
          dayDuration={dayDuration}
        ></PeriodBlock>
      )}
    </StyledPeriodGroup>
  );
};

const DayGroup = ({ duration, period, day }) => {
  const preferences = useSelector((state) => state.preferences);
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

const Breakdown = ({ offset, breakdown }) => {
  const days = ["yesterday", "today", "tomorrow"];
  const preferences = useSelector((state) => state.preferences);
  return (
    <StyledBreakdown
      style={{
        "--spacing": preferences.spacing,
      }}
    >
      {days.map((day) => (
        <DayGroup
          {...breakdown[day]}
          day={day}
          key={day}
          gap={offset !== 0 ? true : false}
        ></DayGroup>
      ))}
    </StyledBreakdown>
  );
};

export default Breakdown;
