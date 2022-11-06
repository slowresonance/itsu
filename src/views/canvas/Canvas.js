import React from "react";
import styled from "styled-components";
import Zone from "../../components/Zone";
import { getBreakdown } from "../../utils/Time";
import { useSelector } from "react-redux";

const StyledCanvas = styled.div`
  max-width: 900px;
  margin: 7em auto;
  display: flex;
  flex-direction: column;
  gap: 2em;
  background: #141414;
  z-index: 5;
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

  return (
    <StyledCanvas>
      {citiesData.map((city, i) => (
        <Zone city={city} key={i} index={i}></Zone>
      ))}
    </StyledCanvas>
  );
};

export default Canvas;
