import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { preferencesSlice } from "../store/preferences/preferences.slice";

const StyledHeader = styled.div`
  position: fixed;
  margin-top: 50px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  padding: 10px 20px;

  @keyframes open {
    0% {
      scale: 0.8;
      opacity: 0;
    }
    50% {
      scale: 1.3;
    }
    100% {
      scale: 1;
    }
  }

  .themes {
    display: flex;
    gap: 6px;
    animation: open 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  .logo {
    opacity: 0.5;
  }

  .circle {
    background: var(--color);
    height: 25px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    &:hover {
      scale: 1.2;
    }
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
        <div className="themes">
          {Object.keys(themes).map((theme) => (
            <div
              key={theme}
              onClick={() => dispatch(preferencesSlice.actions.setTheme(theme))}
              className="circle"
              style={{ "--color": themes[theme].blocks.days.today }}
            ></div>
          ))}
        </div>
      ) : (
        <div className="logo">~ itsu is happy to serve you ~</div>
      )}
    </StyledHeader>
  );
};

export default Header;
