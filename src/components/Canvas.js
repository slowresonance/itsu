import React from "react";
import styled from "styled-components";
import Zone from "./Zone";
import { getBreakdown } from "./../utils/Time";
import { useSelector, useDispatch } from "react-redux";
import { addTimezone } from "../store/timezones/timezones.slice";
import { guessTimezone } from "./../utils/Time";

const StyledCanvas = styled.div`
  max-width: 900px;
  margin: 4em auto;

  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const Canvas = () => {
  const { timezones } = useSelector((state) => state.timezones);
  const dispatch = useDispatch();

  if (timezones.length < 1) {
    dispatch(addTimezone(guessTimezone()));
  }

  console.log(timezones);
  const zones = getBreakdown(timezones);
  console.log(zones);

  return (
    <StyledCanvas>
      {zones.map((zone, i) => (
        <Zone zone={zone} key={i}></Zone>
      ))}
    </StyledCanvas>
  );
};

export default Canvas;
