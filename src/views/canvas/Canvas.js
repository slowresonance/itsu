import React from "react";
import styled from "styled-components";
import Zone from "../../components/Zone";
import { getBreakdown, guessTimezone } from "../../utils/Time";
import { useSelector, useDispatch } from "react-redux";
import { addDefaultCity } from "../../store/cities/cities.slice";

const StyledCanvas = styled.div`
  max-width: 900px;
  margin: 4em auto;

  display: flex;
  flex-direction: column;
  gap: 2em;

  flex-grow: 1;
`;

const Canvas = () => {
  const { defaultCity, cities } = useSelector((state) => state.cities);

  const dispatch = useDispatch();

  if (cities.length < 1) {
    dispatch(addDefaultCity(guessTimezone()));
  }

  const defaultTimezone = defaultCity["timezone"];

  const zones = [
    {
      ...defaultCity,
      ...getBreakdown(defaultTimezone, defaultTimezone),
    },
  ];

  zones.push(
    ...cities.map((city) => {
      return {
        ...city,
        ...getBreakdown(city.timezone, defaultTimezone),
      };
    })
  );

  console.log(zones);

  return (
    <StyledCanvas>
      {zones.map((zone, i) => (
        <Zone city={zone} key={i} index={i}></Zone>
      ))}
    </StyledCanvas>
  );
};

export default Canvas;
