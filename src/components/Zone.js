import React from "react";
import Timeline from "./Timeline";
import Status from "./Status";
import styled from "styled-components";

const StyledZone = styled.div`
  position: relative;
`;

const Zone = ({ zone }) => {
  return (
    <StyledZone>
      <Timeline zone={zone}></Timeline>
      <Status></Status>
    </StyledZone>
  );
};

export default Zone;
