import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateTime } from "../store/time/time.slice";
import { formatTZTime, minutesElapsedInDay, getAMPM } from "../utils/Time";
import Breakdown from "./Breakdown";

const StyledZone = styled.div`
  position: relative;

  @keyframes enter {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  --delay: 120ms;
  --start: 0ms;

  animation: enter 0.6s both;
  animation-delay: calc(var(--stagger) * var(--delay) + var(--start));
`;

const StyledTimeline = styled.div`
  position: relative;
  height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTracker = styled.div`
  position: absolute;
  height: 55px;
  width: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.4);
  left: calc(var(--left) * 100%);
`;

const StyledStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .timezone-info {
    display: flex;
    gap: 30px;
  }
`;

const Tracker = () => {
  const { time } = useSelector((state) => state.time);
  const left = minutesElapsedInDay(time) / 1440;
  return (
    <StyledTracker
      style={{
        "--left": left,
      }}
    ></StyledTracker>
  );
};

const Timeline = ({ city }) => {
  return (
    <StyledTimeline>
      <Tracker></Tracker>
      <Breakdown {...city}></Breakdown>
    </StyledTimeline>
  );
};

const Status = ({ name, country, timezone }) => {
  const { time } = useSelector((state) => state.time);
  return (
    <StyledStatus>
      <div className="timezone-info">
        <div className="time">{`${formatTZTime(time, timezone)} ${getAMPM(
          time,
          timezone
        )}`}</div>
        <div className="city">{`${name}, ${country}`}</div>
      </div>
    </StyledStatus>
  );
};

const Zone = ({ city, index }) => {
  const { name, country, timezone } = city;
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(updateTime());
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledZone style={{ "--stagger": index }}>
      <Timeline city={city}></Timeline>
      <Status name={name} country={country} timezone={timezone}></Status>
    </StyledZone>
  );
};

export default Zone;
