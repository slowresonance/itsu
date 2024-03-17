import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateTime } from "../store/time/time.slice";
import { StarIcon, BinIcon } from "../assets/Icons";
import { removeCity, changeDefaultCity } from "../store/cities/cities.slice";

import {
  formatTZTime,
  minutesElapsedInDay,
  getAMPM,
  getGMTOffset,
} from "../utils/Time";
import Breakdown from "./Breakdown";

const StyledZone = styled.div`
  position: relative;

  @keyframes flow {
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

  animation: flow 0.6s both;
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
  box-shadow: 0px 0px 42px 10px rgb(0 0 0 / 25%);
  z-index: 1000;
`;

const StyledStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .timezone-info {
    display: flex;
    .time {
      width: 80px;
      margin-right: 20px;
    }
    .city {
      margin-right: 8px;
    }
    .gmt-offset {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .status-menu {
    display: flex;
    gap: 1em;
    cursor: pointer;

    .star {
      svg {
        fill: #494949;

        &:hover {
          fill: var(--star);
        }
      }

      &.default {
        cursor: auto;
        svg {
          fill: var(--star);
        }

        &:hover {
          fill: var(--star);
        }
      }
      padding: 5px;
      margin: -5px;
    }

    .delete {
      &:hover {
        svg {
          path {
            stroke: #ff8888;
          }
        }
      }
      padding: 5px;
      margin: -5px;
    }
  }
`;

const Tracker = () => {
  const { time } = useSelector((state) => state.time);
  const { cities } = useSelector((state) => state.cities);

  const timezone = cities[0].timezone;

  const left = minutesElapsedInDay(time, timezone) / 1440;
  console.log(left);
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

const Status = ({ name, country, timezone, index }) => {
  const { themes, currentTheme } = useSelector((state) => state.preferences);
  const theme = themes[currentTheme];
  const dispatch = useDispatch();
  const { time } = useSelector((state) => state.time);
  return (
    <StyledStatus
      style={{
        "--star": theme.star,
      }}
    >
      <div className="timezone-info">
        <div className="time">{`${formatTZTime(time, timezone)} ${getAMPM(
          time,
          timezone
        )}`}</div>
        <div className="city">{`${name}, ${country}`}</div>
        <div className="gmt-offset">{getGMTOffset(timezone)}</div>
      </div>
      <div className="status-menu">
        {index !== 0 && (
          <div className="delete" onClick={() => dispatch(removeCity(index))}>
            <BinIcon></BinIcon>
          </div>
        )}
        <div
          className={`star ${index === 0 && "default"}`}
          onClick={() => {
            if (index !== 0) {
              dispatch(changeDefaultCity(index));
            }
          }}
        >
          <StarIcon></StarIcon>
        </div>
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
      <Status
        name={name}
        country={country}
        timezone={timezone}
        index={index}
      ></Status>
    </StyledZone>
  );
};

export default Zone;
