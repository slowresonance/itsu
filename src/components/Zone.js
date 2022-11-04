import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateTime } from "../store/time/time.slice";
import { formatTZTime, minutesElapsedInDay, getAMPM } from "../utils/Time";

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

const StyledPeriodGroup = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 1px);
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

const Breakdown = ({ offset, timezone, breakdown }) => {
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

const Timeline = ({ zone }) => {
  return (
    <StyledTimeline>
      <Tracker></Tracker>
      <Breakdown {...zone}></Breakdown>
    </StyledTimeline>
  );
};

const Status = ({ timezone }) => {
  const { time } = useSelector((state) => state.time);
  return (
    <StyledStatus>
      <div className="timezone-info">
        <div className="time">{`${formatTZTime(time, timezone)} ${getAMPM(
          time,
          timezone
        )}`}</div>
        <div className="timezone">{timezone}</div>
      </div>
      {/* <div className="users">Hello</div> */}
    </StyledStatus>
  );
};

const Zone = ({ zone, index }) => {
  const { timezone } = zone;
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(updateTime());
    }, 1000);
  }, []);

  return (
    <StyledZone style={{ "--stagger": index }}>
      <Timeline zone={zone}></Timeline>
      <Status timezone={timezone}></Status>
    </StyledZone>
  );
};

export default Zone;
