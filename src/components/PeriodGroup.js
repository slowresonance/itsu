import React, { useContext } from "react";
import styled from "styled-components";
import PeriodBlock from "./PeriodBlock";
import { Preferences } from "../App";

const StyledPeriodGroup = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 1px);
`;

const PeriodGroup = ({ am, pm, dayDuration }) => {
  const preferences = useContext(Preferences);
  return (
    <StyledPeriodGroup
      style={{
        "--spacing": preferences.spacing,
      }}
    >
      {am !== 0 ? (
        <PeriodBlock
          duration={am}
          period={"am"}
          dayDuration={dayDuration}
        ></PeriodBlock>
      ) : (
        <></>
      )}
      {pm !== 0 ? (
        <PeriodBlock
          duration={pm}
          period={"pm"}
          dayDuration={dayDuration}
        ></PeriodBlock>
      ) : (
        <></>
      )}
    </StyledPeriodGroup>
  );
};

export default PeriodGroup;
