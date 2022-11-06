import React from "react";
import Canvas from "./Canvas";
import styled from "styled-components";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Header from "../../components/Header";
import { toggleSearch } from "../../store/ui/ui.slice";
import { useDispatch, useSelector } from "react-redux";

const StyledCanvasPage = styled.div`
  display: flex;
  justify-content: center;
`;

const CanvasPage = () => {
  const { isSearchOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleToggleSearch = () => {
    dispatch(toggleSearch());
  };

  return (
    <StyledCanvasPage>
      <Header></Header>
      <Canvas></Canvas>
      <Button
        text={`${isSearchOpen ? "Close Search" : "Add a new timezone"} `}
        action={handleToggleSearch}
      ></Button>
      {isSearchOpen && <Search></Search>}
    </StyledCanvasPage>
  );
};

export default CanvasPage;
