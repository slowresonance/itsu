import React from "react";
import styled from "styled-components";

const StyledStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .timezone-info {
    display: flex;
    gap: 30px;
  }
`;

const Status = () => {
  return (
    <StyledStatus>
      <div className="timezone-info">
        <div className="time">2:30PM</div>
        <div className="timezone">New York, US -4:00</div>
      </div>
      <div className="users">Hello</div>
    </StyledStatus>
  );
};

export default Status;
