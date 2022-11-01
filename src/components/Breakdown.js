import React, { useContext } from "react";
import styled from "styled-components";
import DayGroup from "./DayGroup";
import { Preferences } from "../App";

const StyledBreakdown = styled.div`
  display: flex;
  flex-direction: row;
  gap: calc(var(--spacing) * 1px);
`;

const days = ["yesterday", "today", "tomorrow"];

const Breakdown = ({ offset, timezone, breakdown }) => {
  const preferences = useContext(Preferences);
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
