import React from "react";
import styled from "styled-components";
import Zone from "../../components/Zone";
import { getBreakdown, guessTimezone } from "../../utils/Time";
import { useSelector, useDispatch } from "react-redux";
import { addTimezone } from "../../store/timezones/timezones.slice";

const StyledCanvas = styled.div`
  max-width: 900px;
  margin: 4em auto;

  display: flex;
  flex-direction: column;
  gap: 2em;

  flex-grow: 1;
`;

const Canvas = () => {
  const { timezones } = useSelector((state) => state.timezones);
  const dispatch = useDispatch();

  if (timezones.length < 1) {
    dispatch(addTimezone(guessTimezone()));
  }

  console.log(timezones);
  const zones = getBreakdown(timezones);

  return (
    <StyledCanvas>
      {zones.map((zone, i) => (
        <Zone zone={zone} key={i} index={i}></Zone>
      ))}
    </StyledCanvas>
  );
};

export default Canvas;
