import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getDaysOfTheWeek } from "../utils/Time";

const Block = styled.div`
  min-height: calc(var(--height) * 1px);
  flex-basis: calc(var(--width) * 100%);
  border-radius: calc(var(--border-radius) * 1px);
  display: flex;

  .tooltip-area {
    flex-grow: 1;
  }

  position: relative;
`;

const StyledTooltip = styled.div`
  position: absolute;
  background-color: #313131;
  color: #dddddd;
  padding: 6px 20px;
  border-radius: 6px;
  top: -45px;
  left: calc(var(--x) * 1px);
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 1000;
  text-transform: capitalize;

  @keyframes pop {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: pop 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    background: #313131;
    border-radius: 2px;
    z-index: -1;
  }
`;

const Tooltip = ({ x, y, text }) => {
  return (
    <StyledTooltip
      style={{
        "--x": x,
        "--y": y,
      }}
    >
      {text}
    </StyledTooltip>
  );
};

const TooltipWrapper = ({ text }) => {
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [click, setClick] = useState(false);
  const areaRef = useRef(null);

  const handleMouseMove = (e) => {
    const { x, y } = areaRef.current.getBoundingClientRect();
    setCoord({ x: e.clientX - x, y: e.clientY - y });
  };
  return (
    <>
      {(show || click) && <Tooltip x={coord.x} y={coord.y} text={text} />}
      <div
        className="tooltip-area"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setClick(!click)}
        ref={areaRef}
      ></div>
    </>
  );
};

const DayBlock = ({ duration, day }) => {
  const { themes, currentTheme } = useSelector((state) => state.preferences);
  const { cities } = useSelector((state) => state.cities);
  const theme = themes[currentTheme];
  const colors = {
    yesterday: theme.blocks.days.yesterday,
    today: theme.blocks.days.today,
    tomorrow: theme.blocks.days.tomorrow,
  };
  const preferences = useSelector((state) => state.preferences);
  const width = duration / 24;
  const DayInTheWeek = getDaysOfTheWeek(cities[0].timezone)[day];
  return (
    <Block
      style={{
        "--width": width,
        "--height": preferences.height,
        "--border-radius": preferences.borderRadius,
        background: colors[day],
      }}
    >
      <TooltipWrapper text={DayInTheWeek}></TooltipWrapper>
    </Block>
  );
};

const PeriodBlock = ({ duration, period, dayDuration }) => {
  const { themes, currentTheme } = useSelector((state) => state.preferences);
  const theme = themes[currentTheme];
  const colors = {
    am: theme.blocks.periods.am,
    pm: theme.blocks.periods.pm,
  };
  const preferences = useSelector((state) => state.preferences);
  const width = duration / dayDuration;

  return (
    <Block
      style={{
        "--width": width,
        "--height": preferences.height,
        "--border-radius": preferences.borderRadius,
        background: colors[period],
      }}
    >
      <TooltipWrapper text={period.toUpperCase()}></TooltipWrapper>
    </Block>
  );
};

export { DayBlock, PeriodBlock };
