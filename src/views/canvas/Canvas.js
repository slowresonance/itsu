import React from "react";
import styled from "styled-components";
import Zone from "../../components/Zone";
import { getBreakdown } from "../../utils/Time";
import { useSelector, useDispatch } from "react-redux";

const StyledCanvas = styled.div`
  max-width: 900px;
  margin: 4em auto;
  display: flex;
  flex-direction: column;
  gap: 2em;

  flex-grow: 1;
`;

const Canvas = () => {
  const { cities } = useSelector((state) => state.cities);

  const defaultCity = cities[0];

  const citiesData = cities.map((city) => {
    return {
      ...city,
      ...getBreakdown(city.timezone, defaultCity["timezone"]),
    };
  });

  console.log(citiesData);

  return (
    <StyledCanvas>
      {citiesData.map((city, i) => (
        <Zone city={city} key={i} index={i}></Zone>
      ))}
    </StyledCanvas>
  );
};

export default Canvas;
