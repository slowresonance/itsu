import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { preferencesSlice } from "../store/preferences/preferences.slice";

const StyledHeader = styled.div`
  position: fixed;
  margin-top: 50px;
  color: #fff;
  display: flex;
  gap: 6px;
  cursor: pointer;

  .logo {
    opacity: 0.5;
  }

  .circle {
    background: var(--color);
    height: 25px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
`;

const Header = () => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const { themes } = useSelector((state) => state.preferences);

  return (
    <StyledHeader
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        Object.keys(themes).map((theme) => (
          <div
            key={theme}
            onClick={() =>
              dispatch(preferencesSlice.actions.changeTheme(theme))
            }
            className="circle"
            style={{ "--color": themes[theme].blocks.days.today }}
          ></div>
        ))
      ) : (
        <div className="logo">~ jikan ~</div>
      )}
    </StyledHeader>
  );
};

export default Header;
